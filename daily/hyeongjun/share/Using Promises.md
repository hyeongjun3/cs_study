https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

## Using Promises
Promise object는 비동기 동작의 eventual completion과 그 결과값을 표헌한다. 대부분의 사람들은 already-created promises의 소비자이기 때문에 이 guide는 어떻게 생성되는지 설명하기 전에 returned된 promise의 conmsumption을 설명하겠다.\
</br>
본질적으로, promise는 callback을 함수로 전달하는 대신 callback을 attach하는 returned object이다.\
</br>
configuration record와 2개의 callback 함수를 매개변수로 가지는 비동기적으로 sound file을 만들어내는 createAudioFileAsync() 함수를 상상해라. 2개의 callback 함수는 만약 auido file이 성공적으로 생성되면 호출되고 나머지는 error가 발생하면 호출된다.\
</br>
아래 예제를 보자
```js
function successCallback(result) {
    console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
    console.error("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback,k failureCallback);
```
최신 함수는 callback을 attach할 수 있다는 promise를 return 합니다. ???\
</br>
만약 createAudioFileAsync()가 promise를 return하게 다시 쓰였다면, 아래와 같이 쉽게 쓸 수 있다.
```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```
이것을 짧게 표현하면
```js
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);
```
위를 비동기 함수 call이라고 부른다. 이 방법은 많은 이점을 가지고 있다.

### Guarantees
callback을 전달하는 오래된 방식과 달리 promise는 몇몇 점을 보장한다.
- callback은 JavaScript event loop의 [completion of the current run]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Run-to-completion]) 이전에 절대 호출되지 않는다.
- 위 예제처럼 then()과 같이 추가된 callback은 비동기 동작의 성공 혹은 실패 이후에 호출된다.
- Multiple callback은 then()을 여러번 호출하면서 추가될 것이다. 각각의 callback은 추가한 순서대로 다른 callback이 호출된 이후에 호출이 된다.

### Chaining
보통 need는 2개 혹은 그 이상의 비동기 동작을 이전 step의 결과와 함께 back의 back(각각의 subsequent operation이 이전 operation이 성공한 이후에 시작된다)에서 실행하는 것이다. promise chain을 통해서 할 수 있다.\
</br>
아래 예제가 있다. then()함수는 original과 다른 new promise를 return 한다.
```js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```
promise2는 doSomething()뿐만 아니라 전달해준 successCallback 이나 failureCallback의 완료를 표현한다. 이 callback은 promise를 return하는 다른 비동기 함수일 수 있다. 위의 경우에는, promise2 에 추가되는 callback은 successCallback 또는 failureCallback을 return 받는 promise 뒤에 queue에 들어간다.\
</br>
기본적으로, 각각의 promise는 chain의 다른 비동기 step의 완료를 나타낸다.\
</br>
오래전에 비동기 operation을 수행하기 위해서 아래와 같이 만들었다.
```js
doSomething(function(result)) {
    doSomethingElse(result, function(newResult) {
        doThirdThing(newResult, function(finalResult){
            console.log('Got the final result:' + finalResult);
        }, failuerCallback);
    }failuerCallback);
},fail,uerCallback);
```
최근 함수에서는 promise chain을 사용할 수 있다.
```js
doSomething()
.then(function(result) {
    return doSomethingElse(result);
})
.then(function(newResult){
    return doThirdThing(newResult);
})
.then(function(finalResult){
    console.log('Get the final result: ' + finalResult);
})
.catch(failurCallback);
```
then의 매개변수는 optional이고 catch(failurCallback)은 then(null, failurCallback)의 짧은 버전이다.
```js
doSomething()
.then(result => doSomethingElse(result))
.then(newresult => doSomethingElse(newResult))
.then(finalresult => {
    console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```
**Important**: 항상 result를 return해야한다. 그렇지 않으면 callback은 이전 promise의 result를 catch하지 못한다. (() => x 는 () => {return x;}의 짧은 버전이다.)

### Chaining after a catch
실패(i.e. catch) 이후에 chain하는 것도 가능하다. chain에서 실패 이후에 새로운 action을 하기에 유용하다. 아래 예제를 보자.
```js
new Promise((resolve, reject) => {
    console.log('Initial');

    resolve();
})
.then(() => {
    throw new Error('Something failed');

    console.log('Do this');
})
.catch( () => {
    console.error('Do that');
})
.then( () => {
    console.log('Do this, no matter what happend before');
});
```
아래는 결과이다.
```
Initial
Do that
Di this, no matter what happend before
```

## Error propagation
이전에 failureCallback을 3번이나 부르는 에제를 보았다. 한번만 호출하는 promise chain과 비교해보자
```js
doSomething()
.then(result => doSomethingElse(result))
.then(newresult => doSomethingElse(newResult))
.then(finalresult => {
    console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```
만약 여기에 exception이 발생한다면, 브라우저는 chain의 catch() handler 혹은 onRejected를 바라볼 것이다. 아래는 동기 코드가 작동하는 방법으로 model한 것 이다.
```js
try {
    const result = syncDoSomething();
    const newResult = syncDoSomethingElse(result);
    const finalResult = syncDoThirdThing(newResult);
    console.log(`Got the final result : ${finalResult}`);
    } catch(error) {
        failureCallback(error); 
    }
}
```
ECMAScript 2017에서 async/await syntactic sugar를 사용하여 비동기 코드와 대칭이 되게 만들어졌다.
```js
async function foo() {
    try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log(`Got the final result : ${finalResult}`);
    } catch(error) {
        failureCallback(error);
    }
}
```
Promise는 callback 지옥을 해결하였다.

### Promise rejection events
promise가 reject될 때마다 2개의 event 중 한개는 global scope에 전달된다.(보통, window 이거나 만약 web worker에서 사용되고 있다면 Work 또는 다른 wokrer-based interface이다). 2개의 이벤트는\
</br>
>rejectionhandled\
reject function으로 rejection이 처리된 다음 promise가 reject될 때 보내진다.

>**unhandledrejection**\
promise가 reject될 때 보내진다. 그러나 사용가능한 rejection handler가 없다.

두개의 경우, event(PromiseRejectionEvent type)는 reject된 promise를 가르키는 promise 속성과 promise가 reject된 이유를 알려주는 reason 속성을 가지고 있다.\
</br>

