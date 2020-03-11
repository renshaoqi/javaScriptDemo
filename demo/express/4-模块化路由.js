// // 构建模块化路由

// const express = require('express');
// const app = express();
// // 创建路由对象
// const home = express.Router();

// // 二级路由
// home.get('/', (req, res) => {
//     res.send('home');   //  /home
// });

// home.get('/index', (req, res) => {
//     res.send('index');  // /home/index
// });

// app.use('/home', home);

// app.listen(7788);


// 模块化使用步骤
const express = require('express');
const home = require('./route/home.js');
const admin = require('./route/admin.js');
const app = express();
app.use('/admin', admin);
app.use('/home', home);

app.listen(7788);
