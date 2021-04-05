# Strategy pattern
https://www.dofactory.com/javascript/design-patterns/strategy

Strategy pattern은 alternative algorithm을 encapsulate한다. 이 방법은 method를 run-time에 수정할 수 있게 한다. 

## Example
### Bad example
```js
let Duck = function() {
    /*...something...*/
}

Duck.prototype.quack = function() {}

let CommonDuck = function() {
    Duck.call(this)
}

CommonDuck.prototype = Object.create(Duck.prototype);

CommonDuck.prototype.quack = function() {
    /*...something...*/
}
```
CommonDuck class는 Duck class를 상속하며 quack 함수를 재정의 하였다. 여기서 CommonDuck class 이외에 Duck class를 상속하는 class가 생길 때마다 quack 함수를 재정의 해주어야한다. 만약 이 quack 함수가 이전에 사용되었다 하더라고 reuse가 불가능하다.

### Good example
```js
let Duck = function(){
    this.quack_behavior = null;
};

Duck.prototype.setQuackBehavior = function(quack_behavior) {
    this.quack_behavior = quack_behavior
}

Duck.prototype.quack = function() {
    this.quack_behavior.quack();
}

var CommonQuackBehavior = function() {
    this.quack = function() {
        console.log('Common quack!!');
    }
}

var SpecialQuackBehavior = function() {
    this.quack = function() {
        console.log('Special quack!!')
    }
}

let test = new Duck()
test.setQuackBehavior(new CommonQuackBehavior())
test.quack()
```
Duck class가 quack_behavior에 따라서 quack 함수를 호출하게 구현하였다. 위의 예제를 통해서 behavior class를 reuse 할 수 있다.

## Conclusion
Strategy pattern은 SOLID 중 OCP와 관련이 크다. 위의 bad example은 확장성이 없으며 Inheritance을 통해서 resuse 할 수 없게 구현이 되었다. good example은 Inheritance대신 Composition을 사용하여 reuseable하게 구현되었다.

아래는 OOP에서 Inheritance와 Composition의 장단점이다.

**Class inheritance**

pros
- compile-time에 끝나면 구현하기 쉽다.

cons
- subclass가 parent class에 강하게 dependency를 가지고 있다.(high coupling)
- run-time에 implementation을 수정 할 수 없다.

**Object Composition**

pros
- run-time에 implemenation이 수정된다.
- dependency가 적다

cons
- 이해하기 어렵다

Reuse를 위해서는 Inheritance 외에 Composition을 있다는 것을 기억하고 각각의 상황에 맞는 방법을 사용해야한다!
