// 定义集合规则

const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, '学生姓名命名范围2~10个字符'],
        maxlength: [10, '学生姓名命名范围2~10个字符']
    },
    age: Number,
    email: String,
    courses: [String]
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;