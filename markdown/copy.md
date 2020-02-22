# 深拷贝和浅拷贝

## 浅拷贝

浅拷贝一般出现在数据类型为对象中，因为基本上类型 Number、String、Boolean 是按值传递、而对象是按引用传递

```javaScript
var obj = {
    a: 10,
    b: 20,
    info: {
        c: 30
    }
}

var target = {}

for (var key in obj) {
    target[key] = obj[key];
}

console.log(target);    // {a:10, b:20, info:{c:30}}
target.info.c = 100;
console.log(obj.info.c);    // 100
```

上述代码中， 对象 obj 属性中的 info 为引用类型，所以浅拷贝只会拷贝其引用，因此修改 obj 属性 info ， target 中的 info 也会修改，因为 obj 和 target 中的 属性 info 都是指向同一个引用地址

## 深拷贝

使用递归方式实现深拷贝

```javaScript
function deepCopy (target, source) {
    for (var key in source) {
        var item = source[key];

        // 判断是否为数组
        if (item instanceof Array) {
            target[key] = [];
            deepCopy(target[key], item);
        } else if (item instanceof Object) {
            // 判断是否为对象
            target[key] = {};
            deepCopy(target[key], item);
        } else {
            target[key] = item; 
        }
    }
}
```