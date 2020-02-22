const fs = require('fs');

let promise = new Promise((resolve, reject) => {
    // 异步任务
    // fs.readFile('./a.txt', 'utf8', function(err, data) {
    //     if (err) return reject(err);
    //     resolve(data);
    // })

    resolve(123);
    reject(123);
})

promise.then(data => {
    console.log(data);
}, err => {
    console.log(err);
})

