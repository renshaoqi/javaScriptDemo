// 创建学生集合规则
const mongoose = require('mongoose');
// 创建规则
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, '学生命名范围为3~12个字符'],
        maxlength: [6, '学生命名范围为3~12个字符']
    },
    age: Number,
    email: String,
    courses: [String]
})
// 创建实例
const Student = mongoose.model('Student', studentSchema);

// 导出
module.exports = Student

