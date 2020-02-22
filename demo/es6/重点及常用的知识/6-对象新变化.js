// Object.is()  比较两个值是否相等 用来比较某些比较不了的字符 如 NaN
console.log(Object.is(1, 1));   // true
console.log(NaN === NaN);   // false
console.log(Object.is(NaN, NaN));   // true

// Object.assign()  把多个对象复制到一个对象中
let obj1 = {name: 'R先生'};
let obj2 = {age: 22};
let obj3 = {sex: '男'};
let newObj = {};
Object.assign(newObj, obj1, obj2, obj3);  
console.log(newObj);    // {name: 'R先生', age: 22, sex: '男'}


// Object.setPrototypeOf()  设置原型
let nameObj1 = { name: 'R先生1' };
let nameObj2 = { name: 'R先生2' };
let obj3 = {};
console.log(obj3.__proto__);    // {}
Object.setPrototypeOf(obj3, nameObj1);
console.log(obj3.__proto__);    // {name: 'R先生1'}
console.log(obj3.name); // R先生1
// Object.getPrototypeOf()  查看原型
console.log(Object.getPrototypeOf(obj3));

// super

let obj = {name: "R先生"};
let obj2 = {
    __proto__: obj,
    name: 'it',
    getName() {
        return super.name;  // super 可以调用 原型(prototype) 上的属性和方法
    }
}
console.log(obj2.getName()); // R先生