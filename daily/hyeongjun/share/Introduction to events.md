https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events



Events는 프로그래밍한 시스템에서 발생하는 actions이나 occurence이다.

예를들면, 만약 유저가 webpage의 button은 선택했다면, 아마 정보 상자를 보여주는 것을 원할 것이다. 이 글에서 우리는 event의 중요한 concept에 대해서 브라우저에서 어떻게 동작하는지 알아볼 것이다. 

## A series of fortunate events
위에서 언급한 것 처럼 events는 프로그래밍한 시스템에서 발생하는 actions 또는 occurence이다. 시스템은 어떤 이벤트가 발생할 때 신호를 제공(또는 fire) 하고 자동적으로 action이 일어날 수 있는 mechanism을 제공한다.

웹의 경우에 event는 브라우저 윈도우 안에서 fire 되며 특정한 아이템에 붙을려는 경향이 있다. 이 아이템은 single element, set of element, 현재 tab에 로드 되어있는 the HTML doc 또는 브라우저 윈도우 전체일 수 있다. 다양한 종류의 이벤트가 발생할 수 있다. 

예를들면
- The user selects a certain element or hovers the cursor over a certain element
- The user chooses a key on the keyboard
- The user resizes or closes the browser window
- A web page finishes loading
- A form is submitted
- A video is played, paused, or finishes
- An error occurs

Event 정보는 [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)에서 확인 할 수 있다.

이벤트를 react 하기 위해서는 event handler에 붙여야 한다. event handler는 code block(보통 프로그래머가 만든 JavaScript 함수)이며 event가 fire 되었을 때 실행된다. 이 같은 code block이 event의 응답으로 실행되기 위해서 정의되었을때 우리는 registering an event handler라고 부른다. Note: event handlers는 때때로 event listener라고 불린다. 이들은 목적을 위해서 상호 교환이 가능하다. 엄밀히 이야기하며 서로 같이 동작한다. listener는 event가 일어나는 것을 listen하고 handler는 event 발생에 대한 응답으로 실행되는 것이다.

>Note: Web event는 JavaScript language가 아니다. brower안에 built-in 되어 있는 API이다.

### A simple example
아래 간단한 예제를 통해서 위에서 무엇을 의미했는지 보자. 아래 예제에서 우리는 background color를 랜덤하게 바꾸는 button을 클릭하자.

```html
<button>Change color</button>
```

```js
const btn = document.querySelector('button');

function random(number) {
    return Math.floor(Math.random() * (number+1));
}

btn.addEventListenr('click', () => {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
});
```
위 코드에서 우리는 btn constant value를 포함하고 Document.querySelector()를 호출하는 button reference를 저장하고 있다. 우리는 또한 random number를 리턴하는 함수를 정의했다. code의 3번째 파트는 event handler이다. btn containt 는 button element를 가르키고 이 타입의 object는 fire 할 수 있는 다양한 이벤트를 가지고 있다. 우리는 onclick event handler를 설정하여 click event가 fire 되기를 기다린다.

### It's not just web pages
이 부분에서 JavaScript에서 중요한 것은 event는 유일하지 않다는 것이다. 대부분의 programming language는 어떤 event model을 가지고 있다. 그리고 model이 동작하는 방법은 주로 JavaScript의 방식과는 다르게 동작한다. 사실. web page를 위한 JavaScript모델은 다른 환경에서 사용하는 JavaScript 모델과는 다르다.

예를 들면, Node.js는 유명한 JavaScript runtime 이며 개발자가 JavaScript를 이용하여 network와 server-side application을 만들 수 있게 해준다. Node.js event model는 listener와 emitter에 의존한다. 이것이 별로 크게 달라 보이지는 않지만 code는 살짝 다르다. on()은 event listener에 등록하며 once()는 등록 후 한번 실행되면 등록해제된다. 

또 JavaScript를 사용하여 cross-brower add-on를 만들 수 있다. WebExtensions이라고 불리는 기술을 이용한다. event model 은 web event model과 닮았지만 조금 다르다. event listener 속성은 camel-cased(onmessage보다 onMessage)이며 addListener와 함수와 합쳐져야한다. [runtime.onMessage page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#examples)에 예제가 있다.


## Using addEventListener()
웹페이지의 이벤트 핸들러를 등록하는 매커니즘 중 추천하는 메소드는  addEventListener() 이다.

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});
```

addEventListener() 함수는 2개의 parameter아 있다. 우리가 핸들러로 등록하기 원하는 이벤트의 이름과, hander 함수로 응답으로 실행됟기 원하는 코드이다.

아래처럼 함수를 분리해서 동작시킬 수 있다.
```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function changeBackground() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', changeBackground);
```

### Removing listeners
addEventListener()를 통해서 이벤트 핸들러를 등록했다면 removeEventListener()을 통해서 지울 수 있다. 아래 예제는 위의 changeBacground() 이벤트 핸들러를 제거하는 예제입니다.

```js
btn.removeEventListener('click', changeBackground);
```

이벤트 핸들러는 AbortSignal을 addEventListner()로 전송하여 제거하는 방법도 있다. 

```js
const controller = new AbortController();

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}, { signal: controller.signal})
```

위에서 생성된 이벤트 핸들러를 아래 방법으로 제거할 수 있다.
```js
controller.abort();
```

간단하고 작은 프로그램을 위해서 사용하지 않는 event handler는 크게 중요하지 않다. 그러나 크고 복작한 프로그램에서는 이것은 성능을 증가시킬 수 있다. 그리고 이벤트 핸들러를 제거하는 것은 같은 버튼에서 다른 환경에서 다른 동작을 할 수 있게 해준다.

### Adding multiple listeners for a single event
addEventListener()로 여러개의 listener를 등록하기 위해서는
```js
myElement.addEventListener('click', functionA)
myElement.addEventListener('click', functionB)
```

위 두 함수 모두 클릭 시에 fire 된다

## Other event listener mechanisms
addEventLister()를 통해서 이벤트 핸들러를 등록하는 것을 선호한다. 이것은 가장 강력한 method이고 복잡한 프로그램을 키우기에 적합한다. 그러나 eventhandler르 등록하는 다른 2가지 방법이 있다.: event handler properties와 inline event handler

### Event handler properties
Objetcs(버튼 같은) on이라고 불리는 속성으로 이벤트가 fire될 수 있다. 예를 들면 onclick이 있다.

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.onclick = () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
```

마찬가지로 아래와 같이 작성할 수 있다.
```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
} 

btn.onclick = bgChange
```

event hander 속성을 이용하면 하나의 이벤트에 대해 하나의 handler만 등록할 수 있다.
```js
element.addEventListener('click', function1);
element.addEventListener('click', function2);
```

위의 예제에서는 function1, function2 모두 호출된다. (순서는???)

```js
element.onclick = function1;
element.onclick = function2;
```

위의 예제의 경우 overwrite되어서 function2가 호출된다.

### Inline event handlers - don't use these
아래와 같은 코드를 볼 수 있다.
```html
<button onclick="bgChange()">Press me</button>
```

```js
function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
```

오래된 이 방법은 event handler HTML attribute(또는 inline event handler)를 포함합니다. 속성 값에 있는 핸들러는 `<script>` 태그 안 JavaScript 코드 입니다. 위 방법 외에 직접적으로 속성을 입력하는 방법도 있습니다.

```html
<button onclick="alert('Hello, this is my old-fashioned event handler!');">Press me</button>
```

HTML 특성에 event hanlder가 있는 것을 많이 보았을 것이다. 하지만 사용하면 안된다. 정말 급할 떄 사용해야한다.

처음으로 이것은 HTML과 JavaScript를 섞어 가독성을 떨어트린다. JavaScript 코드는 분리 하는 것이 좋은 예제이다. 

하나의 파일일지라도 inline event handler는 좋은 선택이 아니다. 하나의 버트은 OK 그러나 100개라면? inline event handler를 사용하지 않으면 아래 처럼 쉽게 구현할 수 있다.
```js
onst buttons = document.querySelectorAll('button');

for (const button of buttons) {
  button.addEventListener('click', bgChange);
}
```

절대 HTML event handler attribute를 사용하면 안된다!!

## Event objects
때때로, 이벤트 핸들러 함수 내부에서 매개변수 event, evt 또는 e 을 보았을 것이다. 이것은 event object라고 불리며 자오적으로 event handler에 전송된다.

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange(e) {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener('click', bgChange);
```

event object e를 볼 수 있고 e.target을 이용하여 background color style을 바꾼 것을 볼 수 있다. event object의 target 속성은 항상 event가 발생한 element을 참조한다.

### Extra properties of event objects
대부분 event object는 standard properties와 methods가 있다. 더 찾아보도록

어떤 event object는 특정 event과 관련된 추가적인 properties가 있다. 예를들면 keydown 이벤트는 유저가 key를 누를 때 fire 된다. 이 event는 keyboardEvent로 key 속성을 가지고 있다.

```html
<input id="textBox" type="text"></input>
<div id="output"></div>
```

```js
const textBox = document.querySelector("#textBox");
const output = document.querySelector("#output");
textBox.addEventListener('keydown', event => output.textContent = `You pressed "${event.key}".`);
```

### Preventing default behavior
때때로, default로 이벤트를 막고 싶은 상황을 마주칠 떄가 있다. web form의 대부분 예제는 custom registration form 이다. deatil을 채우고 submit button을 선택하면 데이터가 처리를 위해 서버의 지정된 페이지에 제출되고 브라우저가 일종의 성공 메시지페이지로 리디렉션 되는 자연스러운 동작(또는 페이지가 지정되지 않는 경우 동일한 페이지입니다).

문제는 유저가 데이터를 정확하게 submit하지 않았을 때 발생합니다. 개발자는 서버에 보내는 submission을 막고 싶고 어떤 것이 잘못되었는지 알려주는 에러 메시지를 받고 싶습니다. 몇몇 브라우저는 자동적으로 form data validation을 하나 아닌 것들도 있습니다. 아래 예제를 보겠습니다.


```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text">
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text">
  </div>
  <div>
     <input id="submit" type="submit">
  </div>
</form>
<p></p>
```

현재 JavaScript에서 submit event에 text field가 비어있는지 확인하는 정말 간단한 check가 있습니다. 그렇다면, 이벤트 객체에서 preventDefault()함수를 호출하여 양식 제출을 중지한 다음 양식 아래 단락에 오류 메시지를 표시하여 사용자에게 무엇이 잘못되었는지 알려줍니다.

```js
const form = document.querySelector('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const para = document.querySelector('p');

form.addEventListener('submit', e => {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
});
```

명백히 위는 정말 약한 validation 입니다. 스페이스나 숫자가 들어올때는 통과하게 되어있다.

## Event bubbling and capture
