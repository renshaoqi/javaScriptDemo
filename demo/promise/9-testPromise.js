let Promise = require('./Promise');

let p1 = new Promise((resolve, reject) => {
    // setTimeout(()=>{
    //     resolve('aa');
    // }, 1000)
    resolve('aa');
    // reject('aa');
    // throw new Error("错误!");
})

p2 = p1.then((data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        resolve('ok');
    })
}, (err) => {
    console.log(err);
})

p2.then((data) => {
    console.log(data + '@@');
}, (err) => {
    console.log(err + '@@');
});

// p1.then((data) => {
//     console.log(data);
// }, (err) => {
//     console.log(err);
// })