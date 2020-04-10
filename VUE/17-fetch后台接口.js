const express = require('express');
const bodyParse = require('body-parser');


const app = express();

// 使用bodyParse 处理 post 请求相关配置
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));


// 跨域问题

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/data', (req, res) => {
    res.send('hello');
});

app.get('/data/:id', (req, res) => {
    res.send(req.params.id);
});

app.get('/stu', (req, res) => {
    res.send(req.query.id);
});

app.post('/stu', (req, res) => {
    res.send(req.body)
});

app.get('/user/:id', (req, res) => {
    res.send(req.params.id);
});

app.get('/user', (req, res) => {
    res.send(req.query.id);
});


app.post('/user', (req, res) => {
    res.send(req.body);
})

app.listen(3000);