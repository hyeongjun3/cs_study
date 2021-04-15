## Memory Management

c같은 low level language는 malloc()이나 free()같은 manual memory management primitive가 존재한다. 반대로 JS는 object가 생성되거나 더 이상 사용하지 않아 제거될 떄 자동으로 메모리가 할당된다. 자동화는 잠재적인 혼동을 줄 수 있다. 개발자들에게 메모리를 관리할 필요가 없다는 잘못된 생각을 심어 줄 수 있기 때문이다.

### Memory life cycle

프로그램 언어와 관련없이 memory life cycle은 항상 같아. 1. 필요할 때 메모리를 할당한다. 2. 할당된 메모리를 사용한다. 3. 더이상 필요하지 않으면 할당된 메모리를 풀어준다.

2번째 단계는 모든 언어에서 명백하다. 첫번째와 마지막 단계는 low level 언어에서는 명백하나 JS같은 high level 언어에서는 그렇지 못하다.

### **Allocation in JavaScript**

### Value initialization

프로그래머가 할당에 괴롭힘 받지 않게 하기 위해서, JS는 변수가 선어될 때 메모리가 자동으로 할당된다.

```jsx
var n = 123; // allocates memory for a number
var s = 'azerty'; // allocates memory for a string

var o = {
  a: 1,
  b: null
}; // allocates memory for an object and contained values

// (like object) allocates memory for the array and
// contained values
var a = [1, null, 'abra'];

function f(a) {
  return a + 2;
} // allocates a function (which is a callable object)

// function expressions also allocate an object
someElement.addEventListener('click', function() {
  someElement.style.backgroundColor = 'blue';
}, false);
```

### Allocation via function calls

```jsx
var d = new Date(); // allocates a Date object

var e = document.createElement('div'); // allocates a DOM element
```

몇몇 메소드는 새로운 values나 object를 할당한다.

```jsx
var s = 'azerty';
var s2 = s.substr(0, 3); // s2 is a new string
// Since strings are immutable values,
// JavaScript may decide to not allocate memory,
// but just store the [0, 3] range.

var a = ['ouais ouais', 'nan nan'];
var a2 = ['generation', 'nan nan'];
var a3 = a.concat(a2);
// new array with 4 elements being
// the concatenation of a and a2 elements.
```

### Using values

전형적으로 값을 사용한다는 할당된 메모리를 읽거나 쓰는 것을 의미한다. 변수의 값, object 속성을 읽거나 쓰기하거나 함수의 argument로 전달하는 것을 뜻한다.

### Release when the memory is not needed anymore

대부분의 memory management issue는 이 phase에서 발생한다. 가장 어려운 것은 할당된 변수가 언제 더이상 사용되지 않는지 판단하는 것이다. low level 언어는 개발자가 어느 시점에서 할당된 메모리가 더이상 필요하지 않은지 판단하고 release하는 결정이 필요하다.

JavaScript같은 몇몇 high level 언어는 garbage collection(GC)라고 불리는 자동 memory management를 활용한다. garabage collector의 목적은 memory 할당을 모니터랑하고 할당된 메모리가 더이상 필요하지 않으면 reclaim하는 것을 판단한다. 메모리가 여전히 필요한지 안한지 판단하는 일반적인 문제가 명백하지 않아서 이 자동 프로세스는 100프로 정확하지 않다.

### Garabage collection

위에 말한 것 처럼, 메모리의 필요여부를 판단하는 문제는 명백하지 못하다. 결과적으로, garbage collectors는 일반적인 문제의 제한된 해결방법이다. 이 섹셕은 garbage collection algorithm과 각각의 한계를 이해하는 것의 필요성에 대해서 설명한다.

### References

garbage collection 알고리즘의 main concept은 reference의 concept에 달려있다. memory management 문맥 내에서, object가 다른 object를 참조한다고 한다(전자가 후자에 대한 엑세스 권한이 있는 경우). 예를들면, JavsScript object는 prototype과 properties values에 대한 reference를 가고 있다.

### Reference-counting garbage collection

이게 가장 garbage collection의 naive한 알고리즘이다. 이 알고리즘은 object가 여전히 다른 object를 referencing하고 있다면 이 object의 사용여부를 판단하는 문제를 줄일 수 있다. referencing하는 것이 없으면 이 object는 ’garbage’라 불린다.

```jsx
var x = {
  a: {
    b: 2
  }
};
// 2 objects are created. One is referenced by the other as one of its properties.
// The other is referenced by virtue of being assigned to the 'x' variable.
// Obviously, none can be garbage-collected.

var y = x;      // The 'y' variable is the second thing that has a reference to the object.

x = 1;          // Now, the object that was originally in 'x' has a unique reference
                //   embodied by the 'y' variable.

var z = y.a;    // Reference to 'a' property of the object.
                //   This object now has 2 references: one as a property,
                //   the other as the 'z' variable.

y = 'mozilla';  // The object that was originally in 'x' has now zero
                //   references to it. It can be garbage-collected.
                //   However its 'a' property is still referenced by
                //   the 'z' variable, so it cannot be freed.

z = null;       // The 'a' property of the object originally in x
                //   has zero references to it. It can be garbage collected.
```

### Limitation: Circular references

circular references에 한계가 있다. 아래 예제에서는 서로 reference하는 두개의 object가 생성된다. 그러므로 cycle이 생긴다. function call이 끝난 후 이들은 필요하지 않다. 이때 그들은 더이상 필요하지 않고 reclaim 되어야한다. 그러나 reference-counting 알고리즘은 그들이 서로를 reference하고 있기 때문에 reclaimn하지 않는다.

```jsx
function f() {
  var x = {};
  var y = {};
  x.a = y;        // x references y
  y.a = x;        // y references x

  return 'azerty';
}

f();
```

### Real-life example

IE 6와7는 DOM object를 위한 reference-counting garbage collector로 유명하다. Cycle은 메모리 leak을 생성하는 common 실수이다.

```jsx
var div;
window.onload = function() {
  div = document.getElementById('myDivElement');
  div.circularReference = div;
  div.lotsOfData = new Array(10000).join('*');
};
```

위의 예제에서 DOM element ’myDivElement’는 “circularReference”라는 property를 통해 circular reference를 갖는다. 만약 property가 제거되거나 null이 되지 않는다면, reference-counting garbage collector는 항상 적어도 하나의 reference를 가지게 되고 DOM tree에서 지워지더라고 메모리에 항상 DOM element를 유지하게 된다. 만약 DOM element가 엄청 큰 데이터를 가지고 있다면(위의 예제에서는 lotsOfData), 메모리는 절대 released 되지 않는 데이터를 소비하여 브라우저는 느려지게 된다.

### Mark-and-sweep algorithm

이 알고리즘은 “an object is no longer needed” 에서 “an object is unreachable”로 되는 선언을 줄입니다.

이 알고리즘은 roots라고 불리는 object의 집합을 가정한다. JavaScript에서는 root는 global object이다. 주기적으로, garbage collector는 root로 부터 시작해서 root에 reference되는 모든 object를 찾는다. roots로 시작해서 garbage collector는 모든 reachable object를 찾고 non-reachable object를 모은다.

이 알고리즘은 이전 알고리즘에서 reference가 없는 object가 unreachable했던 문제에 대해서 향상 시킨 알고리즘이다.

### Cycles are no longer a problem

첫번째 예제에서 function call return 이후 두 object는 더 이상 reference하지 않는다. 결과적으로, 그들은 garabage collector에 의해서 unreachable 하다고 발견되어 reclaim 될 것 이다. ### Limitation: Releasing memory manually 언제 어떤 메모리를 편하게 maunally하게 release 할 것인지 결정해야한다. 메모리를 release하게 만들기 위해서 unreachable하게 만들어야 한다.

## Node.js

node –expose-gc –inspect index.js
Chrome Debugger로 판단 가능