console.log(123);
let str = 'hello';

console.log(Object.prototype.toString.call([]));


// 在多少次后执行
function after(times, callback) {
    return function() {
        if (--times === 0) {
            callback();
        }
    }
}

fn = after(3, function() {
    console.log('after');
})
fn();
fn();
fn();


// 在 说话（saying）之前先喝口水（drink）
function say(...who) {
    console.log(...who);    // 我 你
    console.log(who + 'saying');
}

Function.prototype.before = function(fn) {
    let _this = this;
    return function() {
        fn();
        console.log(arguments);  // { '0': '我', '1': '你' }
        _this(...arguments);    // es6 展开运算符
    }
}

let newFun = say.before(function() {
    console.log('drink');
});

newFun('我', '你');