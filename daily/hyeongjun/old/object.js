'use strict';
// Objects
// object = {key : value};

// 1. 
const obj1 = {};  // 'object liternal' syntax
const ob2 = new Object(); // 'object constructor' syntax

function print(person){
  console.log(person.name);
  console.log(person.age);
}

const ellie = {name : 'ellie', age: 4};
print(ellie);

// with JavaScript magic (dynamically typed language)
// can add properties later
ellie.hasJob = true;
console.log(ellie.hasJob);

delete ellie.hasJob;
console.log(ellie.hasJob)

// 2. Computed properties
// key should be always string
console.log(ellie.name); // 이게 맞음
console.log(ellie['name']); // 이건 key가 있는지 확인할 떄 주로 사용
ellie['hasJob'] = true;
console.log(ellie.hasJob);

function printValue(obj, key){
  console.log(obj[key]);
}
printValue(ellie,'name');

// 3. Property value shorthand
const person1 = {name : 'bob', age:2};
const person2 = {name : 'bob', age:2};
const person3 = {name : 'bob', age:2};
const person4 = {name : 'bob', age:2};
const person5 = new Person('bob',2);
console.log(person5);

// 4.Constructor Function
function Person(name ,age){
  // this = {};
  this.name = name;
  this.age = age;
  // return this;
}

// 5. in operator : property existence check
console.log('name' in ellie);
console.log('age' in ellie);
console.log('random' in ellie);
console.log(ellie.random);

// 6. for..in vs for..of
// for (key in obj)
console.clear();
for (key in ellie){
  console.log(key);
}

// for (value of iterable)
const array = [1,2,3,4]
for (value of array){
  console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1,obj2...])
const user = {name :'ellie', age: '20'};
const user2 = user;
user2.name = 'coder';
console.log(user)

// old way
const user3 = {};
for (key in user){
  user3[key] = user[key];
}
console.log(user3)

// new way
const user4 = {};
Object.assign(user4, user);

const user4 = Object.assign({}, user);
console.log(user4)

// another example
const fr1 = {color : 'red'};
const fr2 = {color : 'blue', size :'big'};
const mixed = Object.assign({},fr1,fr2);
console.log(mixed.color); // blue
console.log(mixed.size); // big

