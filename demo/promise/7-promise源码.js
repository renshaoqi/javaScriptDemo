// class Promise {
//     constructor(executorCallback) {
//         var _this = this;
//         _this.status = 'pending';
//         _this.value = '';   // 记录成功原因
//         _this.reason = undefined;   // 记录失败原因
//         _this.onResolvedCallbacks = [];    // 存放成功回调函数
//         _this.onRejectedCallbacks = [];    // 存放失败回调函数
//         function resolve(value) {
//             if (_this.status === 'pending') {
//                 _this.status = 'resolved';
//                 _this.value = value;    // 保存成功注释

//                 // 支持异步
//                 // _this.onResolvedCallbacks.forEach(item => item(_this.value));
//                 _this.onResolvedCallbacks.forEach(item => item());
//             }
//         }

//         function reject(reason) {
//             if (_this.status === 'pending') {
//                 _this.status = 'rejected';
//                 _this.reason = reason; // 保存失败原因

//                 // 支持异步
//                 _this.onRejectedCallbacks.forEach(item => item(_this.reason));
//             }
//         }

//         try {
//             executorCallback(resolve, reject);
//         } catch (e) {
//             reject(e);
//         }
//     }

//     then(onFufilled, onRejected) {
//         let _this = this;
//         if (this.status === 'resolved') {
//             onFufilled(this.value);
//         }
//         if (this.status === 'rejected') {
//             onRejected(this.reason);
//         }
//         if (this.status === 'pending') {
//             // this.onResolvedCallbacks.push(onFufilled);
//             this.onResolvedCallbacks.push(function() {
//                 onFufilled(_this.value)
//             })
//             this.onRejectedCallbacks.push(onRejected);
//         }
//     }
// }


class　Promise {
    constructor(executorCallback) {
        let _this = this;
        _this.status = 'pending';
        _this.value = ''; // 存放成功的原因
        _this.reason = undefined;   // 存放失败的原因
        _this.onResolveArray = [];  // 存放成功的回调函数
        _this.onRejecteArray = [];  // 存放失败的回调函数

        function resolve(value) {
            if (_this.status === 'pending') {
                _this.status = 'resolved';
                _this.value = value;

                _this.onResolveArray.forEach(item => item(_this.value));
            }
        }

        function reject(reason) {
            if (_this.status === 'pending') {
                _this.status === 'rejected';
                _this.reason = reason;
                _this.onResolveArray.forEach(item => item(_this.reason));
            }
        }
        try {
            executorCallback(resolve, reject);
        } catch(e) {
            reject(e);
        }
        
    }

    then(onFufilled, onRejected) {
        if (this.status === 'resolved') {
            onFufilled(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
        if (this.status === 'pending') {
            this.onResolveArray.push(onFufilled);
            this.onRejecteArray.push(onRejected);
        }
    }
}

module.exports = Promise;