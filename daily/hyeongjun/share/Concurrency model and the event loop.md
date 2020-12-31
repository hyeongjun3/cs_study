https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Run-to-completion
https://velog.io/@thms200/Event-Loop-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84
추가할 것

## Concurrency model and the event loop
JS는 event loop을 기반으로한 concurrency model을 가지고 있다. event loop은 코드 실행, event를 모으고 실행, queue에 있는 sub-task를 실행하는 역할을 한다. 이 모델은 C나 Java의 model과 조금 다르다.

### Runtime concepts
아래 section은 theoretical model을 설명한다. 최신 JS engine은 설명된 semantics을 크게 최적화하며 구현한다.

**Visual representation**\
image 추가\
</br>
**Stack**
```js
function foo(b) {
    let a = 10;
    return a + b + 11;
}

function bar(x) {
    let y = 3;
    return foo(x*y);
}

console.log(bar(7)); // return 42
```
bar를 호출할 때, bar의 매개변수와 local variable을 포함하는 첫번째 frame이 만들어진다. bar가 foo를 호출할 때, 두번째 frame이 만들어지고 첫번째 frame 위에 foo의 매개변수와 지역번수가 push 된다. foo가 return 될 때, 가장 위에 있느 frame element는 stack에서 pop되며 bar가 return될 때 stack은 비게된다.\
</br>
**Heap**\
Object는 메모리의 큰 영역(대부분 unstructured한)인 heap에 할당된다.\
</br>
**Queue**
JS runtime은 processed 되어야 할 message의 리스트인 message queue를 사용한다. 각각의 message는 message를 처리하기위해서 호출되는 associated 함수를 가지고 있다.\
</br>
event loop 동안의 몇몇 point에서 runtime은 queue의 가장 오래된 message부터 처리하기 시작한다. 이를 위해서 message는 queue로부터 지워지고 해당 함수가 input parameter인 message와 함께 호출된다. 항상 함수를 호출하면 해당 함수의 사용을 위한 새로운 스택 frame이 생성된다.\
</br>
function의 processing은 stack이 다시 비워질 때 까지 진행된다. 그리고 event loop은 queue의 다음 메시지를 진행한다.  

### Event loop
event loop은 어떻게 구현되는지 때문에 그 이름을 갖게 되었다.
```js
while(queue.waitForMessage()){
    queue.processNextMessage();
}
```
queue.waitForMessage()는 동기적으로 message가 도착하기를 기다린다(만약 message가 아직 사용불가능하면 처리되기를 기다린다).\
<br/>
**"Run-to-completion"**\
각각의 message는 다른 message가 처리되기 이전에 완전히 처리된다.\
</br>
이것은 함수가 실행될 때마다 선점될 수 없고 다른 코드가 실행되기 이전에 완전히 실행될 수 있다는 사실을 포함하여 program을 추론할 때 몇몇 좋은 properties를 제공한다. 이것은 C와 다르다. 예를들면, thread에서 function이 실행되면 runtime system에서 다른 thread의 다른 code를 실행하기 위해서 어느 시점에서 멈출 것이다.\
</br>
이 모델의 단점은 만약 message가 끝나기에 너무 길다면 web applicatoin은 클릭이나 스크롤같은 user interaction를 처리할 수 없다. 브라우저는 "script를 실행하는데 너무 오래 걸린다"라는 dialog로 문제를 완화한다. 위의 좋은 해결방법으로 message를 짧게 만들어 보는 것이다. 그리고 가능하다면 하나의 message를 여러개의 message로 나누는 것이다.\
</br>
**Adding messages**\
웹 브라우저에서는 event가 일어나면 message는 언제든 추가되고 event listener가 붙어 있다. 만약 event listener가 없다면 event는 잃어버린다. 그래서 event handler와 함께 element를 클릭해야 message가 추가된다.\
</br>
setTimeout 함수는 2개의 매개변수를 갖는다. queue에 추가할 message와 time value. time value는 queue에 message가 들어간 이후의 가장 작은 delay를 나타낸다. 만약 queue에 다른 message가 없고 stack도 비어있다면 message는 설정한 delay 이후에 실행될 것이다. 그러나 만약 message가 있다면 setTimeout message는 다른 message가 끝날 때까지 기다려야한다. 이러한 이유로 time value는 minimum 시간이다.\
</br>
아래는 예제이다.
```js
const s = new Date().getSeconds();

setTimeout(function() {
    // prints out "2", meaning that the callbakc is not called immediately after 500 milliseconds;
    console.log("Ran after " + (new Date().getSeconds() -s ) + " seconds");
}, 500);

while(true) {
    if (new Date().getSeconds() -s >= 2) {
        console.log("Good, looped for 2 seconds")
        break;
    } 
}
```

**Zero delays**\
</br>
zero delay은 0 millisecond로 call back이 되는 것을 의미하는게 아니다. 0값으로 setTimeout 호출 시 바로 실행되는 것이 아니다.\
</br>
실행은 queue에 있는 기다리는 task에 달려있따. 아래에 예제에서 message, ''this is just a message''는 callback에 있는 message가 처리되기 이전에 console에 쓰여질 것이다. 왜냐하면 request를 처리하기 위해서 runtime은 minimum time인 delay가 필요하기 때문이다.\
</br>
기본적으로, setTimeout은 queue에 있는 messages가 완전히 끝나기를 기다린다.
```js
(function() {
    console.log('this is the start');

    setTimeout(function cb() {
        console.log ('Callback 1: this is a msg from call back');
    }); // has a default time value of 0

    console.log('this is just a message');

    setTimeout(function cb1() {
        console.log('Callback 2: this is a msg from call back');
    },0);

    console.log('this is the end');
})();


// 'this is the start'
// 'this is just a message'
// 'this is the end'
// 'Callback 1: this is a msg from call back'
// 'Callback 2: this is a msg from call back'
``` 
**Several runtimes communicating together**\
</br>
web worker나 cross-origin iframe은 자기 자신의 stack, heap, message queue를 가지고 있다. 두 별개의 runtimes는 postMessage 방법을 통해서 message를 전달해 소통할 수 밖에 없다. 이 방법은 다른 runtime이 message event를 listen하고 있다면 message를 다른 runtime에 추가한다.

### Never blocking
event loop model의 흥미로운 속성은 JS never block 이다. I/O handling을 event나 callback으로 구성한다. 그래서 application이 IndexedDB query가 return되거나 XHR request가 return될 때를 기다릴 때 이것은 여전히 user input같은 다른 것들을 처리할 수 있다.\
</br>
옛 exceptions은 alert나 동기 XHR 같은게 존재했다. 그러나 ...??

