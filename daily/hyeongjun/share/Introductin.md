https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

Events는 actions이나 occurence이다. Event는 programming한 system에서 system의 너에게 원하는 방법으로 응답할 수 있게 한다. 예를들면, 만약 유저가 webpage의 button은 선택했다면ㅡ 너는 아마 정보 상자를 보여주는 것을 원할 것이다. 이 글에서 우리는 event의 중요한 concept에 대해서 브라우저에서 어떻게 동작하는지 알아볼 것이다. 

## A series of fortunate events
위에서 언급한 것 처럼 events는 actions 또는 occurence이며 프로그래밍한 system에서 발생한다. system은 event가 일어날 때 다양한 signal (또는 파일)을 생성하고 mechanism을 제공한다. 이 매커니즘은 event가 발생할 대 자동적으로 taken(어떤 code가 실행)하는 action이다. 예를들면 공항에서 signal은 pilot가 통신된다. 결과적으로 비행기는 안전적으로 착륙한다.

웹의 경우에 event는 브라우저 윈도우 안에서 fire 되며 특정한 item에 붙을려는 경향이 있다. 이 아이템은 single elementm set of element, the HTML doc 또는 브라우저 윈도우 전체일 수 있다. 아래 다양한 event가 있다.
- The user selects a certain element or hovers the cursor over a certain element
- The user chooses a key on the keyboard
- The user resizes or closes the browser window
- A web page finishes loading
- A form is submitted
- A video is played, paused, or finishes
- An error occurs

Event 정보는 [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)에서 확인 할 수 있다.

각각 이용가능한 event는 event handler를 가지고 있다. event handler는 code block(보통 프로그래머가 만든 JavaScript 함수)이며 event가 fire 되었을 때 실행된다. 이 같은 code block이 event의 응답으로 실행되기 위해서 정의되었을때 우리는 registering an event handler라고 말한다. Note : event handler는 때때로 event listener라고 불리며 이건 좀더 목적에 따라 interchangeable하다. listener는 event가 일어나는 것을 listen하고 handler는 event 발생에 대한 응답으로 실행되는 것이다.

>Note: Web event는 JavaScript language가 아니다. brower안에 built in 되어 있는 API이다.

### A simple example
아래 예제를 보자. 지금까지 많은 event와 handler 예제를 보았지만 확실히 해보자. 아래 예제에서 우리는 background color를 랜덤하게 바꾸는 button을 클릭하자.
```html
<button>Change color</button>
```
```js
const btn = document.querySelector('button');

function random(number) {
    return Math.floor(Math.random() * (number+1));
}

btn.onclick = function() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```
위 코드에서 우리는 btn constant value를 포함하고 Document.querySelector()를 호출하는 button reference를 저장하고 있다. 우리는 또한 random number를 리턴하는 함수를 정의했다. code의 3번째 파트는 event handler이다. btn containt 는 button element를 가르키고 이 타입의 object는 fire 할 수 있는 다양한 이벤트를 가지고 있다. 우리는 onclick event handler를 설정하여 click event가 fire 되기를 기다린다.

### It's not just web pages
이 부분에서 JavaScript에서 중요한 것은 event는 유일하지 않다는 것이다. 대부분의 programming language는 어떤 event model을 가지고 있다. 그리고 model이 동작하는 방법은 주로 JavaScript의 방식과는 다르게 동작한다. 사실. web page를 위한 JavaScript모델은 다른 환경에서 사용하는 JavaScript 모델과는 다르다.

예를 들면, Node.js는 유명한 JavaScript runtime 이며 개발자가 JavaScript를 이용하여 network와 server-side application을 만들 수 있게 해준다. Node.js event model는 listener와 emitter에 의존한다. 이것이 별로 크게 달라 보이지는 않지만 code는 살짝 다르다. on()은 event listener에 등록하며 once()는 등록 후 한번 실행되면 등록해제된다. 

또 JavaScript를 사용하여 cross-brower add-on를 만들 수 있다. WebExtensions이라고 불리는 기술을 이용한다. event model 은 web event model과 닮았지만 조금 다르다. event listener 속성은 camel-cased(onmessage보다 onMessage)이며 addListener와 함수와 합쳐져야한다. [runtime.onMessage page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#examples)에 예제가 있다.

## Ways of using web events
eventer listener code를 웹 페이지에 추가하는 방법은 다양하다

### Event handler properties
