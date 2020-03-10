// 搭建网站服务器
const http = require('http');
const url = require('url');
const qs = require('querystring');
require('../model/connect.js');
const Student = require('../model/student');

// 创建服务器
const app = http.createServer();
app.on('request', async (req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
    });
    // 获取路径
    const { pathname, query } = url.parse(req.url, true);
    // 获取请求方法
    const method = req.method;

    // 首页
    if (pathname === '/') {
        res.end(`
            <h1 style="text-align:center;margin-top: 200px;">欢迎使用学生管理系统</h1>
            <a href='/list' style="text-align:center;display:block">学生列表</a>
            <a href='/add' style="text-align:center;display:block">添加学生</a>
        `)
    }
    if (method === 'GET') {
        // 学生信息列表
        if (pathname === '/list') {
            let students = await Student.find();
            let listStr = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>学生列表信息</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
                    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            </head>
            
            <body>
                <a href="/add" class="btn btn-primary">添加学生</a>
                <div class="container">
                    <table class="table table-bordered table-hover">
                        <tr>
                            <td>学生姓名</td>
                            <td>年龄</td>
                            <td>邮箱</td>
                            <td>所选课程</td>
                            <td>操作</td>
                        </tr>`;

            students.forEach(stu => {
                listStr += `
                    <tr>
                        <td>${stu.name}</td>
                        <td>${stu.age}</td>
                        <td>${stu.email}</td>
                        <td>
                `;
                stu.courses.forEach(item => {
                    listStr += `
                        <span>${item} </span>
                    `;
                });
                listStr += `
                    </td>
                    <td>
                        <a href="/remove?id=${stu.id}" class="btn btn-danger btn-xs">删除</a>
                        <a href="/edit?id=${stu.id}" class="btn btn-info btn-xs">修改</a>
                    </td></tr>
                `
            });
            listStr += `
                </table>
                </div>
                </body>
                </html>
            `
            res.end(listStr);
        } else if (pathname === '/add') {
            // 添加学生页面
            let addStr = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>添加学生</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
                    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            </head>
            
            <body>
                <div class="container">
                    <a href="/list">返回列表</a>
                    <h2>添加学生</h2>
                    <form action="/add" method="POST">
                        <div class="form-group">
                            <label>学生姓名</label>
                            <input type="text" class="form-control" name="name" id="exampleInputEmail1" placeholder="请输入学生姓名">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input type="email" class="form-control" name="email" id="exampleInputPassword1" placeholder="请输入邮箱">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input type="text" class="form-control" name="age" id="exampleInputPassword1" placeholder="请输入年龄">
                        </div>
                        <div class="form-group">
                            <label>请选择课程</label>
                            <div>
                                <input type="checkbox" name="courses" value="html"> HTML
                                <input type="checkbox" name="courses" value="vue"> Vue
                                <input type="checkbox" name="courses" value="react"> React
                                <input type="checkbox" name="courses" value="java"> Java
                                <input type="checkbox" name="courses" value="python"> Python
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-success">添加学生</button>
                    </form>
                </div>
            </body>
            
            </html>
            `;
            res.end(addStr);
        } else if (pathname === '/remove') {
            await Student.findOneAndDelete({ _id: query.id });
            res.writeHead(301, {
                Location: '/list'
            });
            res.end();
        } else if (pathname === '/edit') {
            let student = await Student.findOne({ _id: query.id });
            let courses = ['html', 'vue', 'react', 'java', 'python'];
            let editStr = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>修改学生</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
                    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            </head>
            
            <body>
                <div class="container">
                    <h2>修改学生</h2>
                    <form action="/edit?id=${student._id}" method="POST">
                        <div class="form-group">
                            <label>学生姓名</label>
                            <input type="text" value="${student.name}" class="form-control" name="name" id="exampleInputEmail1" placeholder="请输入学生姓名">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input type="email" value="${student.email}" class="form-control" name="email" id="exampleInputPassword1" placeholder="请输入邮箱">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input type="text" value="${student.age}" class="form-control" name="age" id="exampleInputPassword1" placeholder="请输入年龄">
                        </div>
                        <div class="form-group">
                            <label>所选课程</label>
                            `;
            courses.forEach(item => {

                let isExists = student.courses.includes(item);  // 判断是否包含该课程

                if (isExists) {
                    editStr += `<input type="checkbox" name="courses" checked value="${item}"> ${item}`;
                } else {
                    editStr += `<input type="checkbox" name="courses" value="${item}"> ${item}`;
                }
            })
            editStr += `
                        </div>
                        <button type="submit" class="btn btn-primary">确认修改</button>
                    </form>
                </div>
            </body>
            
            </html>
            `;
            res.end(editStr);
        }
    } else if (method === 'POST') {
        // 获取表单传递过来的数据
        let formData = '';
        req.on('data', param => {
            formData += param;
        });
        if (pathname === '/add') {
            req.on('end', async () => {
                // 因为传递过来的是字符串，所以转换为对象格式
                let student = qs.parse(formData);
                // 存入数据库
                await Student.create(student);
                // 页面跳转 /list 重定向
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            })
        } else if (pathname === '/edit') {
            req.on('end', async() => {
                // 将字符串转化为对象格式
                let student = qs.parse(formData);
                await Student.updateOne({ _id: query.id }, student);
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            })
        }
    }
})
// 监听断开
app.listen(8888);
// require('../model/connect')