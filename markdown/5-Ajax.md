# Ajax

## 使用

### 原生 ajax 的使用

GET 请求

```javascript
// 1 创建 ajax
let xhr = new XMLHttpRequest();
// 2 配置请求方式和请求路径
xhr.open('get', 'http://localhost:7788');
// 3 发送请求
xhr.send();
// 4 监听事件 onload 接受完整的服务器响应数据
xhr.onload = function() {
    console.log(xhr.responseText);
}
```

服务器端

```javascript
const express = require('express');
const path = require('path');
const app = express();
// 配置静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('welcome');
});
app.listen(7788);
```

POST 请求

html 页面

```javascript
    let xhr = XMLHttpRequest();
    xhr.open('post', 'http://localhost:7788');
    // 设置普通的参数格式
    // xhr.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded');
    // xhr.send(name=***&pwd=***);
    // 设置json的参数格式
    xhr.setRequestHeader('Content-Type', 'application/post');
    xhr.send(JSON.stringify({
        name: '***',
        pwd: '***'
    }));
    xhr.onload = function() {
        let jsonData = JSON.parse(xhr.responseText);
        console.log(jsonData);
    }
```

服务器端

```javascript
const express = requrie('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// 设置静态文件
app.use(express.static('存放静态文件的绝对路径')));
// 依据前端传递参数的格式进行相应的配置
// 普通格式：x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: false}));
// json 格式
app.use(bodyParser.json());
app.post('/post', (req, res) => {
    res.send(req.body);
});
app.listen(7788);
```
