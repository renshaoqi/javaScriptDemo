function Events() {
    this.callbacks = [];    // 存储方法
    this.results = [];  // 存储读取文件的内容
}

// 订阅函数
Events.prototype.on = function(callback) {
    this.callbacks.push(callback);  
}

// 发布函数
Events.prototype.emit = function(data) {
    this.results.push(data);
    this.callbacks.forEach(cb => cb(this.results));
}

// 导入读取文件模块
let fs = require('fs');
fs.readFile('./a.txt', 'utf8', function(err, data) {
    // 进行发布
    e.emit(data);
});
fs.readFile('./b.txt', 'utf8', function(err, data) {
    // 进行发布
    e.emit(data);
});

// 进行订阅
let e = new Events();
e.on(function(res) {
    if(res.length === 2) {
        console.log(res);
    }
});