console.log(Array(3));  // 3 是长度
// 把 3 该为元素
console.log(Array.of(3));   // [ 3 ]

// copyWithin 覆盖
console.log([1, 2, 3, 4, 5].copyWithin(1, 2, 5));   // [1, 3, 4, 5, 5]
/**参数
 * 参数一：为覆盖的目标的索引
 * 参数二：拿来覆盖目标索引的值
 * 参数三：拿来覆盖的值结束的索引（不包含本身）;
 */

// fill 填充
let arr = [1, 2, 3, 4, 5];
arr.fill('dd', 2, 4);
console.log(arr);  // [1, 2, 'dd', 'dd', 5];

// find 查找元素 找到返回当前值，找不到返回 undefined
let arr = [1, 2, 3, 4, 5];
let find = arr.find((item, index, arr) => {
    return item === 3;
});
console.log(find);  // 3

let find1 = arr.find((item, index, arr) => {
    return item === 13;
});
console.log(find1);  // undefined
