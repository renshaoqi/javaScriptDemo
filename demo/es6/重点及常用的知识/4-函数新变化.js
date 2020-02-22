// 默认参数

function fn (a, b, c = 20) {
    console.log(c);
}

fn(1, 2, 3);    // 3
fn(1, 2);   // 20

// 展开运算符 ...

function print(a, b, c) {
    console.log(a, b, c);
}

print([1, 2, 3]);   // [1, 2, 3] undefined undefined
print(...[1, 2, 3]);    // 1 2 3

let max = Math.max.apply(null, [1, 4, 3]);
console.log(max);   // 4

let max1 = Math.max(...[1, 4, 3]);
console.log(max1);  // 4


// 数组合并
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = arr1.concat(arr2);
console.log(arr3);  // [ 1, 2, 3, 4, 5, 6 ]

// 使用展开运算符 
let arr4 = [...arr1, ...arr2];
console.log(arr4);

// 剩余运算符 

function rest(a, ...b) {
    console.log(a); // 1
    console.log(b); // [2, 3, 4]
}
rest(1, 2, 3, 4)


// 箭头函数
[2, 3, 5].forEach(function(item, index, arr) {
    // item 每次循环的值
    // index 每次循环对于的索引值
    // arr 数组本身
    console.log(item, index, arr);
    /*结果为
    2 0 [2, 3, 5]
    3 1 [2, 3, 5]
    5 2 [2, 3, 5]
    */
});

