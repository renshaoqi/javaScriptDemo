const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/school').then(() => {
    console.log("连接成功");
}).catch(err => console.log(err));

// 创建集合规则
const teacherSchema = mongoose.Schema({
    name: String,
    tel: String,
    age: Number
});

// 创建集合实例
const Teacher = mongoose.model('Teacher', teacherSchema);

// 把 name 为 R先生1 的 age 改为 25 岁
// Teacher.updateOne( {name: 'R先生1'}, { age: 25} ).then(res => console.log(res));

// 将所有的年龄都修改为 30 岁
Teacher.updateMany( {}, { age: 30 }).then(res => console.log(res));
