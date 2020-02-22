# 正则表达式

    匹配字符串中字符组合的模式

    正则测试工具：https://tool.oschina.net/regex

## 一 创建

1.1 使用构造函数进行创建

```javaScript
var regexp = new RegExp(/123/);
console.log(regexp);
```

2.1 直接量创建

```javaScript
var regexp = /123/;
```

test() 方法: 检测某字符串是不是符合规则，返回值为 Boolean 类型

如下列代码
```javaScript
var regexp = /abc/;
console.log(regexp.test("aabcc"));  // true
console.log(regexp.test("abacc"));  // false

```

## 二 特殊字符

**边界符**

| 字符 | 含义 |
|:----:|:----:|
| ^ |匹配行首的文本 以谁开头|
| $ |匹配行尾的文本 以谁结尾|

```javascript
var regexp = /^abc/;
console.log(regexp.test('abcdef')); // true
console.log(regexp.test('dabcef')); // false
```

**字符类**

| 字符 | 含义 |
|:----:|:----:|
| [] |表示有一系列字符可以选择 只需要匹配一个就可以了|

```javascript
var regexp = /[abc]/;
console.log(regexp.test('adef')); // true
console.log(regexp.test('def')); // false
console.log(regexp.test('abdef')); // true
var regexp1 = /^[abc]/;
console.log(regexp1.test('abdef')); // true
console.log(regexp1.test('daebf')); // false
var regexp2 = /^[abc]$/;
console.log(regexp2.test('a')); // true
console.log(regexp2.test('ab')); // false
console.log(regexp2.test('cc')); // false
console.log(regexp2.test('c')); // true
```

**量词类**

| 字符 | 含义 |
|:----:|:----:|
| * | 出现 0 次以上 >=0 等价于 {0,} |
| + | 出现 1 次以上 >=0 等价于 {1,} |
| ? | 出现 1 次或 0 次 等价于 {0,1} |
| {n} | 出现 n 次的指定字符 |
| {n,} | 出现 n 次以上的指定字符 |
| {n,m} | 出现 n 到 m 次的指定字符 |

```javascript
var regexp = /^a*$/;
console.log(regexp.test(''));   // true
console.log(regexp.test('a'));   // true
console.log(regexp.test('aa'));   // true
console.log(regexp.test('cde'));   // false

var regexp1 = /^a+$/;
console.log(regexp1.test(''));   // false
console.log(regexp1.test('a'));   // true

var regexp2 = /^a?$/;
console.log(regexp2.test(''));   // true
console.log(regexp2.test('a'));   // true
console.log(regexp2.test('aa'));   // false

var regexp3 = /^a{3}$/;
console.log(regexp3.test(''));   // false
console.log(regexp3.test('a'));   // false
console.log(regexp3.test('aa'));   // false
console.log(regexp3.test('aaa'));   // true

var regexp4 = /^a{3,5}$/;
console.log(regexp4.test(''));   // false
console.log(regexp4.test('aaa'));   // true
console.log(regexp4.test('aaaaaa'));   // false

```

## 预定义类

| 字符 | 含义 |
|:----:|:----:|
| \d | 匹配 0-9 字符  |
| \D | 匹配 不是 0-9 字符 |
| \w | 匹配 数字、字母和下划线字符 |
| \W | 匹配 不是数字、字母和下划线字符 |
| \s | 匹配 空格字符 （\t\r\n\v\f） |
| \S | 匹配 不是空格字符 |

