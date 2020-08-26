// JSON

// 1. Object to JSON
// stringify
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json);

const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${this.name} can jump!`);
  },
};

json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ['name', 'color']);
console.log(json);

console.clear();
json = JSON.stringify(rabbit, (key, value) => {
  // console.log(`key : ${key}, value : ${value}`);
  // console.log(key, value);
  return key === 'name' ? 'ellie' : value;
})
console.log(json);

// 2. JSON to Object
console.clear();
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key,value)=>{
  console.log(key, value);
  return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj, typeof(obj));

rabbit.jump();
//obj.jump();

rabbit.birthDate.getDate();
obj.birthDate.getDate();
