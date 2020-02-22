# 深入理解 JS 函数中 this 指针的指向

函数执行时，会在函数体内部自动生成一个指针。 谁**直接调用产生这个 this 指针的函数**，this 就指向谁。

这么理解指向呢，我认为指向就是等于。例如直接在 js 中输入下面的等式：

```javascript
console.log(this === window); // true
```

情况不同，this 指向的对象也不同。例如：

## 1. 函数声明的情况

```javascript
var bj = 10;
function add() {
    var bj = 20;
    console.log(this); // window
    console.log(this.bj); // 10
    console.log(bj); // 20
    console.log(this.bj + bj); // 30
}
add();  // 等价于 window.add()
```

上述代码中，执行 add() 之后，此时的 this 指向是 window 对象，为什么呢？因为这时候 add 是全局函数，是通过 window 直接调用的。

## 2. 函数表达式

```javascript
var bj = 10;
var zjj = function() {
    var bj = 30;
    console.log(this);  // window
    console.log(this.bj);   // 10
    console.log(bj);    // 30
}
console.log(typeof zjj);    // function
zjj();  // 等价于 window.zjj();
```

上述代码，执行 zjj() 之后，函数中的 this 也是指向 window 对象。原因和第一个是一样的，都是通过 window 这个对象**直接调用**。

## 3. 函数作为对象的属性去调用-----例一

```javascript
var bj = 10;
var obj = {
    name: "八戒",
    age: 500,
    say: function() {
        var bj = 40;
        console.log(this);  // 就是 obj 这个对象
        console.log(this.bj);  // undefined
        console.log(bj);    // 40
        console.log(this.name); // 八戒
    }
}
obj.say();  // 等价于 window.obj.say()
```

1. 当obj.say() 被执行的时候，此时的 this 执行的是 obj 这个对象，为什么呢？因为 say 函数是通过 obj 这个对象直接调用的。
2. 那有人可能会问了，obj 对象实际上也是通过 window 对象调用的，为什么 this 不指向 window 呢？我认为是因为 say 这个函数是通过  obj 对象直接调用的，而没有通过 window 对象直接调用，因此 this 不会执行 window 。看下面的例子就明白了。

```javascript
var bj = 10;
var obj = {
    name: "八戒",
    age: 500,
    say: function() {
        console.log(this);  // obj 对象
        console.log(this.bj);   // undefined
        console.log(this.name); // 八戒
    },
    action: {
        name: "悟空",
        age: 1000,
        say: function() {
            console.log(this);  // action 对象
            console.log(this.bj);   // undefined
            console.log(this.name); // 悟空
        }
    }
}

obj.say();
obj.action.say();
window.obj.action.say();
```

1. obj.say() 执行之后，此时这个函数里的 this 指向的是 obj 对象，原因是因为 say 函数是通过 obj 直接调用的
2. obj.action.say() 执行之后，此时这个函数的 this 指向的是 action 对象，原因是因为 say 函数是通过 action 对象直接调用的。并没有通过 obj 直接调用。也没有通过 window 直接调用，所以此时 action 对象中的 say 函数里的this 执行并不会是 obj 或者 window。

## 3.1 函数作为对象的属性去调用-----例二

```javascript
var bj = 10;
var obj = {
    name: "八戒",
    age: 500,
    say: function() {
        console.log(this);  // obj 对象

        function wk() {
            console.log(this);  // window
            console.log(this.bj);   // 10
            console.log(this.name); // 这里显示为空
        }
        wk();
    }
}
obj.say();
```

1. 这种情况下，say 函数里面的 this 指针还是指向 obj
2. 但是这时候 wk 函数中的 this 就是指向 window 了。为什么呢？因为 wk() 函数在 say() 函数中，是属于普通函数调用，但是并没有通过 say 或者 obj 直接调用，只是自执行，这个时候 wk 就是一个全局函数，因此该函数的 this 指向的是 window 。
3. 那为什么 this.name 是显示为空呢？因为 window 对象中本身就有一个 name 值，并不是某处添加的，如果把 name 改为 age ，得到的结果就是 undefined 了。
4. 那怎样让 wk() 函数中的 this 指向 obj 呢？方式一：就是在 say 函数的this 用变量保存起来，即 `var _this = this;` 然后 wk() 函数使用 _this 就能达到指向 obj 的目的了。方式二：通过 apply 或者 call 来改变。
5. 那 wk() 在这里能不能写 window.wk() 呢？这样是不行的，会报错， window.wk is not a function。为什么不行呢，this 不是指向 window 吗，为什么 window 对象里没有 wk() 这个函数。。这个嘛，我也不知道，先留个坑，后面再来填XXX

## 3.2 函数作为对象的属性去调用-----例三

```javascript
var bj = 10;
var obj = {
    name: "八戒",
    age: 500,
    say: function() {
        var bj = 40;
        console.log(this);  // window
        console.log(this.bj);   // 10
        console.log(this.name); // 这里没有输出内容
    }
}
var elseObj = obj.say;
elseObj();
```

这里执行 elseObj() 函数之后，为什么 say 函数中的 this 却是指向了 window 对象呢？首先要理解这句话：谁直接调用产生这个 this 指针的函数，this 就指向谁。当 obj.say 赋值给 elseObj 的时候，elseObj 只是一个函数，而并没有执行，因此 this 指针的指向并不明确，这个时候指向到 `var elseObj = obj.say` 的时候，程序相对于：

```javascript
var bj = 10;
var elseObj = function() {
    var bj = 40;
    console.log(this);
}
elseObj();
```

这种和 第2种 函数表达式的情况一样的。所以，当执行 elseObj() 的时候，this 指向就是 window 了。

## 3.3 函数作为对象的属性去调用-----例四

```javascript
var bj = 10;
var obj = {
    name: "八戒",
    age: 500,
    say: function() {
        return function() {
            console.log(this);  // window
            console.log(this.bj);   // 10
        }
    }
}
obj.say()();
/*
var elseObj = obj.say();
elseObj();
*/
```

1. obj.say()() 为什么会有两个括号？因为 obj.say() 执行之后返回的是一个函数，并没有执行，再加一个括号就是执行返回的那个匿名函数。
2. 如果不习惯也可以使用上面注释的那种方式，是一样的结果。
3. 执行了函数之后，为什么返回的函数中 this 指向是 window 对象呢？那是因为执行 obj.say() 函数的时候，返回的是一个函数，相当于就是注释里的第一行代码，这时候返回的函数并未执行。就和例三的情况一样的。

## 4. 工厂模式中 this 的指向-----例一

```javascript
var bj = 10;
function fun(a, b) {
    console.log(this);  // window 对象
    var bj = 20;
    var sun = new Object();
    sun.one = a;
    sun.two = b;
    sun.say = function() {
        console.log(this);  // sun 对象，{one: 2, two: 3, say: f{} }
        console.log(this.bj);   // undefined
        console.log(this.one);  // 2
    }
    return sun;
}
var wk = fun(2, 3);
var ak = fun(2, 3);
wk.say();
console.log(wk === ak);

```

1. 话说什么叫工厂模式，我搞不太清楚，不过也不重要，重要的是通过这个模式，在每次调用函数的时候，虽然每次都返回的是 sun 这个对象，但是每个对象都是不相似的，即内容不一样，比如`console.log(fun(2, 3) === fun(2, 3));  // false`。
2. 那为什么 say() 函数执行之后，this 是指向返回的那个对象呢？这个很明显嘛，say() 是通过 wk 这对象直接调用的，而 wk 是 fun 函数返回 sun 对象。所以这里的 this 就指向的是返回的对象，所以 this.bj 为 undefined ，因为返回的对象中没有 bj 这个属性。
3. 我认为这种模式最重要的还是 return sun 这个返回语句，这个是必不可少的。
4. fun(a, b) 这个函数中的 this 指向的是 window ，原因是执行 `var wk = fun(2, 3);` 的时候，fun 函数已经被执行了，并且直接调用它的就是 window，所以这时的 this 是指向 window 对象的。

## 4.1 工厂模式中 this 的指向-----例二

```javascript
var bj = 10;
function fun(a, b) {
    console.log(this);  // window 对象
    var bj = 20;
    var sun = new Object();
    sun.one = a;
    sun.two = b;
    sun.say = function() {
        console.log(this);  // sun 对象
        return function() {
            console.log(this);  // window 对象
        }
    }
    return sun;
}
var wk = fun(2, 3);
var ss = wk.say();
ss();
```

为什么 say 函数中 return 的函数 this 指向的是 window 对象呢？首先，`var wk = fun(2, 3);` 的时候，wk 是一个对象。继续执行下一句代码，ss 这时候是一个函数，就是通过 say 函数返回之后赋值的。这时候返回的函数未执行，this 指向并不明确。当执行到最后一句代码，css() 函数执行了。这时候，ss 函数就是一个全局函数，是通过 window 直接调用的。所以这时 this 指向的是 window

如果 say 中返回的是一个对象，对象中又有函数，像下面一样：

```javascript
sun.say = function() {
    console.log(this);  // sun 对象
    return {
        wk: '1',
        say: function() {
            console.log(this);  
        }
    }
}
```

这时候执行到 ss.say() 的时候，this 指向的就是 ss 这个对象，即通过 say函数返回的那个对象。原因还是一样，say 函数是通过 ss 直接调用的，而 ss 对象是 wk.say() 返回的对象。

# 5. 构造函数中 this 的指向

```javascript
var bj = 10;
function Add() {
    var bj = 20;
    this.bj = 30;
    console.log(this);
    this.say = function() {
        console.log(this);  // Add {bj: 30, say: f{}}
        console.log(this.bj);   // 30
    }
    console.log(this);  // Add {bj: 30, say: f{}}
}
var obj = new Add();
console.log(typeof obj);    // object
obj.say();
```

1. 要明白构造函数的 this 指向，我们需要明白调用构造函数的经历步骤
    a. 创建一个新对象。
    b. 将构造函数的作用域赋值给新对象（因此 this 就指向这个新对象）。
    c. 执行构造函数中的代码（为这个新对象添加属性）
    d. 返回新对象
2. 构造函数与工厂模式相比：
    a. 没有显示的创建对象。
    b. 没有 return 语句。
    c. 直接将属性和方法赋值给 this 对象。

3. 首先，obj.say() 执行之后，say 函数中 this 指向的是 obj 对象，这个很明显，不再赘述。在不用 new 操作符的时候，Add() 函数里的 this 指向的就是window ；但是使用了 new 操作符之后，Add() 函数中 `console.log(this)` 这个 this 为什么是 obj 对象，而不是 window 对象？

4. 因为使用 new 操作符的时候，js 先创建一个新的空对象，然后，js 传入指定的参数并将这个对象当做 this 的值来调用一个指定的函数。这个函数可以使用 this 来初始化这个新对象的属性。所以当使用 new 操作符之后，函数中的 this 指向的是新创建的对象。所以构造函数中的 this 就是指向 new 出来的那个对象

5. 如果构造函数中有 return 语句，那么此时 `var obj = new Add();` obj 就是 return 出来的内容，但是 Add 函数中的 this 还是指向的创建的新对象 Add

## 6. 原型对象中 this 的指向

```javascript
var bj = 10;
function Add() {
    console.log(this);  // Add{}
}
Add.prototype.bj = 10;
Add.prototype.say = function() {
    console.log(this);  // Add{}
    return function() {
        console.log(this);  // window
    }
}

var obj = new Add();
obj.say()();
```

1. obj.say()() 执行的时候，this 指向的是 window ， 这个还是因为执行 obj.say() 时返回一个匿名函数，然后再加一个括号，就执行返回的这个函数，此时这个函数属于全局函数，所以，this 会指向 window

2. Add() 这个构造函数中的 this 指向的是 Add{} ，原因和上面构造函数的 this 指向一样。

3. `Add.prototype.say = function(){ console.log(this); }` 这里面的 this 也是指向的是 Add{} ,至于原因，我认为 say() 这个函数是通过 obj 直接调用的

总结

    要判断函数中 this 的指向， 只要知道谁直接调用产生 this 指针的函数，this 就指向谁了。 只是要注意使用了 new 操作符之后，构造函数内部的 this 指向的是新对象，通俗点讲就是 new 出来的新实例。