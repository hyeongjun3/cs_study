https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching

# HTTP caching
웹 사이트와 애플리케이션의 성능은은 fetch된 resource를 재사용하면 크게 상승시킬 수 있다. 웹 캐시는 latency와 network traffic을 줄여 resource를 보여주는데 시간이 줄어든다. HTTP caching을 구현하여 웹사이트는 더 responsive 해질 수 있다.

## Difference kinds of caches
caching은 전달받은 자원의 복사본을 저장하고 요청이 왔을 때 다시 사용하는 테크닉이다. 저장되어있는 캐시가 request가 왔을때 request를 가로채서 다시 다운로드하는 것을 막는다. 그렇기 때문에 성능이 증가할 수 있다.

다양한 종류의 캐시가 있으며 2개의 큰 카테고리로 나눌 수 있다. private과 shared 캐시이다. shared 캐시는 한 명 이상의 유저가 재사용을 위해서 response를 저장하는 캐시이다. private cahce는 한 명의 유저가 사용하는 캐시이다. 이 문서는 브라우저와 프록시 캐시를 다루지만 gateway caches, CDN, reverse proxy cache와 load balancer등 다양한 캐시들이 있다.

### Private browser caches
private cache는 한명의 유저를 위해서 존재한다. 브라우저 세팅에서 이미 caching을 보았을 것이다. 브라우저 캐시는 HTTP를 통해서 다운로드한 모든 document를 저장하고 있다. 이 캐시는 방문한 document가 서버에 추가적인 요청없이 back/forward navigation과 saving, viewing-as-source를 가능하게 해준다. 

### Shared proxy caches
shared cache는 한 명 이상의 유저에게 재사용을 위해서 respone를 저장하는 캐시이다. 예를들면 ISP 또는 회사에서 많은 유저에게 서비스를 제공하기 위해서 로컬 네트워크 인프라의 일부로 웹 프록시를 설정하여 많이 사용하는 자원을 재사용하여 network traffic과 latency를 줄일 수 있다.

## Targets of caching operations
HTTP caching은 선택이지만 선호한다. HTTP cache는 전형적으로 GET에 대한 response를 캐싱하는 것으로 제한한다. 다른 방식은 거부될 수 있다. primary cache key는 request method와 target URI(왜냐하면 GET request 떄문)를 포함한다.

caching entries는 보통 형식은
- 검색 request의 성공적인 결과 : HTML document, image 와 파일들을 포함하는 자원들을 GET request로 보내 받은 200(OK) response 
- 영구적인 redirect : 301(Moved Permanently) response
- Error response : 404(Not Found) result page
- Incomplete results : a 206 (Partial Content) reponse
- Response other than GET if something suitable for use as a cache key is defined.

request가 conetent negotiation의 target인 경우 cache entry는 보조키로 구분된 여러 저장된 응답으로 구성 될 수 있다.

## Controliing caching
### The Cache-Control header

Cache-Control HTTP/1.1 general-header field는 request와 response 모두에 caching mechanism을 특정짓는 directivie에 사용된다. 다양한 directive에 대한 caching policies를 정의하기 위해서 이 헤더를 사용한다.

**No caching**  

cache는 client의 request, server의 response에 대해서 어떤것도 저장할 수 없다. request가 server로 보내지고 매번 full response가 다운로드 된다.
```
Cache-Control : no-store
```
**Cache but revalidate**  
cache는 releasing a cached copy 하기 잊언에 validation을 위해서 origin server로 request로 보내진다.
```
Cache-Control : no-cache
```

**Private and public caches**

public directive는 response가 어떤 cache에 의해서 cache된다는 것을 의미한다. 만약 페이지가 HTTP authentication이나 response status code를 가지고 있다면 유용하다.

반대로 private는 shared cache가 아닌 private cache에 저장된다.
```
Cache-Control : private
Cache-Control : public
```

**Expiration**

가장 중요한 directive는 "max-age=\<seconds>" 이다. max-age는 자원이 존재할 수 있는 최대의 시간을 나타낸다. 이 directive는 request의 시간과 관련이 있으며 Expires header를 override한다(만약 설정되어 있다면). application에 있는 변하지 않을 file들을 위해서 너느 aggressive caching을 보통 사용할 수 있다. 이 file은 static file(image, CSS, JavaScript)을 포함한다.

```
Cache-Control: max-age=31536000
```

**Validation**

"must-revalidate" directive를 사용할 때 캐시는 이 directive를 사용하기 이전에 resource의 state status와 expired를 꼭 확인해야한다. 
```
Cache-Control : must-revalidate
```

### The Pragma header

Pragma는 HTTP/1.0 헤더이다. "Pragma: no-cache"는 "Cache-Control: no-cache"와 같다. 그러나 Pragma는 HTTP response에 대해 지정되지 않아서 HTTP/1.1 Cache-Control 헤더의 안정적인 대체재가 아니다.

Pragma는 HTTP/1.1 헤더가 없던 시절에 사용된 헤더이다. -> 안쓴다.

## Freshness
resource가 cache에 저장되면 이론적으로 평생 사용될 수 있다. Cache는 유한한 저장소를 가져서 주기적으로 저장공간에서 item이 제거된다. 이 과정을 *cache eviction* 이라고 부른다. 반면에 몇몇 자원은 서버에서 업데이트 되어서 cache가 업데이트 되어야한다. HTTP는 client-server protocol이기 때문에 자원이 업데이트될 때 server는 cache에 접근할 수 없다. 그래서 server와 client는 expiration time으로 소통한다. 이 expiration time 이전에 resource는 *fresh* 하다. expiration time 이후는 resource는 *stale* 하다. Eviction 알고리즘은 종종 stale resource보다 fresh resource에 권한을 준 준다. stale resource는 evicted되거나 ignored되지 않는 것을 기억해라. cache가 stale resource로 부터 요청을 받을 때 "If-None-Match"와 함께 request되며 아직 fresh한지 판단한다. 만약 fresh하다면 서버는 request resource의 body 없이 304(Not modfied) 헤더를 리턴해준다.

아래는 shared cache proxy의 예이다.

[그림]

freshness lifetime은 header에 의해서 계산된다. 만약 "Cache-Control: max-age=N" 헤더가 설정되어 있다면, freshness lifetime은 N과 같다. 만약 헤더가 없다면 Expires 헤더를 참조한다. 만약 Expire 헤더가 있다면 Expires - Date header가 freshness의 lifetime이 된다.

### Heuristic freshness checking

만약 origin server가 명시적으로 freshness를 설정하지 않으면 heuristic 접근이 사용된다.

이 경우에 Last-Modified 헤더를 참조한다. 만약 헤더가 존재하면 cache의 freshness lifetime은 Data 헤더 - (Last-modified 헤더/10) 이 된다.

```
expirationTime = responseTime + freshnessLifetime - currentAge
```

### Revved resources
cache 된 자원을 더 사용하면 웹 사이트는 더 좋은 성능과 reponsiveness를 가지게 된다. 최적화하기 위해서 가능한 먼 미래로 expiration time을 설정하는 것이 좋다. 이는 정기적으로 업데이트 되는 resource에서는 가능하지만 드물게 업데이트 되는 resource에서는 문제가 된다. 캐싱 resource에서 가장 많은 이점을 얻을 수 있는 자원잉지만 업데이트하기 매우 어렵다. 이것은 각 웹페이지에 포함되고 링크된 일반적인 기술 자원이다. JavaScript 및 CSS파일은 자주 변경되지 않지만 변결 될 때 빠르게 업데이트 되기를 원한다.

웹 개발자는 *revving*이라고 불리는 Steve Souder라는 기술을 개발했었다. 드물게 업데이트 되는 파일들을 특정 방법으로 네이밍 되었다. URL(일반적으로 파일이름)에 revision(또는 version) 번호가 추가된다. 이 방법은 각각 리소스의 새로운 revision은 절대 변경되지 않는 리소스로 간주되며 엄청 먼 미래의 expiration time을 가지게 된다. 대개 1년이나 그 이상. 새로운 version을 얻기 위해서 그의 모든 link는 변경되어야 하며 이 방법의 단점이다. 드문 variable 리소스가 변경될 때 종종 variable 리소스에 대한 추가 변경을 유됴한다. 이들을 읽으면 다른 버전의 새 버전도 읽는다.

이 테크닉은 추가적인 장점이 있다. 같은 시간에 두개의 cached 리소르를 업데이트해도 한 리소스의 오래된 버전이 다른 리소스의 새 버전과 함께 사용되는 상황이 발생하지 않는다. 웹사이트가 CSS나 JS script를 가질 떄 이것은 매우 중요하다 

[그림]

revved 리소스에 추가된 revision version은 1.1.3 같은 classic한 revision string이 필요하지 않는다. 아무거나 될 수 있다.

## Cache validation
캐시된 document의 expiration time에 다다르면 validated 되거나 다시 fetch된다. validation은 오직 서버가 strong validator 또는 weak validator를 전달할 떄 일어난다.

Revalidation은 유저가 reload button을 누를 때 트리거된다. 캐시된 response안에 "Cache-Control : must-revalidate" 헤더가 있다면 normal browsing에서도 발생한다. 다른 방법은은 "Advanced->Cache" preference 판넬에 있는 cache validation preference이다. 이것은 강제로 document가 로드될 떄 강제로 validation을 하는 것이다.

### ETags
ETag response 헤더는 strong validator에 사용되는 *opaque-to-the-useragent* 값이다. 이것은 브라우저 같은 HTTP user-agent가 무낮가 무엇을 표헌하는지 알 필요가 없다는 의미이며 유추할 수 없다. 

## Last-Modified
"Last-modified" response 헤더는 weak validator에 사용된다. ..


## Varying responses
Vary HTTP response 헤더는 얼마나 미래 request 헤더가 cache된 reponse 또는 request 되어야하는 fresh가 사용되는지 매칭하는지 결정한다.

cache가 Vary 헤더 필드를 가진 request를 받으면 Vary 헤더에 저장된 모든 헤더 필드가 원래 요청과 새 요청에서 모두 일치하지 않는 한 기본적으로 캐시된 응답을 사용하지 않아야한다.

[그림]

이 기능은 일반적으로 리소스를 비 압축 및 (다양한) 압축 형식으로 캐시하고 지원하는 인코딩을 기반으로 사용자 에이전트에 적절하게 제공하는 데 사용된다. 예를 들어 서버는 Vary : Accept-Encoding을 설정하여 특정 인코딩 집합에 대한 지원을 지정하는 모든 요청에 대해 별도의 리소스 버전이 캐시되도록 할 수 있다. Accept-Encoding : gzip, deflate, sdch.

Vary 헤더는 데스크톱 및 모바일 사용자에게 다양한 콘텐츠를 제공하거나 검색 엔진이 페이지의 모바일 버전을 검색 할 수 있도록하는 데 유용 할 수 있습니다 (또한 클로킹이 의도되지 않음을 알려줄 수도 있음). 이는 일반적으로 Vary : User-Agent 헤더를 사용하여 이루어지며 User-Agent 헤더 값이 모바일 및 데스크톱 클라이언트에 대해 다르기 때문에 작동합니다.

### Normalization
