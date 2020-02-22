let [a, b, c] = [10, 20, 30];
console.log(a, b, c);

let {name, age} = {name: 'R先生', age: 20};
console.log(name, age);

//按需解构
let {name} = {name: 'R先生', age: 20};
console.log(name);  // R先生

// 解构重命名
let {name: userName} = {name: 'R先生', age: 20};
console.log(userName);  // R先生
console.log(name);  // name is not defined 没有定义

// 默认解构
let {name, age = 10} = {name: 'R先生'};
console.log(name, age);

