'use strict';

// Javascript is synchronous.
// Execute the code block by oder after hoisting
// hoisting: var, function declaration
// hoisting 면접 질문 !!!

// Synchronous callback
function printImmediately(print) {
  print();
}

// Asynchronous callback
function printWithDelay(print, timeout){
  setTimeout(print,timeout);
}

console.log('1');

setTimeout(()=>{ console.log('2');},1000);
console.log('3');
printImmediately(() => console.log('hello'));
printWithDelay( ()=>console.log('async callback '), 2000);

// Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError){
    setTimeout(() => {
      if(
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
        ){
          // onSuccess(id);  
          onSuccess(id);  
      } else {
        onError(new Error('not found'));
      }
    },2000);
  }

  getRoles(user, onSuccess, onError){
    setTimeout(() => {
      if(user === 'ellie'){
        onSuccess({name : 'ellie', role: 'admin'});
      } else {
        onError(new Error('no access'));
      }
    },1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  user => {
    console.log(user);
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {console.log(error);}
);