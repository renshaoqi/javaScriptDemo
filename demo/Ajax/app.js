const express = require('express')
const path = require('path');
const app = express();

// 配置静态文件信息
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.send('welcome');
// });

app.get('/jsonData', (req, res) => {
    res.send({ 'name': 'R先生' });
})

app.listen(7788);
