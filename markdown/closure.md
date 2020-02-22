# 闭包

**变量作用域**

- 全局作用域

    全局变量 在喊外部定义的变量；使用范围:函数内外部都可以使用

- 局部作用域

    局部变量 函数内部定义的变量；使用范围:只能在函数内部使用



```javascript
var num = 10;   // 全局变量
function f() {
    var num2 = 20;  // 局部变量
    console.log(num);   // 10
}
f();
```
局部变量为什么在外部不能使用？

答：在内存空间角度来说，在函数内部定义的变量，在函数执行完后，会自动销毁其内部定义的变量即局部变量，所以函数外部就不能够使用该局部变量。

局部变量只能在函数内部使用？

答：错误的，局部变量一般是在函数内部使用，但也可以使用闭包访问另外一个函数作用域中的变量

## 闭包概念

闭包有权利访问另外一个函数作用域中变量的函数

```javascript
function outer() {
    var a = 10;
    function inner() {
        console.log(a); // 10
    }
    inner();
}
outer();
```
函数 inner 就是闭包，本质上就是个函数，可以访问另外一个 outer 函数作用域中的变量 a，所以 outer 就是闭包函数, inner 为闭包。

上述代码变形

```javascript
function outer() {
    var a = 10;
    function inner() {
        console.log(a);
    }
    return inner;
}
var o = outer();
o();    // 10
```
从执行结果来看，在外部调用函数是可以调用 outer 内部定义的局部变量 a，可以看出局部变量 a 的使用范围被延伸了，所以说局部变量一定在函数内部使用是错误的。

闭包可以延伸变量的作用范围

## 闭包案例

**案例一**

单击 li 打印每个 li 的序号

```HTML
<ul class="nav">
    <li>北京</li>
    <li>上海</li>
    <li>广东</li>
</ul>
```
思路一 动态添加属性
```javascript
var lis = document.querySelector('ul.nav').querySelectorAll('li');
for(var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onclick = function () {
        console.log(this.index);
    }
}
```
思路二 闭包实现
```javascript
for(var i = 0; i < lis.length; i++) {
    (function (i) {
        lis[i].onclick = function () {
            console.log(i);
        }
    })(i);
}
```
思路三 es6 let 语法
```javascript
for(var i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        console.log(i);
    }
}
```

**案例二**

3 秒后打印每个城市

```HTML
<ul class="nav">
    <li>北京</li>
    <li>上海</li>
    <li>广东</li>
</ul>
```
思路一 es6 let 语法
```javascript
for(let i = 0; i < lis.length; i++) {
    setIimeout(function() {
        console.log(lis[i].innerHTML);
    }, 3000)
}
```
思路二 闭包实现
```javascript
for(var i = 0; i < lis.length; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(lis[i].innerHTML);
        }, 3000)
    })(i);
}
```

**案例三**

3 公里内 14元/公里 每增加 1 公里收 5 元
堵车 在原来收费上多收 5 元

```javascript
var c = (function() {
    var base = 14;
    var sum = 0;
    return {
        normal: function(n) {
            if (n <= 3) {
                sum = base;
            } else {
                sum = base + (n - 3) * 5
            }
            return sum;
        },
        trafficJam: function(falg) {
            return falg ? sum + 5 : sum;
        }
    }
})();
c.normal(5);
console.log(c.trafficJam(true));
```
