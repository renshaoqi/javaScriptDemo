// 操作文件模块 fs

let fs = require('fs');

fs.readFile('D:/学习/全栈/前端/javaScriptDemo/demo/node/模块化/a.txt', (err, data) => {
    console.log(data.toString());
});

// 同步读文件
let r = fs.readFileSync('D:/学习/全栈/前端/javaScriptDemo/demo/node/模块化/a.txt');
console.log(r);

// vm 模块
let vm = require('vm');
let a = 123;
vm.runInThisContext('console.log(123)');
