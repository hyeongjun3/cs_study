https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling

인터넷의 다른 네트워크를 동해서 navigate 할 때, proxy server와 HTTP tunnel는 World Wide Web 위의 content를 접근하는 것을 도와준다. proxy는 user의 local 컴퓨터 위 또는 user의 컴퓨터와 인터넷 위의 목적지 서버 상에 어디에서든 위치할 수 있다. 이 페이지는 proxy에 대해서 간단하게 설명하고 몇가지 configuration option을 소개한다.

여기에는 2가지 타입의 proxy가 있다. forward proxies(or tunnel, or gateway) 그리고 reverse proxies(used to control and protect access to a server for load-balancing, authentication, decryption or caching)

## Forward proxies
forward proxy 또는 gateway 또는 그냥 proxy는 client나 client 그룹에게 proxy service를 제공한다. 인터넷에는 열려있는 forward proxy가 수천개가 존재할 것이다. 이것들은 인터넷 서비스(like DNS, or web page)를 저장하고 forward하여 bandwith를 제어하고 줄인다(???)

forward proxy는 anonymous proxy가 될 수 있으며 유저가 Web을 browe하거나 그들의 인터넷 서비스를 사용하는 동안 그들의 IP address를 숨길 수 있게한다.TOR(The Onion Roouter)은 다사의 anonymity를 위한 proxy를 통해 인터넷 트래픽을 라우트한다.

### Reverse proxies
이름과 같이 reveser proxy는 forward proxy와 반대의 역할을 한다. forward proxy는 client(또는 requesting hosts)를 대신하여 동작하였다. forward proxy는 client의 indentity를 숨길 수 있는 반면에 reverse porxy는 server의 indentity를 숨길 있다. reverse proxy는 아래 여려가지 용도로 사용된다.
- Load balancing : 여러개의 web server의 load를 분리한다.
- Cache static content : 그림같은 static content를 캐싱하여 web server를 offload한다.
- Compression : load time를 빠르게 하기 위해서 content를 압축하고 최적화한다.

## Forwarding client information through proxies
proxy는 request가 proxy의 IP 주소에서 시작된 것처럼 보이게 만들 수 있다. 이것은 proxy가 client에게 anonymity를 제공할 때 유용하지만 다른 경우에는 orignal request의 정보를 잃어버릴 수 있다. original client의 IP 주소는 주로 debugging, statistics 또는 location-dependent conten에 사용된다. 이 정보를 공개하는 일반적인 방법은 아래의 HTTP header를 사용하는 것이다.

The standardized header:

>Forwarded  
proxy가 request의 path에 속해 있을 때 알려지거나 잃는 proxy server의 client-facing side로 부터 정보를 포함한다.(???)

Or the de-facto standard versions:

>X-Forwarded-FOR

## HTTP tunneling
tunneling은 개인 네트워크 데이터와 protocol 정보를 data를 encapsulating하여 public 네트워크를 통해서 전달해준다. HTTP tunneling은 상위 레벨의 protocol(HTTP)를 사용하여 낮은 레벨의 protocol(TCP)에 전달한다.

HTTP protocol은 CONNECT를 호출하여 request method를 정할 수 있다. 이것은 requested resource와 같이 two-way 통신으로 시작하며 tunnel을 여는데 사용된다. 이것은 HTTP proxy뒤에 있는 client가 SSL(i.e. HTTPS, port 443)을 사용하여 웹사이트를 접근할 수 있는 방법이다. 그러나 모든 proxy 서버가 CONNET 방법을 지원하지 않는 것과 443 port로 제한한다는 것을 기억해라

## Proxy Auto-Configuratin(PAC)
A Proxy Auto-Configuration (PAC) 파일은 웹 브라우저 request(HTTP, HTTPS, FTP)가 목적지로 곧바로 갔는지 또는 웹 proxy server에 갔는지 알려주는 JavaScript 함수이다. PAC file를 포함하는 JavaScript 함수는 함수를 선언한다.

The auto-config file should be saved to a file with a .pac filename extension:
```js
proxy.pac
```
And the MIME type set to
```js
application/x-ns-proxy-autoconfig
```
파일은 FindProxyForURL이라 불리는 함수를 포함하고 있다. 아래 예제는 내부 DNS 서버가 setup이 되어있는 환경에서 동작할 것이다. 그래서 이것은 오직 내부 host name을 resolve할 수 있다. 그리고 목표는 resolvable하지 않은 hosts를 위해서 proxy를 사용하는 것이다.(???)
```js
function FindProxyForURL(url,host) {
    if (isResolvable(host))
        return "DIRECT";
    else
        return "PROXY proxy.mydomain.com:8080";
}
```
