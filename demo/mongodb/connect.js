
// node 连接 mongodb 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('连接成功');
}).catch(err => {
    console.log(err);
})

// 1 创建集合规则
const teacherSchema = mongoose.Schema({
    name: String,
    tel: String,
    age: Number
});

// 2 创建符合规则的集合实例
const Teacher = mongoose.model('Teacher', teacherSchema)

/* 方法一
// 3 创建文档
let teacher = new Teacher({
    name: 'R先生',
    tel: 13888888888,
    age: 23
});

// 文档插入数据库
teacher.save()
*/

// 方法二

Teacher.create({
    name: 'lili',
    tel: '13737519134',
    age: 33
}, (err, doc) => {
    // 打印错误
    console.log(err);
    // 打印成功的信息
    console.log(doc);
});
