// express 使用方法

// 1 导入
const express = require('express');

// 2 创建网站服务器
const app = express();

// 3 监听请求
app.get('/', (req, res) => {
    res.send('Hello Wrold');
});

app.get('/s1', (req, res, next) => {
    console.log(111);
    next(); // 表示传递给下个相同的请求
})

app.get('/s1', (req, res) => {
    console.log(222);
    res.send();
})

// 4 监听端口号
app.listen(7788);