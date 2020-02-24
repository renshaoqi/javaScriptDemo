# node 

CommonJs 规范   es6 module

node 可以做什么事情

- 创建高性能的服务器
- 工具
- 中间件

## node 的全局对象

```javascript
console.log(global);
// this 指向
// 如果是在浏览器执行的，为 window 对象
console.log(this);  // 浏览器执行 window
// 如果是在 node 环境下执行的 为空对象
console.log(this);  // node 环境执行 {}
```

### node 版本问题

node 10 版本之前与浏览器会有些差异，而 10 版本之后(包括10) 基本上与浏览器的执行结果一样

### 事件轮询机制解析

- timers 放一些定时器
- poll(轮循) 存放 I/O 流操作，如读写文件
- check(检查阶段) 一般存放 setImmediate

```javascript
// setTimeout 和 setImmediate，这两者执行的顺序是看性能的
setTimeout(() => {
    console.log('Timeout');
});
setImmediate(() => {
    console.log('Immediate');
});

// 可能是 Timeout 先打印出来，也可能是 Immediate 先打印出来
```

接下来看这个例子

```javascript
let fs = require('fs');
fs.readFile('./a.txt', () => {
    setTimeout(() => {
        console.log('Timeout');
    });
    setImmediate(() => {
        console.log('Immediate');
    });
});
```

上述代码，因为进行读取文件，会先执行 poll 队列，而 定时器 setTimeout 在 poll 队列上方，setImmediate 在 poll 队列下方，所以
setImmediate 方法永远比 setTimeout 方法执行速度快。

### 其它常用的全局对象的属性

- Buffer 处理二进制的数据
- process 进程
    - process.nextTick() 替换 promise
    - 常见的属性
        - platform  当前是什么系统 如果是 windows 则打印结果为 win32, 如果是 mac 系统则打印 darwin
        - env   当前的服务器环境
        - argv  读取命令行的参数
    - 常见的方法
        - cwd() 当前的工作目录
- clearInterval()/setInterval()
- clearTimeout()/setTimeout()
- clearImmediate()/setImmediate()



## node 模块化

- 模块
    - 一个文件就是就是一个模块，模块之间相互独立
- 导入模块  require(相对路径)
- 导出模块  module.exports

node 模块分类

- 核心模块（内置模块）
    - fs、http ...
- 自定义模块
- 第三方模块

### 一 操作文件模块(fs)

常用的API

- fs.readFile 异步读取文件
- fs.readFileSync 同步读取文件
- fs.existsSync 判断文件是否存在 存在返回 true 否则返回 false

```javascript
// 文件操作
let fs = require('fs');
fs.readFile('./a.txt', (err, data) => {
    console.log(data.toString());
})

// 同步读取文件
let red = fs.readFileSync('./a.txt');
consle.log(red);
```

### 二 处理路径模块 path

- path.resolve('b') 把路径解析成绝对路径
- __dirname 获取当前文件的绝对路径
- path.join(__dirname, './a.txt') 把相对路径设置成绝对路径 d:/a.txt

### 三 vm 模块 虚拟机

#### vm.runInThisContext() 将被编译和运行的 JavaScript 代码

```javascript
vm.runInThisContext('console.log(123)');    // 123  形成一个独立的运行环境 与 外面无关联
let a = 100;
vm.runInThisContext('console.log(a)');  // a is not defined 
```

## node 导入\导出模块的内部实现

```javascript
let fs = require('fs');
let path = require('path');
let vm = require('vm');

// 创建 Module 构造器
function Module(id) {
    this.id = id;
    this.exports = {};
}

Module.warpper = [
    '(function(exports, require, module, __dirname, __filename){\n',
    '\n})'
]

// 给 Module 构造器添加后缀名属性 _extensions
Module._extensions = {
    '.js' (module) {  // '.js' : function() {}
        // 1 读取文件
        let script = fs.readFileSync(module.id, 'utf-8');
        // 2 用一个函数包含读取到的文件数据
        let fnStr = Module.warpper[0] + script + Module.warpper[1];
        // 3 使用 vm.runInThisContext() 执行，因为会形成一个独立的运行环境
        let fn = vm.runInThisContext(fnStr);
        let exports = module.exports;
        fn.call(exports, exports, myRequire, module, path.dirname(module.id), module.id);
    },
    '.json' (module) {
        let json = fs.readFileSync(module.id, 'utf-8');
        module.exports = JSON.parse(json);
    }
}

// 缓存
Module._cache = {

}

// 将相对路径解析成绝对路径
function resolveFilename(myPath) {
    // 1 使用 path 模块中的 resolve 方法将 myPath 相对路径解析成绝对路径
    let res = path.resolve(__dirname, myPath);
    // 2 判断这个绝对路径下是否含有这个文件
    let isExists = fs.existsSync(res);  // exists 为异步，existsSync 为同步 
    if (isExists) {
        // 存在则直接返回这个路径
        return res;
    } else {
        // 不存在则给这个路径添加后缀名 .js/.json/...
        // 首先获取 Module 构造器中的 _extensions 属性的 key 值
        let keyList = Object.keys(Module._extensions);  // 返回的是一个数组
        for (let i = 0; i < keyList.length; i++) {
            // 进行后缀名的拼接
            let tryFilename = res + keyList[i];
            // 最后判断拼接好的路径是否存在文件
            if (fs.existsSync(tryFilename)) {
                // 存在返回这个绝对路径
                return tryFilename;
            }
        }
        // 走到这里，说明这个路径下没有文件，所以抛出错误异常
        throw new Error('module not found');
    }
}

function tryModuleLoad(module) {
    // 获取文件后缀名
    let extname = path.extname(module.id);
    // 根据文件后缀名执行相应的函数
    Module._extensions[extname](module);
}

// 主入口
function myRequire(myPath) {
    // 1 将 myPaht 解析成绝对路径
    let absPath = resolveFilename(myPath);
    // 缓存
    let cacheModule = Module._cache[absPath];
    if (cacheModule) {
        return cacheModule.exports;
    }
    // 加载模块
    let module = new Module(absPath);
    Module._cache[absPath] = module;
    tryModuleLoad(module);
    return module.exports;
}
myRequire('./a.js');
```

module.exports 与 exports 的区别

exports 是 module.exports 的别名，因为 require() 方法返回的是 module.exports 
所以对 exports 重新赋值，我们是拿不到该值的，但是可以 exports.** = ** ，所以一般
导出一个成员时，直接 module.exports = 成员; 如果是多个时，exports.成员1 = 值1、
exports.成员2 = 值2;

## 事件环

### 浏览器事件环

其实是一种机制

js 是单线程(主线程)，单线程：在同一时间内只能做一件事情

下面来看下这个例子

```javascript
console.log(1);
setTimeout(() => {
    console.log(2);
});

setTimeout(() => {
    console.log(3);
});
console.log(4);
```

上述执行结果：1 4 2 3

因为 js 是主线程是单线程的，所以内部会把上述的代码放到执行上下文中，代码从上到下执行，
遇到 console.log(1) 代码，这个代码为同步代码会直接执行，遇到 setTimeout(() => {console.log(2)}) ，主线程会
开辟一个线程把代码放入到缓冲区里面，后面的这个 setTimeout(() => {console.log(3)}) 也是一样放到缓冲区中，
然后执行 console.log(4); 而缓冲区中要看这些代码的时间谁先到，就会放到异步队列中去排队，然后执行上下文执行完
后才会到这个异步队列中去取出来执行，显而易见，setTimeout(() => {console.log(2)}) 比 setTimeout(() => {console.log(3)}) 
时间更快放到异步队列中，所以这个执行的结果为 1 4 2 3

![git](https://img-blog.csdnimg.cn/20200219090440591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3JlbnNoYW9xaQ==,size_16,color_FFFFFF,t_70)

如果都是定时器倒是好判断，那如果是其它不同的异步任务放到一起，会是谁先执行呢？下面来看下这个例子

```javascript
setTimeout(() => {
    console.log('Timeout');
})
Promise.resolve().then(() => {
    console.log('promise');
});
```

上述运行结果确是为 promise Timeout 

为什么会是 Promise 会比 setTimeout 先执行呢？ 这就关系到宏任务和微任务的知识了

执行上下文会先把宏任务的代码放到缓冲区里面，而遇到微任务直接放到微任务队列中，执行上下文
执行完后会先到微任务队列中取出来执行，然后清空微任务队列，最后在执行宏任务队列

```javascript
setTimeout(() => {
    console.log('Timeout1');
    Promise.resolve().then(() => {
        console.log('promise1');
    })
})

Promise.resolve().then(() => {
    console.log('promise2');
    setTimeout(() => {
        console.log('Timeout2');
    })
})

Promise.resolve().then(() => {
    console.log('promise3');
})

// 执行结果：promise2 promise3 Timeout1 promise1  Timeout2
```

- 宏任务：js 渲染、 ui 渲染、定时器(setTimeout/setInterval/setImmediate) I/O
- 微任务：Promise、process.nextTick、MutaionObserver

`浏览器执行顺序： Script 宏任务先执行，之后的执行过程都是先清空微任务再执行宏任务`

## npm

### 概述

npm 全称 node package manager

### 包的分类

- 全局包 在命令行使用
    - 安装第三方：npm install 包名 -g
    - 自己创建
- 本地包 在项目中使用
    - 开发环境  
        - npm install 包名 --save=dev(=D)
        - 开发依赖放在 "devDependencies": {}
        - 可以使用 npm install --production 安装开发依赖
    - 生产环境
        - npm install 包名 --save(-S) 默认安装的是生产环境
        - 生产依赖放在 "dependencies": {} 
        - 删除依赖包可以通过 npm install 来安装所有的依赖


### package.json

npm init 初始化一个文件

npm init -y 全部默认


## 模块查找机制

### 模块有路径没有后缀名 require('./a')

1. 首先找同名的 js 文件，找到则执行
2. 找不到则找同名 js 文件夹
3. 假如找到同名 js 文件夹，会找 package.json 文件 mian 选项指定的入口文件
4. 假如 package.json 的 mian 选项指定的入口文件不存在或者没有配置，则会找 index.js
5. 没有 index.js 会报错

### 没有路径也没有后缀名

require('a');

1. 首先会假设这是系统模块
2. node 会去当前目录下找 node_modules 文件夹
3. 在该文件夹下看有没有改名字的 js 文件
4. 没有再看该名字的文件夹
5. 假如找到该名字的文件夹，会去该名字的问价下找 package.json 文件的 mian 选项指定的入口文件
6. 假如没有找到该入口文件，则会去改名字的文件夹下找 index.js 
7. 找不到 index.js 则会报错

## node 创建服务器

```javascript
// 导入 http 模块
const http = require('http');
// 创建服务器
const app = http.createServer((request, response) => {
    response.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    })
    response.end('hi, 你好');
})
// 监听端口
app.listen(8801);
```

参数 get/post

get 请求，参数会放置在浏览器地址栏中，可以借用 url 模块 parse 来处理

```javascript
const http = require('http');
const url = require('url');

const app = http.createServer((request, response) => {
    response.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
    });
    // 获取客户端的账号密码
    let { query } = url.parse(request.url, true);
    request.end(`账号：${query.username}\n密码：${query.pwd}`)
});

app.listen(6688);
```

post 请求，参数是被放在请求体中进行传输

```javascript
const http = require('http');
const url = require('url');
const qs = require('querystring');

const app = http.createServer((request, response) => {
    response.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
    });
    // 监听参数传输事件
    let postData = '';
    request.on('data', (chunk) => {
        postData += chunk;
    });
    request.on('end', () => {
        console.log(postData);  // username=***&pwd=***
        let {username, pwd} = qs.parse(postData);
        console.log(username, pwd);
    })

    
});

app.listen(6688);

```

路由：客户端请求地址与服务器端程序代码的定义关系

静态资源: 服务器不需要处理，可以直接响应给客户端

动态资源: 
