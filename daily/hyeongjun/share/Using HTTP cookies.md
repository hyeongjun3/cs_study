https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

# Using HTTP cookies
HTTP cookie(web cookie, broser cookie)는 서버가 유저의 web browser에 전송하는 data의 작은 부분이다. 브라우저는 쿠키를 저장하고 이후 동일한 서버에 보내는 request에 같이 전송한다. 전형적으로 2개의 request가 같은 서버에서 온 것을 알 수 있다. 예를들면 logged in 을 유지한다. stateless HTTP protocol를 위한 stateful 정보를 기억한다.

- Session management  
Logins, shopping cars, game scores 또는 서버가 기억해야하는 어떤 것

- Personalization  
User preference, thems 와 다른 세팅

- Tracking  
Recording and analyzing user behavior

쿠키는 일반적으로 client-side storage로 사용되었었다. client가 data를 저장하는 유일한 방법이었을 때는 유효했지만 지금은 modern storage APIs를 사용하는 것을 추천한다. 쿠키는 모든 request에 같이 전송된다. 그래서 성능을 악화시킨다(특히 mobile data connection). client storage를 위한 현대 API는 Web Storage API(localStorage와 sessionStorage)와 IndexedDB가 있다.

## Creating cookies
HTTP request를 받은 후 서버는 하나 또는 다수의 Set-Cookie 헤더를 response와 함께 전송할 수 있다. 쿠키는 보통 browser에 의해서 저장된다. 그리고 쿠키는 Cookie HTTP 헤더에 있는 같은 서버로 보낼때 request와 함께 보내진다. expiration data 또는 duration은 특정지을 수 있으며 그 이후에는 쿠키는 더이상 전송되지 않는다. 특정 domain이나 path에 대한 추가 제한을 설정할 수 있다. 

### The Set-Cookie and Cookie headers
Set-Cookie HTTP response 헤더는 서버에서 user agent로 cookie를 보낸다. 아래는 예제이다
```
Set-Cookie : <cookie-name>=<cookie-value>
```

```
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```
그리고 모든 subsequent request는 쿠키를 포함한다
```
GET /sample_page.html HTTP/2.0
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

### Define the lifetime of a cookie
쿠키의 lifetime은 2가지 방식으로 정의된다.

- Session cookie는 현재 session이 끝나면 제거된다. 브라우저는 current session이 끝날 때를 정의하고 몇몇 브라우저는 재시작될 때 session restoring을 사용한다. 이것은 session cookie가 무기한으로 지속되게한다.

- Permanent cookie는 Expires 또는 Max-Aage 속성에 위해서 특정 시간에 제거된다.

예를 들면
```
Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;
```
만약 사이트가 user를 authenticate하면 session cookie가 이미 존재하더라도 autehnticate가 일어날 때 마다 재생성하고 재전송해야한다. 이 테크닉은 third party가 유저의 session을 재사용할 수 있는 session fixation attack을 막아준다.

### Restrict access to cookies
쿠키가 안전하게 보내지고 의도되지 않은 script에서 실행되지 않게 보장하는 다양한 방법이 있다. Secure와 HttpOnly 속성이다.

Secure 속성을 가진 쿠키는 서버에 오직 HTTPS protocol을 통해서 암호화된 request로 보내진다. 그러므로 man-in-the-middle attacker에게 쉽게 접근을 허용하지 않는다. 안전하지 않은 사이트(http://)는 Secure 속성을 설정할 수 없다. 그러나 Secure 속성이 쿠키의 모든 민감한 정보의 접근을 막는 것이 아니다. 예를들면 누군가 client의 하드 디스크(또는 만약 HttpOnly 속성이 설정되어 있지 않다면 JavaScript)를 읽어서 읽거나 수정할 수 있다.

HttpOnly 속성을 가진 쿠키는 JavaScript의 Document.cookie API를 통해서 접근할 수 없다. 오직 server로 전송된다. 예를들면 server-side session에서 유지하는 cookie는 JavaScript가 접근할 필요가 없어 HttpOnly 속성을 지정해야한다. 이런 예방은 XSS attack을 줄일 수 있다.

```
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
```

### Define where cookies are sent
Domain과 Path 속성은 쿠키의 scope를 정의한다. 

**Domain attribute**  
Domain 속성은 어떤 host가 쿠키를 받는 것을 허락할지 특정짓는다. 만약 설정되어 있지 않다면 디폴트값은 cookie를 설정한 host를 갖는다 (subdomain를 제외하고). 만약 Domain 속성이 설정되어있다면 subdomain는 항상 포함된다. 그러므로 Domain을 설정하는 것은 빠뜨린 것보다 덜 제한적이다. 그러나 만약 subdomain의 정보를 공유해야하면 유요하게 사용할 수 있다.

예를들면 만약 Domain=mozilla.org가 설정되어 있다면 쿠키는 subdomain인 developer.mozilla.org 에서도 사용가능하다.

**Path attribute**  
Path 속성은 쿠키 헤더를 보내기 위해 요청된 URL에 반드시 존재해야하는 URL path를 가르킨다.

예를들면 Path=/docs가 설정되면 
- /docs
- /docs/Web/
- /dics/Web/HTTP

와 매칭된다.

**SameSite attribute**  
SameSite 속성은 서버가 
