'user strict';

// Array

// 1. Declration
const arr1 = new Array();
const arr2 = [1,2];

// 2. Index position
const fruits = ['🍎','🍌'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);

// 3. Loopping over an array
console.clear();
for (fruit of fruits){
  console.log(fruit);
}

// forEach
console.clear();
fruits.forEach( (value, index, arr) => {
  console.log(value, index, arr);
})

// 4. Addition, deletion, copy
// push: add an item to the end
fruits.push('🍓','🍐');
console.log(fruits);
// pop: remove an item from the end
fruits.pop();
console.log(fruits);

// unshift: add an item to the beginning
fruits.unshift('🍓');
console.log(fruits);
// remove an item to the beginning
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push
// splice : remove an item by index position
fruits.push('🍓','®','™');
console.log(fruits);
// fruits.splice(1);
// fruits.splice(1,1);
fruits.splice(1,1, '🍍','🍉');
console.log(fruits);

// combine two arrays
const fruits2 = ['a','b'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

// 5. Searching
// indexOf : find thd index
console.clear();
console.log(fruits.indexOf('🍓'));

// includes
console.log(fruits.includes(''))