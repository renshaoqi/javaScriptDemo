# express

## 简介

是一个 web 开发框架

## 下载

npm install express

## 使用

```javascript
// 导入
const express = require('express');

// 创建网站服务器
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/news', (req, res) => {
    // send() 会检测响应内容的类型，并自动设置状态码
    res.send('今天发生了什么');
})

app.listen(7788);
```

## 中间件

中间件组成：一个方法和请求处理函数

app.get('请求路径', '处理函数')
app.post('请求路径', '处理方法')

```javascript
const express = require('express');
const app = express();
app.get('/a', (req, res, next) => {
    console.log(111);
    next(); // 表示放行，传递给下一个相同请求的方法
});
app.get('/a', (req, res) => {
    console.log(222);
    res.send();
})
app.listen(7788);
```

### 处理错误的中间件

```javascript
const express = require('express');
const app = express();
app.get('/index', (req, res) => {
    throw new Error('something is wrong');
})
// 专门处理错误的中间件 有四个参数
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.listen(7788);

```

### 处理异步或者同步的错误

```javascript
const express = require('express');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const app = express();
app.get('/admin', async(req, res, next) => {
    try {
        let result = await readFile('./1.js');
    } catch (err) {
        next(err);
    }
});
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.listen(7788);

```

## 处理 GET 和 POST 的参数

### GET 请求

使用 req.query 可以直接获取参数

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    // 接收参数
    console.log(req.query); // 对象格式
    res.send();
})
```

### POST 请求

使用中间件 body-parser，通过 req.body 获取 post 请求的参数

```javascript
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParse); // use 无论请求什么都会经过这个中间件的
app.post('/post', (req, res) => {
    console.log(req.body);  // 对象格式
});
app.listen(7788);
```