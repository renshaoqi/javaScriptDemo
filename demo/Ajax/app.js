const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// 配置静态文件信息
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//     res.send('welcome');
// });

app.get('/jsonData', (req, res) => {
    res.send({ 'name': 'R先生' });
})

app.get('/get', (req, res) => {
    res.send(req.query);
});

app.post('/post', (req, res) => {
    res.send(req.body);
})

app.listen(7788);
