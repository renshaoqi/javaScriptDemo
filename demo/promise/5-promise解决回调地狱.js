const fs = require('fs');

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

read('./a.txt').then(data => {
    console.log(data);
    return read('./b.txt');
}).then(data => {
    console.log(data);
    return read('./c.txt');
}).then(data => {
    console.log(data);
});