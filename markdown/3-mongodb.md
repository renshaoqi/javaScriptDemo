# 连接数据库

首先，先安装 mongoose 包, npm i mongoose

```javascript
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/school').then(() => {
    console.log('连接成功');
}).catch(err => console.log(err));

// 1 创建集合规则
const teacherSchema = mongoose.Schema({
    name: String,
    tel: String,
    age: Number
});
// 2 创建符合规则的集合实例
const Teacher = mongoose.model('Teacher', teacherSchema);
// 3 创建文档/添加数据
const teacher = new Teacher({
    name: 'R先生1',
    age: 23,
    tel: 13888888888
});
// 4 文档插入数据库
teacher.save();
```

外部文件导入数据库: mongoimport -d 数据库 -c 集合名 --file 文件路径
