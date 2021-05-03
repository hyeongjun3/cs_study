https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

# An overview of HTTP

HTTP는 HTML document같은 resource를 fetch하는 것을 수락하는 프로토콜이다. 이것은 Web 위에서 교환되는 데이터의 집합이다. 그리고 이것은 요청이 recipient(보통 Web brower)으로부터 시작되는 것을 의미하는 client-server 프로토콜이다. 다른 fetch된 sub-document(text, layout description, images, videos scripts, etc)로 부터 완성된 document가 복원 된다.

**이미지 추가**

Client와 Server는 각각의 message를 교환하며 통신한다. client(보통 Web browser)에서 보내지는 message는 request라고 불리며 그 반대는 response라고 불린다.

**이미지 추가**

1990년도 초에 설게된 extensible protocol인 HTTP는 시간이 지나면서 진화하였다. 이론적으로 사용할 수 있는 신뢰적인 transport protocol을 사용할 수 있지만 HTTP는 TCP 또는 TLS-encrypted TCP 연결을 통해 전송되는 application layer protocol이다. 이런 확장성 때문에 HTTP는 hypertext document를 fetch하는 것 외에 image, videos를 fetech하고 server에 content(HTML form 같은)를 보낼 때도 사용된다. HTTP는 document의 일부분을 fetch하여 Web pages를 on demand로 update 할 수 있다.

## Components of HTTP-based systems
HTTP는 client-server portocol이다. request는 어떤 entity(user-agent 또는 이것을 대신하는 proxy)에 의해서 보내진다. user-agent의 대부분의 시간동안 Web brower이다. 하지만 user-agent는 어떤 것이든 될 수 있다. 예를들면 search engine index를 유지하고 채우기 위해서 Web을 crawl하는 로봇이 될 수 있다.

각각의 request는 request를 처리하고 정답를 제공(response라고 불린다)하는 server로 보내진다. client와 server 사이에는 엄청 많은 entities(집합적으로 proxies라고 불린다)가 있다. entities는 다른 operation을 수행하고 예를들어 gateways 또는 cache 같이 행동한다.

**이미지 추가**

현실에서 browser와 request를 처리하는 server 사이에는 더 많은 컴퓨터가 있다. router, modem 등등. Web의 layered design 덕분에 이것들은 network와 transport layer에 숨겨져있다. HTTP는 application layer의 가장 위에 있다. 비록 network 문제를 진단하는 것이 중요하더라고 하위 layer은 대부분 HTTP의 설명과 관련이 없다.

### Client: the user-agent
user-agent는 user를 대신해서 행동하는 툴을 의미한다. 이 역할은 주로 Web brower에 의해서 실행된다. 그 외에는 개발자가 application을 debug하는 프로그램일 가능성이 있다.

brower는 항상 request를 시작하는 entity이다. 절대 서버가 아니다(비록 몇몇 매커니즘이 수년간 걸쳐 server-initiated message를 시뮬레이션하였어도)

Web page를 표시하기 위해서 brower는 HTML doc을 fetch하기 위해서 original request를 보내야 한다. 그리고나서 file을 parse하고 script 실행과 laytou information(CSS), image나 video같은 sub-resource 를 위한 추가적인 request를 만든다. 그리고 web brower는 이 resource들을 섞어 유저에게 완성된 doc, 웹 페이지를 보여준다. brower에서 실행되는 script는 이후 phase에 있는 resource를 추가적으로 fecth할 수 있다. 그리고 브라우저는 그에 따라 웹 페이지를 업데이트한다.

웹 페이지는 hypertext document이다. 보여지는 텍스트의 몇몇 부분이 링크라는 것을 의미한다. 링크는 유저에게 user-agent를 지시하고 web을 통하여 navigate하는 것을 도와주며 새로운 웹 페이지를 fetch하기 위해서 actiave(보통 마우스 클릭) 될 수 있는 것이다. 브라우저는 이런 지시들을 HTTP request로 변환하고 HTTP response를 해석하여 user에게 clear response와 함께 보여준다.

### The Web Server 
communication channel의 반대 부분은 서버이다. 서버는 클라이언트가 request한 document를 serve 한다. 서버는 virtually하게 single machine으로 나타난다. 왜냐하면 부하 공유(load balancing) 또는 다른 컴퓨터(cache, DB 서버, e-commerce 서버)를 조사하는 복잡한 소프트웨어 일 수 있기 때문이다. 또 필요에 따라 document를 부분적으로 생성해야하기 떄문이다.

서버는 single machine일 필요는 없으나 몇몇 서버 소프트웨어 instance가 같은 machine에 host되어 있어야한다. HTTP/1.1와 Host 헤더를 가지면 같은 IP address를 공유할 수 있다.

### Proxies
웹 브라우저와 서버 사이에 엄청 많은 컴퓨터와 머신이 HTTP message를 relay하게 전달한다. Web stack의 layered 구조 때문에 대부분은 transport와 network, physical 레벨에서 동작하여 HTTP layer에서 투명해지고 잠재적으로 성능에 엄청난 영향을 준다. application layer에서 일어나는 이런 동작들을 proxies라고 부른다. proxy는 받은 request를 수정하지 않고 대신 request를 수행하여 transparent하게 동작할 수 있고 non-transparent하게 동작할 수도 있다. non-transparent의 경우 서버로 전달하기 전에 request를 어떤 방식으로 변경한다. Proxy는 아래와 같은 많은 동작을 한다.

- caching (brower cache와 같이 cache는 public 또는 private가 될 수 있다)
- filtering (antivirus scan or parental controls 같은 것)
- load balancing (다수의 서버가 다수의 request를 보내게 한다)
- authentication (다른 자원의 접근를 제어한다)
- logging (historical 정보를 제어한다)

## Basic aspects of HTTP
### HTTP is simple
HTTP/2에서 HTTP message를 frame으로 캡술화하는 복잡한 것이 소개되었더라도 HTTP는 일반적으로 쉽고 인간이 읽기 편하게 설계되었다. HTTP message는 인간이 쉽게 이해하고 읽을 수 있어 개방자가 test를 더 쉽게하고 신규 개발자에게 복잡함을 줄여 주었다.

### HTTP is extensible
HTTP/1.0에 소개되어있는 HTTP header는 이 protocol을 쉽게 확장하고 실험할 수 있게한다. 새로운 기능은 새로운 헤더의 semantic에 대한 client와 server사이의 동의만 있으면 쉽게 추가된다.

### HTTP is stateless, but not sessionless
HTTP는 stateless하다. 동일한 연결에서 연속적으로 수행되는 두 request 사이에 성공적으로 전달 되었는지 확인하는 링크가 없다. 이로인해 즉시 특정 페이지와 일관되게 상호 작용하려고 시도하는 유저에게 문제가 될 가능성을 가지고 있다. 예를들면 e커머스 장바구니가 있다. 그러나 HTTP의 core가 statless인 반면에 HTTP cookie는 statefull session을 가능하게 한다. 헤더 확장성을 이용하여 HTTP cookie는 workflow에 추가되어 동일한 context와 동일한 state를 공유하는 각각의 HTTP request가 있는 session 생성을 가능하게 한다.

### HTTP and connections
연결은 transport layer에서 제어된다. 그러므로 원칙적으로 HTTP의 scope 밖이다. HTTP는 connection-based가 되기 위해서 하위 tranposrt protocol이 필요하지 않다. 오직 realibe하거나 essage를 잃지만 않으면 된다(최소한 오류 표시). Internet에서 2개의 가장 일반적인 protocol 중에 TCP는 reliabe하고 UDP는 그렇지 않다. 그러므로 HTTP는 connection-based인 TCP-규격에 의존한다.

client와 server가 HTTP request/response 짝을 교환하기 전에 그들은 몇개의 round-trip를 요구하는 process인 TCP connection을 만들어야한다. HTTP/1.0의 기본 동작은 각각의 HTTP request/response 짝인 분리된 TCP connection을 여는 것이다. 이 방법은 close succession에서 다수의 request가 보내질 때 하나의 TCP connection을 공유하는 것보다 비효율적이다.

이런 단점을 줄이기 위해서 HTTP/1.1은 pipelining(구현하기 어렵다)와 persistent connections(하위 TCP connection은 Connection header를 사용하여 부분적으로 제어할 수 있다)소개하였다. HTTP/2는 하나의 connection에서 multiplexing message으로 인해 한단계 더 나아가고 connection을 warm하고 효율적으로 유지하게 도와주었다.

HTTP에 더 적합한 tranport portocol을 좋게 설계하는 실험은 현재 진행 중이다. 예를들면 구글은  더 reliable하고 효율적은 transport layer를 위해서 UDP를 build하는 QUIC를 실험하고 있다.

## What can be controlled by HTTP
HTTP의 확장 가능한 특성은 시간이 지나면서 Web를 좀 더 제어하고 기능성있게 해주었다. Cache 또는 authentication 방법은 early HTTP에서 처리되는 기능들이다. 반대로 orogin contraint를 relax하는 기능은 2010s에 추가되었다.

아래는 HTTP와 함계 제어 가능한 특성들이다.
- [Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)  
doc이 cache 대는 방법은 HTTP에 의해서 제어될 수 있다. 서버는 proxy와 client에게 무엇을 얼마나 cache할지 지시할 수 있다. client는 intermediate cache proxy를 지시하여 stored doc를 무시할 있게 할 수 있다.

- Relaxing the origin constraint  
snooping과 다른 개인 침범을 막기 위해서 웹 브라우저는 웹 사이트 간에 강력한 분리를 시켰다. 오직 same origin으로 부터의 페이지끼리 웹 페이지의 모든 정보를 접근할 수 있다. 이런 제한이 server에 부담이 되지만 HTTP 헤더는 서버단에서 document가 정보의 patchwork가 되게하여 이런 강력한 separation을 완화할 수 있다.

- Authentication  
몇몇 페이지는 특정 유저만 접근할 수 있도록 하기 위해서 보호될 것이다. 기본 authentication은 HTTP에서 제공된다. "WWW-Authenticate" 또는 비슷한 header 또는 HTTP Cokkies를 사용하여 특정한 session을 사용한다.

- Proxy and tunneling  
서버와 클라이언트는 자주 intranet에 위치하고 그들의 true IP 주소를 다른 컴퓨터로부터 숨긴다. HTTP request는 proxy를 이용하여 이런 network barrier를 통과한다. 모든 proxies가 HTTP proxies는 아니다. 예를들면 SOCKS 프로토콜은 lower level에서 동작한다. ftp 같은 다른 프로토콜은 이런 proxies들로 제어될 수 있다.

- Sessions  
HTTP Cookies를 사용하여 server의 상태와 request를 연결할 수 있다. 쿠키는 HTTP가 stateless 프로토콜임에도 session을 만든다. 이것은 e-commerce 장바구니나 user configuration을 하는 페이지에 유용하게 사용된다.

## HTTP flow
client가 server(final server 또는 intermediate proxy)와 통신하기 원하면 아래 단계를 따라야 한다.

1. TCP connection을 연다. TCP connection은 다수의 request를 보내거나 받는데 사용된다. client는 새로운 connection을 열 것이다. 새로운 connection은 이미 있는 connection을 재사용하거나 새로 connection을 연다.

2. HTTP message를 전송한다. HTTP message(HTTP/2 이전)은 human-readable 하다. HTTP/2에서는 직접적으로 읽지 못하게 하기 위해서 이런 간단한 메시지가 frame으로 encapsulate 되었다. 아래는 예제이다.
    ```
    GET / HTTP/1.1
    HOST: developer.mozilla.org
    Accept-Language: fr
    ```

3. server로 부터의 response를 읽는다. 아래 같이
    ```
    HTTP/1.1 200 OK
    Date: Sat, 09 Oct 2010 14:28:02 GMT
    Server: Apache
    Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
    Etag: '51142bc1-7449-479b075b2891b'
    Accept-Ranges: bytes
    Content-Length: 29769
    Content-Type: text/html

    <!DOCTYPE html... (here comes the 29768 bytes of the requests web page)
    ```

4. connection을 닫거나 미래 request를 위해서 reuse한다.

만약 HTTP pipeline이 동작하면 다수의 request가 response를 기다리지 않고 전송된다. HTTP pipelining은 network에서 구현하기 어렵다고 증명되었다. 

## HTTP Messages
HTTP/1.1에 정의된 HTTP message는 human-readable하다. HTTP/2는 binary strcture, frame으로 embedded 되었다(header의 압축이나 multiplexing이 최적화 되었다). 이 버전의 HTTP에서 original HTTP message의 일부부만 전송되어도 message 각각의 semantic은 바뀌지 않고 client는 original HTTP/1.1 request을 재구성한다. 왜냐하면 HTTP/2 message를 HTTP/1.1 포맷으로 이해하는 것이 유용하기 때문이다.

HTTP message는 두가지 종류를 가지고 있다. request와 response
### Requests
HTTP request 예시를 보자

[그림]

request는 아래와 같은 element를 가지고 있다.

- HTTP method. 보통 동사 같은 GET, POST 또는 명사같은 OPTIONS, HEAD(client가 행동하기 원하는 동작이 선언되어있다). 전형적으로 client는 리소스를 fetch(GET 사용) 하거나 HTML form의 값을 post하기를 원한다. 
- fetch할 리소스의 path. 리소스의 URL은 각각의 element로 벗겨진다. 예를들면 프로토콜 -> http://, 도메인 -> developer.mozilla.org, TCP port -> 80
- HTTP protocol읠 버전
- 서버에 전송될 추가적인 정보를 포함하는 header(optional 하다)
- 또는 POST 방법을 위한 body

### Responses
response 예시를 보자

[그림]

Response는 아래 element를 포함한다.

- 그들이 따르는 HTTP protocol의 version
- status code, request가 성공했는지 유무를 알려주며 이유도 알려준다.
- status mesage, status code의 non-authoritative한 짧은 설명
- requset와 같은 HTTP header
- fetch된 리소스를 포함하는 body (optionally)

## APIs based on HTTP
가장 많이 사용되는 HTTP의 API는 XMLHttpRequest API 이다. 이 API는 user agent와 server 사이에 데이터를 교환할 때 사용된다. 최근 Fetch API는 더 강력하고 유여한하게 같은 특성을 제공한다.

다른 API, server-send events 는 HTTP를 transport mechanism으로 사용하여 server가 client에게 event를 전송하는 한 방향 서비스이다. EventSource interface를 사용하여 client는 connection을 열고 event handler를 만들 수 있다. client browser는 자동으로 HTTP stream에 있는 message를 적절한 Event Object로 바꾼다. 

## Conclusion

HTTP는 사용하기 쉬운 extensible protocol 이다. header를 추가할 수 있는 client-server 구조는 HTTP가 더 확장할 수 있는 가능성을 제공한다.

성능 증가를 위해서 frame에 HTTP message를 embedded한 HTTP/2가 좀 더 복잡해졌더라고 message의 basic structure는 HTTP/1.0 때문에 똑같이 남아있다. Session flow는 HTTP message monitor를 통해서 조사하고 디버깅 하기 쉽게 남아있다.
