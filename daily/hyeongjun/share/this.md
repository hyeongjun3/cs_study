**# this**

함수의 this keyword는 다른 언어들과 비교해 JavaScript에서는 조금 다르게 동작한다. strict-mode와 non-strict mode에서도 다르게 동작한다.

대부분의 경우에 this는 어떻게 function울 호출하는지에 따라서 결정된다. ES5는 bind() 메소드를 소개한다. 이 메소드는 어떻게 function이 호출되는지 상관없이 this의 값을 설정한다. 또 ES2015에서 arrow function을 소개한다.

**## Description**

**### Global context**

global 실행 contenct에서 this는 strict mode와 관계 없이 global object를 참조한다.

```jsx

// In web browsers, the window object is also the global object:

console.log(this === window); // true

a = 37;

console.log(window.a); // 37

this.b = "MDN";

console.log(window.b)  // "MDN"

console.log(b)         // "MDN"

```

**### Function context**

함수 안에서는 this의 값은 어떻게 함수가 호출되는지에 따라 결정된다.

아래 예제가 strict mode가 아니며 값이 호출에 의해 설정되지 않으므로 this는 default 값인 global object 를 갖는다.

```jsx

function f1() {

return this;

}

// In a browser:

f1() === window; // true

// In Node:

f1() === globalThis; // true

```

그러나, strict mode에서 execution context에 들어갈 때 this 값이 설정되어 있지 않다면 undefined으로 남아있다.

```jsx

function f2() {

'use strict'; // see strict mode

return this;

}

f2() === undefined; // true

```

this 값을 설정하기 위해서 call() 또는 apply()를 사용할 수 있다.

**### Class Context**

class는 hood 밑에 있는 function이기 대문에 class에서의 this의 동작은 함수에서와 비슷하다. 그러나 약간 다르다.

class 생성자에서 this는 regular object이다. class의 non-static 메소드는 this의 prototype에 추가된다.

```jsx

class Example {

constructor() {

const proto = Object.getPrototypeOf(this);

console.log(Object.getOwnPropertyNames(proto));

}

first(){}

second(){}

static third(){}

}

new Example(); // ['constructor', 'first', 'second']

```

**### Derived classes**

base class 생성자와 다르게 derived 생성자는 최초 this binding이 없다. super()를 호출하여 생성자와 this binding를 만든다.

```js

this = new Base();

```

derived class는 object를 return하거나 생성자가 없더라도 super()이전에 return하면 안된다.

```jsx

class Base {}

class Good extends Base {}

class AlsoGood extends Base {

constructor() {

return {a: 5};

}

}

class Bad extends Base {

constructor() {}

}

new Good();

new AlsoGood();

new Bad(); // ReferenceError

```

**## Examples**

**### this in function context**

```jsx

// An object can be passed as the first argument to call or apply and this will be bound to it.

var obj = {a: 'Custom'};

// We declare a variable and the variable is assigned to the global window as its property.

var a = 'Global';

function whatsThis() {

return this.a;  // The value of this is dependent on how the function is called

}

whatsThis();          // 'Global' as this in the function isn't set, so it defaults to the global/window object

whatsThis.call(obj);  // 'Custom' as this in the function is set to obj

whatsThis.apply(obj); // 'Custom' as this in the function is set to obj

```

**### this and object conversion**

```jsx

function add(c, d) {

return this.a + this.b + c + d;

}

var o = {a: 1, b: 3};

// The first parameter is the object to use as

// 'this', subsequent parameters are passed as

// arguments in the function call

add.call(o, 5, 7); // 16

// The first parameter is the object to use as

// 'this', the second is an array whose

// members are used as the arguments in the function call

add.apply(o, [10, 20]); // 34

```

non-strict mode에서 call 또는 apply를 부를 때 this로 전달되는 값이 object가 아니라면 시도는 object로 변환될 것이다. null과 undefined 값은 global object가 된다. 7 또는 'foo' 같은 primitive는 object로 바뀐다. 즉 7은 new Number(7)으로 'foo'는 new String('foo')로

```jsx

function bar() {

console.log(Object.prototype.toString.call(this));

}

bar.call(7);     // [object Number]

bar.call('foo'); // [object String]

bar.call(undefined); // [object global]

```

**### The bind method**

ECMAScript5 는 Function.prototype.bind()를 소개한다. f.bind(someObject)를 호출하면 f scope와 같은 body를 가지는 같은 새로운 함수를 생선한다. 그러나 어떻게 함수가 호출되는지 상관없이 bind의 첫번째 argument에 영구적으로 바인딩 된다.

```jsx

function f() {

return this.a;

}

var g = f.bind({a: 'azerty'});

console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind only works once!

console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};

console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty

```

**### Arrow functions**

arrow function에서 this는 lexical context의 this를 감싸는 값으로 유지한다. global code에서는 global object로 설정된다.

```jsx

var globalObject = this;

var foo = (() => this);

console.log(foo() === globalObject); // true

```

arrow function에서 call,bind, apply로 호출될 시 무시한다.

```jsx

// Call as a method of an object

var obj = {func: foo};

console.log(obj.func() === globalObject); // true

// Attempt to set this using call

console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind

foo = foo.bind(obj);

console.log(foo() === globalObject); // true

```

무엇이든, foo의 this는 생성되었을 때의 상태로 설정된다(위의 예제에서는 global object). 다른 함수 내에서 arrow function이 생성되었을 때에도 같게 동작한다. 이는 둘러싼 lexical context를 그대로 유지한다.

```jsx

// Create obj with a method bar that returns a function that

// returns its this. The returned function is created as

// an arrow function, so its this is permanently bound to the

// this of its enclosing function. The value of bar can be set

// in the call, which in turn sets the value of the

// returned function.

var obj = {

bar: function() {

var x = (() => this);

return x;

}

};

// Call bar as a method of obj, setting its this to obj

// Assign a reference to the returned function to fn

var fn = obj.bar();

// Call fn without setting this, would normally default

// to the global object or undefined in strict mode

console.log(fn() === obj); // true

// But caution if you reference the method of obj without calling it

var fn2 = obj.bar;

// Calling the arrow function's this from inside the bar method()

// will now return window, because it follows the this from fn2.

console.log(fn2()() == window); // true

```

위에서 함수(anonymous function을 A라고 부르겠다)은 obj.bar로 assign 된다. 함수는 다른 함수(anonymous function B)를 return 한다. 결과적으로 B의 this는 영원히 호출될 때 obj.bar(A)의 this 값으로 설정된다. B가 호출되었을 때는 this는 초기값을 가지게 된다. 위의 예제에서 B의 this는 A의 this 값으로 설정되었다.

**### As an object method**

함수가 object의 method로 호출될 때 this값은 object로 설정된다.

아래 예제에서 o.f()가 호출될 대 내부 함수의 this는 o object와 바운드된다.

```jsx

var o = {

prop: 37,

f: function() {

return this.prop;

}

};

console.log(o.f()); // 37

```

위 동작은 함수가 정의된 위치니 방법에 상관없이 동작한다. 위 예제에서는 o를 선언하는 동안 f member를 함수로 선언하였다. 아래 예제는 o를 선언한 이후에 f를 선언한다.

```jsx

var o = {prop: 37};

function independent() {

return this.prop;

}

o.f = independent;

console.log(o.f()); // 37

```

**## this on the object's prototype chain**

object의 prototype chaon 어딘가에 정의된 메소드에 대해서도 같은 개념이 적용된다. 만약 method가 object의 prototype chain에 있다면 this는 method가 object 안에 있는 것 처럼 동작한다.

```jsx

var o = {f: function() { return this.a + this.b; }};

var p = Object.create(o);

p.a = 1;

p.b = 4;

console.log(p.f()); // 5

```

**## this with a getter or setter**

다시 위의 예제에서 getter와 setter 예를 보겠다

```jsx

function sum() {

return this.a + this.b + this.c;

}

var o = {

a: 1,

b: 2,

c: 3,

get average() {

return (this.a + this.b + this.c) / 3;

}

};

Object.defineProperty(o, 'sum', {

get: sum, enumerable: true, configurable: true});

console.log(o.average, o.sum); // 2, 6

```

**### As a constructor**

함수가 생성자로 사용될 때 this는 새로운 object에 bound 된다.

```jsx

/*

* Constructors work like this:

*

* function MyConstructor(){

*   // Actual function body code goes here.

*   // Create properties on |this| as

*   // desired by assigning to them.  E.g.,

*   this.fum = "nom";

*   // et cetera...

*

*   // If the function has a return statement that

*   // returns an object, that object will be the

*   // result of the |new| expression.  Otherwise,

*   // the result of the expression is the object

*   // currently bound to |this|

*   // (i.e., the common case most usually seen).

* }

*/

function C() {

this.a = 37;

}

var o = new C();

console.log(o.a); // 37

function C2() {

this.a = 37;

return {a: 38};

}

o = new C2();

console.log(o.a); // 38

```

**### As a Dom event handler**

함수가 event handler로 사용될 때 this는 element값으로 설정된다.

```jsx

// When called as a listener, turns the related element blue

function bluify(e) {

// Always true

console.log(this === e.currentTarget);

// true when currentTarget and target are the same object

console.log(this === e.target);

this.style.backgroundColor = '#A5D9F3';

}

// Get a list of every element in the document

var elements = document.getElementsByTagName('*');

// Add bluify as a click listener so when the

// element is clicked on, it turns blue

for (var i = 0; i < elements.length; i++) {

elements[i].addEventListener('click', bluify, false);

}

```

**# Reference**

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
