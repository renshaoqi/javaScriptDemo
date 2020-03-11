// 服务器
const http = require('http');
const url = require('url');
const Student = require('./model/student.js');
const template = require('art-template');
const path = require('path');
const qs = require('querystring');
// 连接数据库
require('./model/connect')


const app = http.createServer();
app.on('request', async (req, res) => {
    // 解决中文乱码
    res.writeHeader(200, {
        'content-type': 'text/html; charset=utf8'
    });
    const view = path.join(__dirname, 'views');
    // 获取请求的路径地址
    const { pathname, query } = url.parse(req.url, true);
    // 获取请求的方法
    const method = req.method;
    if (method === 'GET') {
        if (pathname === '/') {
            res.end(`
                <h1 style="text-align:center;margin-top: 200px;">欢迎使用学生管理系统</h1>
                <a href='/list' style="text-align:center;display:block">学生列表</a>
                <a href='/add' style="text-align:center;display:block">添加学生</a>
            `)
        } else if (pathname === '/list') {
            // 显示学生列表信息
            const students = await Student.find();
            // 获取模板引擎路径
            const path_list = path.join(view, 'list.html');
            const student_list = template(path_list, {
                students
            });
            res.end(student_list);
        } else if (pathname === '/add') {
            // 学生添加页面
            const path_add = path.join(view, 'add.html')
            // 显示添加学生信息页面
            const add_str = template(path_add, {});
            res.end(add_str);
        } else if (pathname === '/edit') {
            // 修改学生页面信息
            // 根据传递过来的id 进行查找对应的一条数据
            const edit_data = await Student.find({ _id: query.id });
            // 然后传递给模板引擎
            const path_edit = path.join(view, 'edit.html');
            const edit_str = template(path_edit, {
                edit_data: edit_data[0],
                courses: ['html', 'vue', 'react', 'java', 'python']
            })
            res.end(edit_str);
        } else if (pathname === '/remove') {
            // 删除请求
            await Student.deleteOne({_id: query.id});
            res.writeHeader(301, {
                Location: '/list'
            });
            res.end();
        }
    } else if (method === 'POST') {
        // 获取请求的数据信息
        let from_data = '';
        req.on('data', param => {
            from_data += param;
        });
        req.on('end', async () => {
            // 因为获取过来的数据为字符串类型
            const obj_data = qs.parse(from_data);
            console.log(obj_data);
            if (pathname === '/add') {
                // 进行添加操作
                await Student.create(obj_data);
                // 跳转到学生列表 list 页面
                res.writeHeader(301, {
                    // 301 为重定向
                    Location: '/list'
                });
                res.end()
            } else if (pathname === '/edit') {
                // 根据id进行修改相对应的数据
                const str = await Student.updateOne({ _id: query.id }, obj_data);
                // 重定向到列表页面
                res.writeHeader(301, {
                    Location: '/list'
                });
                res.end();
            }
        });
    }
})

app.listen(7788);