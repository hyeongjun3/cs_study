https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

# JavaScript modules

## A background on modules
JavaScript 프로그램은 작게 시작하였다. 옛날 대부분의 사용처는 scripting task와 web page와 interact하는 작은 기능을 고립하는데 사용되었다. 그래서 큰 script는 필요하지 않았다. 시간이 지나 현재 우리는 큰 규모의 javascript로 application이 실행이 된다. 

그러므로 현재 JavaScript program을 여러개의 module로 분리하여 필요할 때 import 할 수 있게 하는 mechanism을 제공하기 위해서 생각을 해야한다. Node.js 이러한 능력을 긴 시간 동안 가졌으며  module usage를 가능하게 하는 (CommonJs, AMD based module systems like RequireJS, and Webpack, Babel)다양한 JavaScript 라이브러리와 프레임 워크가 있다.

좋은 소식은 최근 brower가 module functionality를 support하기 시작했다. 그리고 이 article은 그 것에 관한 글이다. 브라우저는 module 로딩을 최적화 할 수 있다.

## Introducing an example
module의 사용법을 표현하기 위해서 [간단한 example](https://github.com/mdn/js-examples/tree/master/modules)을 만들었다. 예제들은 <canvas> element를 이용하여 webpage를 만들고 canvase에 다른 모양을 그리는 것이다.

예제들은 사소하지만 모듈들을 명확하게 보여주기 위해서 의도적으로 간단하게 만들었다.

## Basic example structure
[첫번째 예제](https://github.com/mdn/js-examples/tree/master/modules/basic-modules) 의 구조는 아래와 같다.
```
index.html
main.js
modules/
    canvas.js
    square.js
```

## Aside -- .mjs Vs .js
우리는 module file에 .js 확장자를 사용하였지만 .mjs 확장자도 보았을 것이다. V8 엔진은 .mjs를 추천한다. 이유는 아래와 같다.
- 명료하다. 어떤 파일이 module이고 regular JavaScript인지 판단할 수 있다.
- Nodejs 처럼 module이 runtime에 parse 될 수 있으며 Babel 같은 tool을 빌드할 수 있다.

그러나 지금은 .js 를 사용하겠다. 브라우저에서 잘 동작하는 module을 얻기 위해서는 서버가 Content-Type 헤더에 JavaScript MIME type(text/javascript 같은)을 포함해야한다. 만약 그렇지 않다면 strict MIME type checking error가 발생하며 브라우저는 JavaScript를 실행할 수 없다. 대부분의 서버는 이미 .js 파일을 전송하고 있다. 

## Exporting module features
먼저 module에 접근하기 위해서는 export 해야한다.

```jsx
export const name = 'square';

export function draw(ctx, length ,x, y, color ) {

    ...

    return {
        ...
    };
}
```

```jsx
export {name, draw};
```

## Importing features into your script
```jsx
import {name, draw} from './modules/square.js'
```
생략..

## Applying the module to your HTML
```html
<script type='module' src ='main.js'></script>
```
type = 'module' 사용시 defer 옵션을 적용한 것처럼 동작한다.

## Other differences between modules and standard scripts
- local testing에 집중할 필요가 있다. 만약 HTML file을 locally하게 로드한다면 JavaScript module 보안 때문에 CORS error을 겪을 것이다. 서버를 이용해서 테스트할 필요가 있다.
- 또한 standard script와 반대로 모듈 내부에 정의된 script의 section에서 다른 동작을 얻을 수 있다. 왜냐하면 module은 strict mode를 자동으로 사용하기 때문이다.
- module script를 load 할 때 defer attribute를 사용할 필요가 없다. module은 자동적으로 defer이다.
- 모듈은 오직 한 번 실행된다. script tage를 여러분 호출하더라도
- last but not least - module feature은 하나의 script에 import 된다. 모듈은 global scope에서 사용할 수 없다. 그러므로 module은 import 한 script 내에서만 사용 가능한다.

## Dynamic module loading
최근 JavaScript 모듈은 dynamic module loading을 지원한다. 이 것은 module을 필요할 때 dynamic하게 로드할 수 있게 해준다. 명백히 성능에 긍정적인 영향을 끼친다.

```jsx
import('./modules/myModule.js')
.then((module) => {
    // do something
})
```
