Cross-Origin Resource Sharing(CORS)는 HTTP헤더 기반 매커니즘 입니다. 이 매커니즘은 서버가 자기 자신의 origin 외에 다른 origins(domain, scheme, port)을 표시할 수 있게 해줍니다. 표시한 origin은 브라우저가 자원 로딩을 할 수 있습니다. (수정). CORS는 또한 매커니즘에 의존합니다. 이 매커니즘은 브라우저가 'preflight' 요청을 cross-origin 리소스를 호스팅하는 서버에게 합니다. 서버가 본 요청을 허락하는지 확인하기 위해서. preflight에서 브라우저는 HTTP method와 본 요청에서 사용하는 것들을 헤더에 포함하여 전송 합니다.

cross-origin 요청의 예제로 `http://domain-a.com`이 `XMLHttpRequest`를 이용하여 `https://dpmain-b.com/data.json`을 요청하는 것이 있따.

보안상의 이유로 브라우저는 script를 통해서 시작된 cross-origin HTTP 요청을 제안한다. 에를 들어. `XMLHttpRequest`와 `Fetch API` 는 same-origin policy를 따른다. 이것은 해당 API를 사용하는 웹 애플리케이션은 오직 같은 출처로부터의 리소르만 요청 할 수 있으며, 다른 출처의 리소스를 요청하고 싶으면 올바른 CORS 헤더를 포함해야 한다.


## CORS를 사용하는 요청?

아래 HTTP 요청에 대해서 CORS를 사용합니다.
- XMLHttpRequest나 Fetch APIs를 호출
- Web Fonts
- WebHL textures
- `drawImage()`를 사용해 canvas를 그린 Image/Video 프레임
- CSS Shapred from images

## 개요
CORS는 브라우저 환경ㅇ세ㅓ 서버가 어떤 출처가 자원을 읽을 수 있는지 알려주는 HTTP 헤더를 추가하면 동작한다. 추가적으로, HTTP 요청은 server data에 side-effect를 불러올 수 있다.

### CORS 시나리오
CORS가 동작하는 시나리오는 총 3가지가 있습니다

### Simple Request
특정 조건을 가진 Request는 CORS Preflight를 발생시키지 않습니다. 이 Request를 `simple request`라고 부릅니다. 

simple request의 조건은 아래와 같습니다.

- `GET`, `HEAD`, `POST` 방법 중 하나
- user agent에 의해서 자동으로 설정되는 헤더 외에 manually로 설정할 수 있는 헤더는 아래와 같습니다.
    - `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`
- 허용되는 media type은 아래와 같습니다.
    -  `applicatoin/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`
- 만약 요청이 `XMLHttpRequest`로 의해 만들어졌다면, 이벤트 리스너가 등록되어 있지 않아야 합니다.
- `ReadableStream` 객체를 request엥서 사용하면 안됩니다.

```js
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';

xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send();
```

```html
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

### Preflighted requests
simple request와 달리 본 요청 전에 `OPTIONS` 방법을 사용하여 HTTP 요청을 보내 본 요청이 안전하지 확인 합니다. 

```js
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>');
```

```html
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

line 1-10은 preflight request를 이야기 합니다. 브라우저는 preflight를 통해서 본 요청이 가능한지 확인 합니다. preflight는 본 요청에 필요한 정보도 미리 보냅니다. 9-10 라인

`Access-Control-Request-Method` 는 메소드를 `Access-Control-Request-Header`는 본 요청에 커스텀 헤더에 대한 정보가 포함됩니다. 

line 13-22는 서버가 전달해준 response 입니다. `Access-Control-Allow-Origin`에는 `https://foo.examlple`이 포함되어 있습니다.

`Access-Control-*`에 대한 설명

본 요청에 대한 request와 response는 아래와 같다.

```html
POST /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: https://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: https://foo.example
Pragma: no-cache
Cache-Control: no-cache

<person><name>Arun</name></person>

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain

[Some XML payload]
```

### Requests with credentials

