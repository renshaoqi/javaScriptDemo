// 中间件

const express = require('express');
const app = express();
app.get('/', (req, res, next) => {
    console.log(111);
    next(); // 放行， 给下个相同的请求方法及路径传递
});
app.get('/', (req, res) => {
    console.log(222);
    res.send();
});



// 处理 GET 和 POST 请求参数

// get 请求
app.get('/get', (req, res) => {
    console.log(req.query); // 使用 req.query 可以直接获取到对象格式的参数
});

// post 请求，需要借助中间件 body-parser 使用 req.body 获取请求参数
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/post', (req, res) => {
    console.log(req.body);
    res.send();
});
app.listen(7788);
