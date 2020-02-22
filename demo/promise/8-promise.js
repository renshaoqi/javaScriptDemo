let Promise = require('./Promise');

let p1 = new Promise((resolve, reject) => {
    resolve(222);
    // reject(123);
    // setTimeout(() => {
    //     resolve('success');
    // }, 1000);
});


p1.then((result) => {
    console.log(result);
}, (reason) => {
    console.log(reason);
})


// p1.then((result) => {
//     console.log(result + "@@");
// }, (reason) => {
//     console.log(reason + "@@");
// })


