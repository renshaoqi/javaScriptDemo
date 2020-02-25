const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/school').then(() => {
    console.log("连接成功");
}).catch(err => console.log(err));

// 创建集合规则
const teacherSchema = mongoose.Schema({
    name: String,
    tel: String,
    age: Number
})

// 创建集合实例
const Teacher = mongoose.model('Teacher', teacherSchema);

// 删除一条数据
// Teacher.findOneAndDelete({ name: "R先生" }).then(res => console.log(res));

// 删除多条数据
Teacher.deleteMany({ name: 'lili' }).then(res => console.log(res));