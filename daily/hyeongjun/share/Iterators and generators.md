## Iterators
JavaScript의 iterator는 순서는 정의하고 잠재적으로 끝날 때 까지 값을 return 하는 객체이다.

특히, 아래 두가지 properties를 return하는 next() 메소드를 가지고 있는 Iterator protocol을 구현하는 object가 iterator 이다.

- value
    - iterator 순서의 다음 값
- done
    - 순서의 마지막 값이 이미 사용이 되었다면 이 값은 true 입니다. 만약 value가 done과 함께 존재한다면, 이것은 iterator의 return 값이다.(???)

일단 만들어며지면, iterator 객체는 암묵적으로 next()가 반복적으로 불려서 iterate한다. iterator를 넘어 iterating하는 것을 consume the iterator라고 부른다. 왜냐하면 iterate하는 것은 한번만 가능하기 떄문이다. 값이 새로운 값을 만드는 것을 끝내고 추가적인 next()를 호출하면 {done: true}를 호출해야한다..

JS의 가장 흔한 iterator는 Array iterator로 순서대로 array의 값을 return 한다.

모든 iterator가 array로 표현되는 것으 상상하는 것이 쉬워보이지만 그렇지 않다. Array는 반드시 내부에 할당되어야 하지만 iterator는 필요할 때 consume한다. 이것 때문에 iterator는 사이즈 제한 없이 순서를 표현할 수 있다.

아래는 예제이다. 이것은 start부터 step 단위로 iterator하는 간단한 범위를 갖는 iterator이다. 마지막 return 값은 sequence의 크기이다

```js
function makeRangeIterator(start=0, end=Infinity, step=1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
        next: function() {
            let result;
            if(nextIndex<Infinity) {
                result = {value: nextIndex, done:false};
                nextIndex+=step;
                iterationCount++;
                return result;
            }

            return {value:iterationCound, done:true};
        }
    }

    return rangeIterator
}
```

아래 처럼 사용할 수 있다.
```js
const it = makeRangeIterator(1,10,2);
let result = it.next();
while(!result.done) {
    console.log(result.value); // 1 3 5 7 9
    result = it.next();
}

console.log(`Iterated over sequence of size: `, result.value);
```

## Generator functions
custom iterator는 유용한 도구인반면, 암묵적으로 내부 state를 유지하기 위해서 조심스러운 programming을 해서 만들어야한다. Generator functions느 강력한 대안을 제공한다: 함수들은 실행이 연속적이지 않은 하나의 함수를 작성하여 iterative algorithm 정의하는 것을 허락한다. Generator functions는 function* syntax를 사용하여 작성한다.

호출할 때, generator function는 그들의 코드를 초기화하지 않는다. 대신에 그들은 iterator의 특별한 type을 return한다. Generator라고 불리는. generator의 next 메소드 호출에 의해 값이 consume될 때, generator 함수는 yield 키워드를 만나기 전까지 실행된다.

함수는 희망하는 만큼 많이 호출될 수 있고 각각 새로운 Generator를 return할 수 있다. 각각의 Generator는 iterator의 단위

우리는 위의 설명을 예제에 적용할 수 있다.
```js
function* makeRangeIterator(start=0, end=100, step=1) {
    let iterationCount = 0;
    for(let i=start; i<end; i+=step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}
```

## Iterables
만약 for...of construct로 loop를 할 수 있는 것 처럼 객체의 iteration behavior이 정의 되어 있다면 객체는 iterable하다. 몇몇 Array 또는 Map 처럼 built-in 타입은 기본 iteration behavior를 가지고 있는 반면 다른 타입(Obecjt 같이)는 없다.

Iterable하기 위해서 object는 @@iterator 메소드를 반드시 구현해야 한다. 이것은 객체는 반드시 Symbol.iterator key property를 가지고 있어야한다.

이것은 하나 또는 그 이상의 iterable를 iterate할 수 있다. 이것은 programmer에 달려있다.

오직 하나를(Geneartor 같은) iterate하는 iterable은 @@iterator 메소드로부터 this를 return한다. 반면에 여러번 iterate하는 iterable는 반드시 새로운 iterator를 return 해야한다.

```js
function* makeIterator() {
    yield 1;
    yield 2;
}

const it = makeIterator();

for (const itItem of it) {
    console.log(itItem);
}

console.log(it[Symbol.iterator]() === it) // true;

// This example show us generator(iterator) is iterable object,
// which has the @@iterator method return the it (itself),
// and consequently, the it object can iterate only _once_.

// If we change it's @@iterator method to a function/generator
// which returns a new iterator/generator object, (it)
// can iterate many times

it[Symbol.iterator] = function* () {
  yield 2;
  yield 1;
};
```

### User-defined iterables

```js
const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

for (let value of myIterable) {
    console.log(value);
}

// or

[...myIterable];
```

### Built-in iterables
String, Array, TypedArray, Map, Set는 built-in iterable 이다. 왜냐하면 그들의 prototype object는 모두 Symbol.iterator 메소드를 가지고 있기 때문이다.

### Syntaxes expecting iterables
```js
for(let value of ['a','b','c']) {
    console.log(value);
}

[...'abc'];

function* gen(){
    yield* ['a', 'b', 'c'];
}

gen().next();

[a,b,c] = new Set(['a','b','c']);
a;
```

## Advanced generators
Generator는 그들의 yield 값을 계산한다. 비싼 compute 순서를 효과적으로 표현할 수 있게 해준다.

next() 메소드는 또한 generator의 내부 state값을 변경 시킬 수 있다. next()를 통해 전달하는 value는 yield를 통해서 받을 것이다.

```js
function* fibo() {
    let current = 0;
    let next = 1;
    while(true) {
        let reset = yield current;
        [current, next] = [next, next+current];
        if(reset) {
            current = 0;
            next 1; 
        }
    }
}

const sequence = fibonacci();
console.log(sequence.next().value);     // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
console.log(sequence.next().value);     // 3
console.log(sequence.next().value);     // 5
console.log(sequence.next().value);     // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
```

throw() 메소드를 호출하여 강제적으로 generator가 exception을 throw할 수 있게 할 수 있다. 
