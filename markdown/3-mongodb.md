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

## 数据查找

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/school').then(() => {
    console.log('数据库连接成功');
}).catch(err => console.log(err));

// 创建集合规则
const teacherSchema = mongoose.Schema({
    name: String,
    tel: String,
    age: Number
});

// 创建集合实例
const Teacher = mongoose.model('Teacher', teacherSchmea);

// 查找所有数据
Teacher.find().then(res => console.log(res));
// 查找 name 为 R先生的字段
Teacher.find({ name: 'R先生' }).then(res => console.log(res));
// 查找 name 为 R先生的第一条数据
Teacher.findOne({ name: 'R先生' }).then(res => console.log(res));
// 查找年龄在 18~25 之间的数据
Teacher.find({ age: {$lte: 25, $gte: 18 } }).then(res => console.log(res));
// 查找爱好包含篮球的数据
Teacher.find({ hobbies: { $in: ['篮球'] }}).then(res => console.log(res));
// 查找只显示 name 和 age 字段
Teacher.find().select('name age -_id').then(res => console.log(res));   // 默认会显示 _id 字段
// 查找按年龄升序
Teahcer.find().sort('age').then(res => console.log(res));
// 查找按年龄降序
Teacher.find().sort('-age').then(res => console.log(res));
// 查找跳过第一条数据，然后显示出两条数据
Teahcer.find().skip(1).limit(2).then(res => console.log(res));
```