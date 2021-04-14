# Service Worker API

service worker는 필수적으로 web application, browser 또는 network 사이에 있는 proxy server 인 것처럼 동작한다.

효과적은 오프라인 경험을 생성하고 network request를 가로채고 네트워크 사용여부에 따라 적절한 조치를 취하고 서버에 있는 asset를 업데이트 하기 위한 것이다. 또한 푸시 알림과 백그라운드 sync API에 대한 접근을 혀용한다.

## Service worker concpets and usage
service worker는 origin과 path에 대해 등록된 event-driven worker이다. 연결된 웹페이지를 제어하고 navigation과 resource request를 가로치고 수정하며 매우 세분화된 방식으로 resource를 캐싱하여 앱이 작동하는 방식을 완벽하게 제어할 수 있는 JavaScript file의 form을 취한다.

service worker는 worker context에서 실행된다. 즉 DOM 접근이 아니다. 또 app을 실행시키는 main JavaScript와 다른 thread에서 동작한다. 그렇기 때문에 non-blocking이다. 이것은 full async로 디자인 되었다. 결과적으로 synchronous XHR 과 Web Storage같은 API는 service worker에서 사용할 수 없다.

Service worker는 오직 보안 이유로 HTTPS 위에서 실행된다. network request를 수정한 상태에서 man in the middle attack을 공개하는 것은 정말 나쁠 것이다. Firefox에서  Service Worker API는 숨겨져있으며 user가 private browsing mode일 때는 사용할 수 없다.

### Registration
service worker는 ServiceWorkerContainer.register()를 통해서 처음에 등록된다. 만약 성공한다면 service worker는 client에 설치되며 전체 origin 또는 사용자가 지정한 subset에서 사용자가 접근한 URL에 대해 설치/활성화를 시도한다.

### Downliad, install and actiave
service worker는 아래 lifecycle을 따른다.
1. Download
2. Install
3. Activate

service worker는 user가 처음에 service worker에 접근 시 즉시 설칯된다.

그 이후 
- A navigation to ans in-scope page occurs
- An event is fired on the service worker and it hasn't been downloaded in the last 24 hours

설치된 파일이 기존 service worker와 다르거나 page/site에 대해 처음 발견된 service worker가 새 파일인 경우설치가 시도된다.

만약 이용가능한 service worker가 존재한다면 background에 새로운 버전이 설치되고 (실행되는 것은 아니다). 이 시점을 worker in waiting이라고 한다. 이것은 어떤 page load가 더이상 필요하지 않을 때 실행된다. page가 더이상 로드할 필요가 없을 때 새로운 service worker가 동작한다. ServiceWorkerGlobalScipe.skipWaiting()을 통해서 더 일찍 실행시킬 수 있다.

또한 install, activate event를 listen할 수 있다.

### Other use case ideas
service worker는 아래와 같이 사용될 수 있다.
- 백그라운드 데이터 동기화
- 다른 origin으로 부터 resoure request를 응답한다.
- geolocation, gyrosocpe같은 비싼 데이터를 업데이트 할 수 있다.
- client-side compling과 dependency management를 할 수 있다.
- 백그라운드 서비스 hook
- 특정 URL pattern에 따른 template를 커스텀 할 수 있다.
- 성능 증가.

# Reference
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#service_worker_concepts_and_usage