/* 方法一
// http 创建服务器模块
const http = require('http');

// 1 创建服务器
const app = http.createServer();

// 2 监听请求
app.on('request', (request, response) => {
    // 获取请求报文
    console.log(request.headers);
    // 获取请求路径
    console.log(request.url);
    // 获取请求方法
    console.log(request.method);
    response.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    })
    response.end('Hi, 你好');
});

// 3 监听端口
app.listen(8001);
console.log('服务器已启动...')
*/

/*
// 方法二
const http = require('http');
const app = http.createServer((request, response) => {
    response.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
    })
    response.end('hi, 你好');
})

app.listen(6688);
*/

const http = require('http');
const url = require('url');

const app = http.createServer((request, response) => {
    // 获取客户端的账号密码
    response.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
    })
    let { query } = url.parse(request.url, true);
    response.end(`账号：${query.username}--密码：${query.pwd}`);
});

app.listen(6688);

