# What is a closure, and how/why would you use one?

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
# Closures
closure는 주변 state(the lexical environment) 를 reference하는 함수의 combination이다. 다른말로 clousre는 inner function이 outer function scope에 접근하게 해준다. JavaScript에서 closure는 함수가 만들어질 때 항상 만들어진다.

## Lexical scoping
```js
function init() {
    var name = 'Mozilla'; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure 
        alert(name); // use variable declared in the parent function
    }
    displayName();
}
init();
```
init()은 local variable name을 만들고 displayName() 함수로 호출한다. displayName() 함수는 init() 안에 정의되어있는 inner function 이며 init() 함수의 body 안에서만 사용가능하다. 명심해라 displayName() 함수는 자기 자신의 local variable를 가지고 있지 않다. 그러나 inner function은 outer function의 varaible에 접근할 수 있기 때문에 displayName() 은 name 을 호출 할 수 있다.

## Closure
```js
function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();
```
위의 코드는 이전에 init() 함수와 동일한 효과를 가지고 있다. 다른점은 inner function 인 displayName()이 out function에서 return 된다는 것이다.

처음보면 이 코드가 동작할 것인지 아닌지 직관적으로 보이지 않는다. 몇몇 programming language에서 function 내부의 local 변수는 function이 실행되는 동안에 존재한다. 한번 makeFunc()가 실행을 끝내면 너는 더이상 접근하지 못할 것이라고 생각한다. 하지만 동작한다.

그 이유는 JavaScript의 closure 때문이다. closure란 함수의 combination이며 함수가 선된 lexcial environoment 이다. 이 환경은 closure가 생성되는 동시에 local 변수를 포함하고 있다. 이 경우에 myFunc 는 함수 displayName의 instanc를 reference하고 있다. displayName은 makeFunc가 실행될 때 만들어진다. displayName의 instance는 변수 name이 존재하는 lexical enviroment를 reference하는 것을 유지한다. 이 이유 때문에 myFunc가 실행될 때 name이 남아있을 수 있다.

다음은 흥미로운 예제이다.
```js
function makeAdder(x) {
    return function(y) {
        return x+y;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));
```
이 예제에서 우리는 makeAdder(x)를 선언하였다. 

makeAdder는 function factory이다. 이 함수는 특별한 value를 argument로 받으며 더한다.

## Practical closures
closures는 유용하다. 왜냐하면 data(the lexical environment)와 function을 연결할 수 있게 해준다. 이것은 object가 data와 하나 이상의 method와 연결할 수 있게 해주는 object-oriented programming가 parallel하다. 

결과적으로, 너는 하나의 method를 가진 object대신 closure를 어디서든 사용할 수 있다. 

위의 situation은 보통 웹에 있다. event-based인 Javascript front end로 쓰여진 대부분의 코드이다. 너는 몇몇 동작을 선언했고 user가 trigerring하는 event에 붙였다. 코드는 callback으로 attach 된다. 

예를 들면, 우리가 text size를 조정하는 버튼을 추가했다고 가정하자. 하나의 방법은 body element의 font-size를 바꾸고 다른 element는 em unit을 사용하는 것이다.
```css
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```
위의 interactive text size 버튼은 font-size 속성을 바꾸어서 동작한다.

아래는 JS 코드이다
```js
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px';
    }
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```

size12, size14, size16은 resize하는 함수이다.

```js
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

``` html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

## Emulating private methods with closures
Java 같은 언어는 method를 private로 선언하게 해준다. 이것은 같은 class 내의 다른 method만이 호출할 수 있다는 것을 의미한다.

JavaScript는 native way로 제공하지 않는다. 그러나 closure를 이용하여 private method를 구현할 수 있다. Private method는 접근을 제한하는 것에서만 유용한 것이 아니다. 너의 globla namespace를 관리하는 강력한 수단을 제공한다.

아래 코드는 어떻게 closure가 public funcion을 선언하고 그 function이 private function과 변수를 접근하는지 보여준다.
[Module Design Pattern](https://www.google.com/search?q=javascript+module+pattern) 을 참고하자!

```js
var counter = (function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment: function() {
            changeBy(1);
        },

        decrement: function() {
            changeBy(-1);
        },

        value: function() {
            return privateCounter;
        }
    }
})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.
```
이전 예제에서는, 각각의 closure는 자기 자신의 lexical environment를 가지고 있었다. 반면에 위는 single lexical environment에서 3가지 함수를 공유한다. (counter.increment, counter.decrement, counter.value)

shared lexical environment는 anonymous function의 body안에 만들어진다. anonymous function은 선언되자마자 실행이 된다. lexical environmnet는 2개의 private item을 포함한다. privateCounter 변수, changeBy 함수 이다. 이 private member는 anonymous function 밖에서 접근할 수 없다. 대신에 3가지 public function에 접근할 수 있다.

JavaScript의 lexical scoping 때문에 각각 privateCounter 변수와 changeBy 함수에 접근할 수 있다.
```js
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },

    decrement: function() {
      changeBy(-1);
    },

    value: function() {
      return privateCounter;
    }
  }
};

var counter1 = makeCounter();
var counter2 = makeCounter();

alert(counter1.value());  // 0.

counter1.increment();
counter1.increment();
alert(counter1.value()); // 2.

counter1.decrement();
alert(counter1.value()); // 1.
alert(counter2.value()); // 0.
```
두개의 counter가 다른 counter로 부터 어떻게 독립성을 유지하는지 보자. 각각의 closure는 다른 version의 privateCounter를 reference한다. counter가 불릴 때 각각, lexical enviroment에 있는 value를 바꾼다.

## Closure Scope Chain
모든 closure는 3가지 scope를 가지고 있다.
- Local Scope (Own scope)
- Outer Functions Scope
- Global Scope

보통 실수는 outer function이 nested function인 경우에(outer function의 scope를 감싸는 것을 포함하는 outer function의 scope를 접근할려고 하는 경우) 효과적으로 function scope를 만드는 방법을 몰라서 발생한다.
```js
// gloval scope
var e = 10;
function sum(a){
    return function(b){
        return function(c){
            // outer functions scope
            return function(d){
                // local scope
                return a+b+c+d+e;
            }
        }
    }
}

console.log(sum(1)(2)(3)(4)); // log 20

// you can also write without anonymous functions;

// global scope
var e = 10;
function sum(a){
  return function sum2(b){
    return function sum3(c){
      // outer functions scope
      return function sum4(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}

var s = sum(1);
var s1 = s(2);
var s2 = s1(3);
var s3 = s2(4);
console.log(s3) //log 20
```
예제는, nested function의 시리즈이며 우리는 closure는 모든 outer function scope에 접근할 수 있다고 할 수 있다.

## Creating closures in loops: A common mistake
let 키워드를 사용하기 이전에 closure가 loop를 발생시키는 실수가 있었다.
```html
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
```

```js
function showHelp(help) {
    document.getElementById('help').textContent = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i=0; i<helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = function() {
            showHelp(item.help);
        }
    }
}

setupHelp();
```

helpText 배열은 각각 input field의 id와 연결되어있는 3개의 helpful hint를 선언한다. 루프는 이 정의를 순환하면서 onfocus event를 hooking 하여 help를 보여준다.

위의 코드를 실행하면 예상대로 동작하지 않을 것이다. 어떤 field에 focus on하더라고 message는 age에 대한 것만이 표시될 것이다.

위의 이유는 onfocus를 assign 하는 함수가 closure이기 때문이다. closures는 함수 선언과 setupHelp function scope으로부터 environment를 포함하고 있다. 3개의 closure는 loop에 의해서 만들어지지만 각각은 같은 single lexical enviroment(item 변수)를 공유하고 있다. 왜냐하면 변수 item은 var로 선언되어 hoisting에 의해서 function scope를 가지고 있다. item.help 값은 onfocus callback이 실행될 때 선언된다.

하나의 해결방법은 아래와 같다.
```js
function showHelp(help) {
  document.getElementById('help').textContent = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```
동작한다. callback이 모든 single lexical environment를 공유하는 것 보다. maeHelpCallback 함수가 각각의 callback에 새로운 lexical environment를 만드는 것이 좋다. 

또다른 방법으로는 anonymous closure를 사용하는 것이다.
```js
function showHelp(help) {
  document.getElementById('help').textContent = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // Immediate event listener attachment with the current value of item (preserved until iteration).
  }
}

setupHelp();
```

다른 closure를 만드는 것이 싫다면 let 를 사용하면 된다.
```js
function showHelp(help) {
  document.getElementById('help').textContent = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (let i = 0; i < helpText.length; i++) {
    let item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```

## Performance considerations
특정 task에 대해 closure가 필요하지 않은 경우 다른 함수 내에 불필요한 function을 만드는 것은 현명하지 못하다. processing speed와 메모리 소비 측면에서 스크립트 성능에 부정적인 영향을 미치기 때문이다.

예를들면 새로운 object/class 를 만들 때 method는 보통 object의 생성자 대신 object의 prototype에 연결되어야 한다. 그 이유는 생성자가 불릴 때마다, method는 다시 reassigned 되어야 하기 떄문이다.

아래 코드를 생각해보자
```js
function MyObject(name,message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function() {
        return this.name;
    }

    this.getMessage = function() {
        return this.message;
    }
}
```
위 예제는 closure의 이점을 전혀 활용하지 않았다.
```js
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}

MyObject.prototype = {
    getName: function() {
        return this.name;
    },
    getMessage: function() {
        return this.message;
    }
};
```
그러나 prototype를 재선언하는 것은 추천하지 않는다.
```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};
```

[Details of the Object Model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model)
