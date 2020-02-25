const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/school').then(() => {
    console.log("连接成功");
}).catch(err => console.log(err));

// 创建规则
const teacherSchema = mongoose.Schema({
    name: String,
    tel: String,
    age: Number
})

// 创建实例
const Teacher = mongoose.model('Teacher', teacherSchema);

// 查询数据
/*
// 查询所有的文档
Teacher.find().then((res) => {
    console.log(res);
})
*/

// 根据指定的字段来查找，查找所有符合的文档
// Teacher.find({
//     name: 'R先生'
// }).then(res => console.log(res));

// 返回集合满足条件的第一条文档
// Teacher.findOne({name: 'R先生'}).then(res => console.log(res));

// 查找 年龄在 18~25 之间的文档
// Teacher.find({
//     age: { $gte: 18, $lte: 30 }
// }).then(res => console.log(res));

// 查找爱好中包含篮球的文档
// Teacher.find({ hobbies: { $in: ['篮球'] } }).then(res => console.log(res));

// 查找所有文档的 name 和 age 字段，其它的不要
// Teacher.find().select('name age -_id').then(res => console.log(res));   // -_id 表示去掉 _id 这个字段

// 按年龄升序
// Teacher.find().sort('age').then(res => console.log(res));

// 按年龄降序
// Teacher.find().sort('-age').then(res => console.log(res));

// 跳过某些数据
// Teacher.find().skip(1).limit(2).then(res => console.log(res));
