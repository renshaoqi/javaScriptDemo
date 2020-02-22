# 一 面向对象
## 1 简介
- 面向过程（POP）
> 分析问题所需要的步骤
- 面向对象（OOP）
> 以功能对象划分问题 对象有属性和方法组成

**面向对象的特点**
1. 抽取对象共用的属性和行为组织成一个类
2. 对类进行实例化

**面向过程 VS 面向对象**

1. 面向对象比面向过程灵活、复用、维护方便，但性能比面向过程低，适用于复杂的项目
2. 面向过程比面向对象的性能高，但在灵活、复用和维护这块差很多，适用于比较简单明了的项目

## 2 构造函数的定义
**首先我们得知道对象的创建方式：**

1. 对象直接量
```javascript
var zs = {
    name: "zhangsan",
    age: 20
}
```
2. 通过构造函数来创建
```javascript
var zs = new Object();
```
3. 自定义构造函数
```javascript
function Cat() {
    this.color = 'black';
};
var cat = new Cat();    // 实例化对象
```
通过以上的三种方式，可以看出对象的定义可以使用构造函数来定义
> 在 JavaScript 中，通过关键词 new 调用的函数，称为构造函数，构造函数的首字母一般为大写

**实例化构造函数的内部执行过程**
1. 首先在内存中创建一个空的对象
2. 让函数中的 this 的值指向这个空的对象
3. 开始执行函数体
4. 返回该对象（构造函数中不需要写return）

示例：
```javascript
function Gril () {
    this.age = 22;
    this.education = '本科';
};
var g1 = new Gril(); // 使用new关键字进行调用， g1 为实例化对象
var g2 = new Gril();
console.log(g1 === g2); // false 由于示例化的时候，都会先在内存中开辟一块空间，所以 g1 和 g2 是不同的
```

**实例成员和静态成员**

1. 实例成员: 在构造函数中内部中通过 this 添加的成员；访问: 实例名.成员名

示例
```javascript
function Student (name, age) {
    this.name = name;   // 通过 this 添加的成员 为 实例成员
    this.age = age;
}
```


2. 静态成员: 在构造函数本身添加的成员，一般放置于公共的属性；访问: 构造函数名.成员名

示例
```javascript
function Student(name, age) {
    this.name = name;
    this.age = age;
};
var stu = new Student("R先生", 22); // 实例化对象
Student.education = "专科"; // 静态成员
// 静态成员的访问  构造函数名.成员名或对象名.constructor.成员名
console.log(Student.education); // 专科
console.log(stu.constructor.education); // 专科
```

## 3 原型
1. 原型定义的函数是可以共享的
2. 每一个构造函数都有一个 prototype 属性，其值指向为一个对象，该对象定义的属性和方法都会被构造函数所拥有
3. 构造函数的实例可以共享原型对象
4. 对象可以通过原型对象访问构造函数的静态方法 静态方法=构造函数.方法名
