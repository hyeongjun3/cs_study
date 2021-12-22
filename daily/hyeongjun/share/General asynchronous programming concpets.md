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
