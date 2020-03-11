// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mySchool').then(() => {
    console.log('连接成功')
}).catch(err => {
    console.log(err);
})
