// let 不允许重新定义变量
var num = 10;
var num = 20;
console.log(sum);   // 20
let sum = 10;
let sum = 20;
console.log(sum);   // Identifier 'sum' has already been declared 

// let 不存在变量提升机制
console.log(a); // undefined
var a = 10;
console.log(b); // Cannot access 'b' before initialization
let b = 10;


// const 用于定义常量，不能重新赋值，但能修改成员
const num = 10;
num = 20;   // Assignment to constant variable 不能重新赋值
const num2; // Missing initializer in const declaration 以 const 关键字定义时，必须有初始化值

// const 可以修改成员
const obj = {
    a: 10,
    b: 20
}

obj.a = 30;

console.log(obj);   // { a: 30, b: 20 }

// 业务范围
// 没有使用let想打印出 0 1 2
for (var i = 0; i < 3; i++) { 
    setTimeout(function(){
        console.log(i);
    })
}
// 上述代码输出的是 3 3 3 并不符合要求
// 可以闭包方式
for(var i = 0; i < 3; i++) {
    (function(i){
        setTimeout(function(){
            console.log(i);
        });
    })(i)
}
// 这样就可以输出 0 1 2 但是这样太麻烦了， 下面来看下 使用 let，看看有啥区别
for(let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    })
}
// 这样也可以输出 0 1 2 是不是比上面使用闭包的方式更简单、更便捷啦


// 面试题

var arr = [];
for(var i = 0; i < 2; i++) {
    arr[i] = function() {
        console.log(i);
    }
}
arr[0]();   // 2
arr[1]();   // 2

// 上述代码中 因为 使用 var 来定义的，只要是 var 定义的变量在 函数（function） 外部就是全局变量
// 所以执行 arr[0]() 这个函数时 上面 for 循环中的 i 已经为 2 了；

let arr = [];
for(let i = 0; i < 2; i++) {
    arr[i] = function() {
        console.log(i);
    }
}
arr[0]();   // 0
arr[1]();   // 1

// 而使用 let 定义的就不一样了，因为 let 有一个块及作用域，所以 在for 循环中 i 不是全局变量，所以
// arr[i] = function() {console.log(i)}; 会记住每一次循环中的i;

