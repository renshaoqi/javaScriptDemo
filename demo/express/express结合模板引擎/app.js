const express = require('express');
const path = require('path');
const app = express();

// 配置模板引擎
app.engine('art', require('express-art-template'));
// 设置模板存放的目录
app.set('views', path.join(__dirname, 'views'));
// 设置默认的模板扩展名
app.set('view engine', 'art');
// 挂载 msg
app.locals.msg = 'hello';

app.get('/index', (req, res) => {
    // res.render('index'); // 使用挂载
    res.render('index', {  // 没有使用挂载
        msg: 'hello'
    })
})

app.get('/news', (req, res) => {
    res.render('news');
})


app.listen(7788);