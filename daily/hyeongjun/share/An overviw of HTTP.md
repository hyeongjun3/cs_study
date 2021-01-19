https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

# An overview of HTTP

HTTP는 HTML document같은 resource를 fetch하는 것을 수락하는 프로토콜이다. 이것은 Web 위에서 교환되는 데이터의 기초이다. 그리고 이것은 요청이 recipient(보통 Web brower)으로부터 시작되는 것을 의미하는 client-server 프로토콜이다. 완성된 document는 다른 fetch된 sub-document(text, layout description, images, videos scripts, etc)로 부터 복원 된다.

**이미지 추가**

Client와 Server는 data stream의 반대인 각각의 message를 교환하며 통신한다. client(보통 Web browser)에서 보내지는 message는 request라고 불리며 그 반대는 response라고 불린다.

**이미지 추가**

1990년도 초에 설게된 시간이 지나면서 HTTP는 확장가능한 protocol로 진화하였다. 이론적으로 사용할 수 있는 신뢰적인 transport protocol을 사용할 수 있지만 HTTP는 TCP 또는 TLS-encrypted TCP 연결을 통해 전송되는 application layer protocol이다. 이런 확장성 때문에 HTTP는 hypertext document와 image, videos를 fetech하는데 사용되며 server에 content(HTML form 같은)를 보낼때도 사용된다. HTTP는 document의 일부분을 fetch하여 Web pages를 on demand로 update 할 수 있다.

## Components of HTTP-based systems
HTTP는 client-server portocol이다. request는 어떤 entity(user-agent 또는 이것을 대신하는 proxy)에 의해서 보내진다. user-agent의 대부분의 시간동안 Web brower이다. 하지만 user-agent는 어떤 것이든 될 수 있다. 예를들면 search engine index를 유지하고 채우기 위해서 Web을 crawl하는 로봇이 될 수 있다.

각각의 request는 request를 처리하고 response를 제공하는 server로 보내진다. client와 server 사이에는 엄청 많은 entities(집합적으로 proxies라고 불린다)가 있다. entities는 다른 operation을 수행하고 예를들어 gateways 또는 cache 같이 행동한다.

**이미지 추가**

현실에서 brower와 request를 처리하는 server 사이에는 더 많은 컴퓨터가 있다. router, modem 등등. Web의 layered design 덕분에 이것들은 network와 transport layer에 숨겨져있다. HTTP는 application layer의 가장 위에 있다. 비록 network 문제를 진단하는 것이 중요하더라고 하위 layer은 대부분 HTTP의 설명과 관련이 없다.

### Client: the user-agent[black]
user-agent는 user를 대신해서 행동하는 툴을 의미한다. 이 역할은 주로 Web brower에 의해서 실행된다. 그 외에는 개발자가 application을 debug하는 프로그램일 가능성이 있다.

brower는 항상 request를 시작하는 entity이다. 절대 서버가 아니다(비록 몇몇 매커니즘이 수년간 걸쳐 server-initiated message를 시뮬레이션하였어도.)

Web page를 표시하기 위해서 brower는 HTML doc을 fetch하기 위해서 original request를 보내야 한다. 그리고나서 file을 parse하여 script 실행, 표시하기 위한 laytou information(CSS), image나 video같은 sub-resource 추가적인 request를 만든다.(???) 그리고 web brower는 이 resource들을 섞어 유저에게 완성된 doc, 웹 페이지를 보여준다. brower에서 실행되는 script는 뒤에있는 phase에서 좀 더 많은 resource를 fecth할 수 있다. 그리고 브라우저는 따라서 웹 페이지를 업데이트한다.

웹 페이지는 hypertext document이다. 보여지는 텍스트의 몇몇 부분이 링크라는 것을 의미한다. 링크는 유저에게 user-agent를 지시하고 web을 통하여 navigate하는 것을 도와주며 새로운 웹 페이지를 fetch하기 위해서 actiave(보통 마우스 클릭) 될 수 있는 것이다. 브라우저는 이런 지시들을 HTTP request로 변환하고 HTTP response를 해석하여 user에게 clear response와 함께 보여준다.

### The Web Server 
소통 채널의 반대 부분은 서버이다. 서버는 클라이언트가 request한 document serve 한다. 서버는 논리적으로 single machine으로 나타난다. 이는 로드(로드 밸런싱) 혹은 그때 그때 다른 컴퓨터(캐시, DB 서버, e-커머스 서버 등과 같은)들의 정보를 얻고 완전하게 혹은 부분적으로 on demand하게 문서를 생성하는 소프트웨어의 복잡한 부분을 공유하는 서버들의 집합일 수도 있기 때문입니다.

서버는 single machine에서는 필요하지 않으나 몇몇 서버 소프트웨어 instance가 같은 machine에 host되어있어야한다. HTTP/1.1와 Host 헤더를 가지면 같은 IP address를 공유할 수 있다.(???

### Proxies
웹 브라우저와 서버 사이에 엄청 많은 컴퓨터와 머신이 HTTP message를 전달한다. Web stack의 layered 구조 때문에 대부분은 transport와 network, physical 레벨에서 동작하여 HTTP layer에서 투명해지고 잠재적으로 성능에 엄청난 영향을 준다. application layer에서 일어나는 이런 동작들을 proxies라고 부른다. 이것들은 그들이 받은 request를 어떤 방식으로든 변경하지 않고 전송하면서 투명해질 수 있다. 이 경우 서버로 전달하기 전에 request를 어떤 방식으로든 변경해야한다(???)
- caching (brower cache와 같이 cache는 public 또는 private가 될 수 있다)
- filtering (like an antivirus scan or parental controls)
- load balancing (to allow multiple servers to serve the different requests)
- authentication (to control access to different resources)
- logging (allowing the storage of historical information)

## Basic aspects of HTTP
### HTTP is simple
HTTP/2에서 HTTP message를 frame으로 캡술화하는 복잡한 것이 소개되었더라도 HTTP는 일반적으로 쉽고 인간이 읽기 편하게 설계되었다. HTTP message는 인간이 쉽게 이해하고 읽을 수 있어 개방자가 test를 더 쉽게하고 신규 개발자에게 복잡함을 줄여주었다.

### HTTP is extensible
HTTP/1.0에 소개되어있는 HTTP header는 이 protocol을 쉽게 확장하고 실험할 수 있게한다. 새로운 기능은 새로운 헤더의 semantic에 대한 client와 server사이의 쉬운 agreement로 소개된다.

### HTTP is stateless, but not sessionless
HTTP는 stateless하다. 동일한 연결에서 연속적으로 수행되는 두 request사이에 링크가 없다. 이로인해 특정 페이지와 일관되게 상호 작용하려고 시도하는 유저에게 즉시 문제가 될 가능성을 가지고 있다. 예를들면 e커머스 장바구니가 있다. 그러나 HTTP의 core가 statless인 반면에 HTTP cookie는 statefull session을 가능하게 한다. 헤더 확장성을 이용하여 HTTP cookie는 workflow에 추가되어 동일한 context와 동일한 state를 공유하는 각각의 HTTP request를 통해 session 생성을 가능하게 한다.(???)

### HTTP and connections
연결은 transport layer에서 제어된다. 그러므로 원칙적으로 HTTP의 scope 밖이다. HTTP가 connection-based가 되기 위해서 하위 transport protocol을 필요로 하지 않는다. 신뢰할 수 있거나 messag가 손실되지 않는 것(최소한 오류)이 필요하다.(???) Internet에서 2개의 가장 일반적인 protocl 중에 TCP는 reliabe하고 UDP는 그렇지 않다. 그러므로 HTTP는 connection-based인ㄷ TCP-규격에 의존한다.

client와 server가 HTTP request/response 짝을 교환하기 전에 그들은 몇개의 round-trip를 요구하는 process인 TCP connection을 만들어야한다. HTTP/1.0의 기본 동작은 각각의 HTTP request/response 짝인 분리된 TCP connection을 여는 것이다. 이 방법은 다수의 request가 close succession으로 보내질 때 하나의 TCP connection을 공유하는 것보다 덜 효율적이다.

이런 단점을 줄이기 위해서 HTTP/1.1은 pipelining(구현하기 어렵다)와 persistent connections(하위 TCP connection은 Connection header를 사용하여 부분적으로 제어할 수 있다)소개하였다. HTTP/2는 단일 connection에서 multiplexing message으로 인해 한단계 더 나아가고 connection을 warm하고 효율적으로 유지하게 도와주었다.

HTTP에 더 적합한 tranport portocol을 좋게 설계하는 실험은 현재 진행 중이다. 예를들면 구글은  더 reliable하고 효율적은 transport layer를 위해서 UDP를 build하는 QUIC를 실험하고 있다.

## What can be controlled by HTTP
HTTP의 확장 가능한 특성은 시간이 지나면서 Web를 좀 더 제어하고 기능성있게 해주었다. Cache 또는 authentication 방법은 early HTTP에서 처리되는 기능들이다. 반대로 orogin contraint를 relax하는 기능은 2010s에 추가되었다.

아래는 HTTP의 controllable한 특성들이다.
>**[Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)**  
doc이 cache 대는 방법은 HTTP에 의해서 제어될 수 있다. 서버는 proxy와 client에게 무엇을 얼마나 cache할지 지시할 수 있다. client는 intermediate cache proxy를 지시하여 stored doc를 무시할 있게 할 수 있다.

>**Relaxing the origin constraint**
snooping과 다른 개인 침범을 막기 위해서 웹 브라우저는 웹 사이트 간에 강력한 분리를 시켰다. 오직 same origin으로 부터의 페이지끼리 웹 페이지의 모든 정보를 접근할 수 있다. 이런 제한이 server에 부담이 되지만 HTTP 헤더는 
