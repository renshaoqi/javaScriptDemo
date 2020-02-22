class Promise {
    constructor(executorCallback) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledArray = [];
        this.rejectedArray = [];

        let resolveFn = (result) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status === 'pending') {
                    this.status = 'fulfilled';
                    this.value = result;

                    this.fulfilledArray.forEach(item => item(this.value));
                }
            })
        }

        let rejectFn = (reason) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status === 'pending') {
                    this.status = 'rejected';
                    this.value = reason;
                    this.rejectedArray.forEach(item => item(this.value));
                }
            })
        }
        try {
            executorCallback(resolveFn, rejectFn);
        } catch (e) {
            rejectFn(e);
        }
    }

    then(fulfilledCb, rejectedCb) {
        return new Promise((resolve, reject) => {
            this.fulfilledArray.push(function(value) {
                let x = fulfilledCb(value);
                x instanceof Promise ? x.then(resolve, reject) : resolve(x);
            });
            this.rejectedArray.push(function(value) {
                let x = rejectedCb(value);
                x instanceof Promise ? x.then(resolve, reject) : resolve(x);
            });
        })
    }
}

module.exports = Promise;