# Ajax

## 使用

### 原生 ajax 的使用

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