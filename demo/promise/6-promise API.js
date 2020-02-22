// 类方法 all

let fs = require('fs');

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) return reject(path);
            resolve(data);
        })
    })
}

// Promise.all([read('./a.txt'), read('./b.txt')]).then((res) => {
//     console.log(res);
// })

// 类 reca 竞争
Promise.race([read('./a.txt'), read('./b.txt')]).then((res) => {
    console.log(res);
}, (path) => {
    console.log(path);
})

// resolve() 返回一个成功态的 Promise 实例
Promise.resolve().then(() => {
    console.log("success");
})

// reject() 返回一个失败态的 Promise 实例
Promise.reject().then(() => {

}, () => {
    console.log('error');
})
