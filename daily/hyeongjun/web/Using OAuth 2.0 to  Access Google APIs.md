https://developers.google.com/identity/protocols/oauth2?hl=en


# Using OAuth 2.0 to Access Google APIs

Google APIs는 authentication과 authorization을  위해서 OAuth 2.0 protoco를 사용한다. 구글은 web server, client-side, installed, input이 제한된 application 같은 평범한 OAuth 2.0 시나리오를 제공한다.

시작하기 위해서 어떻게해라~

## Basic steps
OAuth 2.0을 이용해서 Google API를 접근할 때 아래기본 패턴을 따른다.

### 1. Obtain OAuth 2.0 credentials from the Google API Console
Google API Console에 접근해서 credential을 얻어라ㅣ. ~~~

### 2. Obtain an access token from the Google Authorization Server
application이 Google API를 사용해서 private 데이터를 접근하기 전에 API를 통해서 access token을 얻어야 한다. 하나의 access token은 다양한 APIs에 접근 권한을 부여할 수 있다. scope라고 불리는 parameter는 리소스와 access token이 허락하는 operation의 집하을 제어한다. access-token request 동안에 application은 scope 안에 하나 또는 더 많은 변수를 보내야 한다. (????)

위의 request를 만드는 방법은 여러개이다. 그리고 acpplication의 종류에 따라서 다양하다. 예를들면, JavaScript application은 Google에 redirect하여 access token은 request 해야한다. 반면에 device에 설치되어있는 application은 web service request를 할 browser가 없다.

몇몇 request는 google acount로 log in을 하는 authentication 단계가 필요하다. 로그인 후, 유저는 application에서 요청하는 하나 또는 그 이상의 권한을 부여할 것인지 묻는다. 이 프로세스를 **user consent** 라고 부른다.

만약 유저가 적어도 하나의 권한을 부여하면, google authorization server는 application에 access token(또는 authorization code : access token을 얻기 위해서 사용)와 token에 의해서 접근 권한을 부여받은 scope의 리스트를 전송한다. 만약 유저가 permission을 부여하지 않았다면 서버는 error을 응답한다.

### 3. Examine scopes of access granted by the user.

request에 포함되어 있는 scope는 response에 있는 scope와 일치하지 않을 수 있다. 심지어 유저가 모든 requested scope를 부여했을 지라도. 

### 4. Send the access token to an API
application이 access token은 얻은 이후, HTTP Authorization request header에 token은 넣어서 Google API에 request를 하면 된다. URI query-string 매개변수에 token을 보내는 것도 가능하나 추천하지 않는다. 왜냐하면 URI parameter는 보안성이 부족하다. 

### 5. Refresh the access token, if necessary.