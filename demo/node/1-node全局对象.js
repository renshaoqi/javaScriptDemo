// node 全局对象
console.log(Object.keys(global));

// node 全局对象中的 this
console.log(this);  // 空对象 {}

// setImmediate

setImmediate(() => {
    console.log('Immediate');
})

setTimeout(() => {
    console.log('Timeout');
})

// process.platform
console.log(process.platform);
console.log(process.env);
console.log(process.cwd());

let res = process.argv.slice(2).reduce((obj, current, index, arr) => {
    if(current.startsWith('--')) {
        obj[current.slice(2)] = arr[index + 1];
    }
    return obj;
}, {})




setTimeout(() => {
    console.log('Timeout1');
    Promise.resolve().then(() => {
        console.log('promise1');
    })
})

Promise.resolve().then(() => {
    console.log('promise2');
    setTimeout(() => {
        console.log('Timeout2');
    })
})

Promise.resolve().then(() => {
    console.log('promise3');
})

// 执行结果：promise2 promise3 Timeout1 promise1  Timeout2