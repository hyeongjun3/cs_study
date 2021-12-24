https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts

## 비동기?
보통, 코드는 한번에 하나만 일어나며 straight로 실행된다. 만약 함수가 다른 함수의 결과에 의존한다면, 다른함수가 끝나고 return할 때 까지 기다린다. 끝날 때 까지는 사용자 관점에서는 멈춰있다.

예를드면 맥 유저는 가끔 비치볼 커서를 보는데 이 거서는 OS가 "현재 프로그래음은 멈춰 다른 프로그램이 끝나기를 기다리는 거야" 라고 이야기 하는 것이다.

이건 황당한 경험이고 컴퓨터 processing power에 좋지 않다. 특히 멀티 프로세서 코어를 사용한다면. 다른 프로세서 코어가 끝나기를 기다리는 것은 no sense이다. 그 동안 에 다른 일을 할 수 있는 것이 비동기 프로그래밍의 기본이다. 이것은 너가 사용하는 환경(웹 브라우저...)에 따라 비동기 함수를 제공한다.

## Blocking code
비동기 테크닉은 매우 유용하며 특히 web programming에서 유용하다. web app 이 browser에서 실행 되거나 브라우저에게 제어권을 반환하지 않고 intensive chunk of code를 실행할 때, 브라우저는 frozen 될 수 있다. 이것을 blocking 이라고 한다. 브라우저는 user input이나 다른 task를 perform 할 때 제어권을 받을 때 까지 block 된다.

아래 blocking의 의미를 확실히 하기 위해 예제를 보자ㅣ.

[simple-sync.html](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync.html), 우리는 click event listener를 버튼에 등록했다. 우리가 클릭할 때 시간을 잡아먹는 동작을 한다.

```js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  let myDate;
  for(let i = 0; i < 10000000; i++) {
    let date = new Date();
    myDate = date;
  }

  console.log(myDate);

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

예제를 실행할 때 JavaScript console을 열고 button을 클릭해봐라. for loop가 끝나 console 메시지를 로깅 하기 전까지 paragraph가 나타나지 않을 것이다. for loop 이후 코드는 for loop가 끝나기 전까지 실행되지 않는다.

다음 예제는 [simple-sync-ui-blokcing.html](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync-ui-blocking.html). 좀 더 현실적인 예제를 가져왔습니다. UI를 렌더링하면서 user interactivity를 block합니다.

- 'Fill canvase' 버트은 백만의 blue circle을 `<canvas>`에 채운다.
- 'Click me for alert'는 alert 메시지를 보여줍니다.

```js
function expensiveOperation() {
  for(let i = 0; i < 1000000; i++) {
    ctx.fillStyle = 'rgba(0,0,255, 0.2)';
    ctx.beginPath();
    ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
    ctx.fill();
  }
}

fillBtn.addEventListener('click', expensiveOperation);

alertBtn.addEventListener('click', () =>
  alert('You clicked me!');
);
```

## Threads
thread는 기보적으로 프로그램이 complete task를 할 수 있게 해주는 글 프로세스이다. 각각의 프로세스는 한번에 하나의 task를 할 수 있다.

```
Task A --> Task B --> Task C
```

각각의 task는 순차적으로 동작한다. 이전 task가 끝나야 다음 task가 실행된다.

우리기 이전에 말한 것 처럼, 많은 컴퓨터는 multiple core를 가지고 있어 많은 것들이 한번에 이루어진다. 프로그래밍 언어는 multiple core가 multipele task를 끝낼 수 있게하는 multiple thread를 지원한다.

```
Thread 1: Task A --> Task B
Thread 2: Task C --> Task D
```

### JavaScript is single-threaded
JavaScript는 전통적으로 single-thread 입니다. 멀티코어라도 하나의 thread(main thread라고 불립니다.)에 하나의 일만 할 수 있습니다. 위의 예제는 아래처럼 동작합니다.

```
Main thread: Render circles to canvase --> Display alert()
```

시간이 지나, JavaScript는 위의 문제를 해결할 수 있는 몇개의 도구를 얻었다. Web workers는 JavaScript processing 중 일부를 별도의 분리된 스레드로 보낼 수 있다. 분리된 스레드는 worker라고 불리면 여러개의 JavaScript chunk를 동시에 실행 할 수 있게한다. 너는 기본적으로 비싼 프로세스를 main thread 대신 worker가 처리하여 user interaction으 block 되지 않게 한다.

```
Main thread: Task A --> Task C
Worker thread: Expensive task B
```

위의 생각으로, [simple-sync-worker.html](https://github.com/mdn/learning-area/blob/main/javascript/asynchronous/introducing/simple-sync-worker.html) 예제를 보자. 위의 경우와 다르게 time을 계산하는 역할을 worker에게 넘겼다. (worker, promise 차이?) 이제 button을 클릭할 때, 브라우저는 date의 계산이 끝나기 전에 paragraph를 보여줄 수 있다. worker가 끝나면 console에 final date를 출력한다.

## Asynchronous code
web worker는 매우 유용하지만 한계를 가지고 있다. 중요한 것은 DOM에 접근하지 못하는 것이다. worker을 이용하여 UI를 업데이트 할 수 없다. 백만개의 파란색 원을 worker에게 넘길 수 없다. 

두번째 문제는 비록 worker가 non block으로 동작해도 여전히 synchronous하다. 이것은 함수가 이전의 다른 프로세스의 결과에 의존할 때 문제가 된다.

```
Main thread: Task A --> Task B
```

TaskA가 서버로부터 이미지를 가져오고 Task B가 이미지를 필터한다고 하자. 만약 TaskA를 실행하고 곧바로 Task B를 실행한다면 에러가 발생할 것이다.

```
  Main thread: Task A --> Task B --> |Task D|
Worker thread: Task C -----------> |      |
```

Task D가 TaskB와 TaskC의 결과를 이용한다고 하자. Task B와 Task C의 결과를 동시에 받는다면 괜찮지만 그렇지 않은 경우는 다르다. 

위의 문제를 해결하기 위해서 브라우저는 이 동작들을 비동기적으로 할 수 있게 하였다. Promise같은 feature가 위의 동작을 가릉하게 한다.
```
Main thread: Task A                   Task B
    Promise:      |__async operation__|
```

Operation은 어느 곳에서든 일어날 수 있기 때문에, main thread는 async operation이 실행되더라도 non blocking 이다.

