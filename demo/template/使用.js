const template = require('art-template');

// 获取视图文件的路径
const path = require('path');
const view = path.join(__dirname, 'views', 'view.html');

// 使用 返回值：一个渲染后html的字符串
const htmlStr = template(view, {    // 参数一：所要渲染的html页面， 参数二：需要的值
    sname: "R先生",
    content: "<span>123</span>"
});

console.log(htmlStr);