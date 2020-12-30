https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts

## Async scripts for asm.js
모든 중간 또는 큰 게임은 브라우저가 compliation prcoess를 최적화 할 수 있는 최대한의 유연성을 주기 위해서 async scipt의 일부로 asm.js를 compile 해야한다. Gecko에서 async compilation은 JavaScript engine이 게임이 로딩될 때 asm.js를 main thread에 compile하는 것과 게임이 subsequest loads에서 더이상 compile할 팔요가 없도록 생성된 machine code를 cache 하는 것을 수락한다.

### Putting async into action
async compilation을 하는 것은 쉽다. 
```html
<script async src="file.js"></script>
```
또는 
```js
var script = document.createElement('script');
script.src = "file.js";
document.body.appendChild(script);
```

### When is async not async?
두개의 상황에서 script는 not async하다.
```html
<script async>code</script>
```
그리고
```js
var script = document.createElemnet('script');
script.textContent = "code";
document.body.appendChild(script);
```
두 상황 모두 'inline' script로 생각되고 컴파일되고 즉시 실행된다.\
그렇다면 JS string의 너의 코드는? synchronous compilation을 트리거하는 eval이나 innerHTML을 사용하는 대신 object URL과 같잉 Blob을 사용해야한다.
```js
var blob = new Blob([codeString]);
var script = document.createElement('script');
var url = URL.createObjectURL(blob);
script.onload = script.onerror = function() {URL.revokeObjectURL(url);};
script.src = url;
document.body.appendChild(script);
```
innerHTML 보다는 src의 stting이 script를 async하게 만든다.
