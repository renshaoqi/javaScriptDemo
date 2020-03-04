const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/school').then(() => {
    console.log("连接成功")
}).catch(err => console.log(res));

// 创建集合规则
const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '请传入name'],   // 设置校验规则，必传
        minlength: [2, '姓名长度不能小于2个字符'],  // 字符串最小长度
        maxlength: [8, '姓名长度不能大于8个字符'],   // 字符串最大长度
        trim: true  // 去除首位空格
    },
    tel: String,
    age: {
        type: Number,
        min: [1, '年龄不能小于一岁'],
        max: [126, '年龄不能大于126岁']
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        enum: {
            values: ['user@qq.com', 'user@163.com'],
            message: '邮箱必须从指定的选择'
        }
    },
    qq: {   // 自定义校验器
        type: String,
        validate: {
            validator: v => {
                return v.charAt(0) === '1' && v.length === 6;
            },
            message: 'qq号必须以1开头且长度为6'
        }
    }
});

// 创建集合实例
const Teacher = mongoose.model('Teacher', teacherSchema);

Teacher.create({ 
    name: 'tom123456', 
    tel: '23737219214', 
    age: 180, 
    email: 'user@qq.com', 
    qq: '134567' 
}).then(res => console.log(res)).catch((err) => {
    for(let k in err.errors) {
        console.log(err.errors[k].message);
    }
});
// Teacher.deleteOne({tel: '13737519134' }).then(res => console.log(res));