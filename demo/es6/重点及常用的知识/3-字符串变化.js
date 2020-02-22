// 一 模板字符串
let name = 'R先生';
let age = 22;
// 字符串拼接
let str = 'My name is ' + name;
console.log(str);   // My name is R先生

// 使用模板字符串方式
let str1 = `My name is ${name}`;
console.log(str1);

// 模板字符串使用原理
let name = "R先生";
let age = 22;
let str = 'My name is ${name}, I am ${age}';
str = str.replace(/\$\{([^}]*)\}/g, function() {
    console.log(arguments);
    return eval(arguments[1]);
});

console.log(str);

console.log('http://www.baidu.com'.startsWith('http'));  // true
console.log('1.jpg'.endsWith('png'));    // false
console.log('My name is R先生'.includes('is')); // true
console.log('hi'.repeat(10));
console.log('8'.padStart(5, 0));    // 00008
console.log('8'.padEnd(5, 0));  // 80000