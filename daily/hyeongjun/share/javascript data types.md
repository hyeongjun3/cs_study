https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures

# JavaScript data types and data structures
프로그래밍 언어는 모두 built-in data structure를 가지고 있다. 그러나 이것들은 언어마다 다르다. 이 article은 JavaScript에 있는 build-in data structure를 보여준다. 

## Dynamic typing
JavaScript는 loosely typed, dynamic 한 언어이다. JavaScript의 변수는 어떤 특정한 값과 직접적으로 연관되어 있지 않아서 어떤 변수든 어떤 타입으로 assign 될 수 있다.
```js
let foo = 42;    // foo is now a number
foo     = 'bar'; // foo is now a string
foo     = true;  // foo is now a boolean
```

## Data and Structure types

- primitive인 6개의 Data types, typeof로 확인 할 수 있다.
    - undefined : typeof instance === 'undefined'
    - Boolean : typeof instance === 'boolean'
    - Number : typeof instance === 'number'
    - String : typeof instance === 'string'
    - BigInt : typeof instance === 'bigint'
    - Symbol : typeof instance === 'symbol'
- Structural Types:
    - Object : typeof instance === 'object'. Special non-data constructed object instance인 structual type또한 data structrue로 사용된다 : new Object, new Array, new Map, new Set, new WeakMap, new WeakSet, new Data 그리고 new Keyword로 만들어지는 거의 모든 것
    - Function : non-data structure, 반면에 이것은 typeof operator로 판단할 수 있다. typeof instance === 'function'
- Structural Root Primitive:
    - null : typeof instance === 'object'. Special primitve type. 만약 object가 상속 받지 않았으면, null을 보여준다.

명심해라. typeof operator는 Data Type을 확인하는데 사용된다. 만약 Object로 부터 생성된 Structural Type은 항상 'object'를 return한다. 그러므로 instancepof keyword를 사용해라.

우리가 본 것 처럼 undefined과 null을 뺴면 primitive type은 명확하다. 

## Primitive values
object를 뺀 모든 type은 immutable value(값이 바뀌지 않는다.)를 선언한다. 우리는 이러한 type을 primitive value라고 refer한다.

### Boolean type
boolean은 logicaly entity를 표현한다.

### Null type

### Undefined type
assign 되지 않은 변수는 undefined 값을 갖는다.

### Number type
ECMAScript는 Number, BigInt 2가지 built-in numeric type을 가지고 있다.

### String type
16-bit unsgned integer value의 집합이다. 다른 프로그래밍 언어와 다르게 JavaScript string은 immutable이다. 

### Symbol type
symbol은 unique, immutable primitive value이다. 

## Object
컴퓨터 공학에서, object는 identifier를 이용하여 참조할 수 있는 memory에 있는 값이다.

### Properties
JavaScript에서 object는 properties의 집합으로 보여진다. object liternal syntax와 함께 제한된 properties의 집합이 초기화 된다. 그리고 properties는 추가되거나 제거된다. property 값은 다른 object를 포함한 어떤 type이든 될 수 있다. Properties는 key value를 사용하여 식별할 수 있다. key value string 또는 symbol 값이다.

2가지 object의 속성값이 있다. data property와 accessor property이다.
