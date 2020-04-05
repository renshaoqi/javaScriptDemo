/**
 * 1 如果数据是对象的话， 具有响应式
 * 2 如果数据是数组的话
 *      数组元素不是一个对象，将来通过索引来改变数据，不会进行响应式
 *      数据元素是一个对象，这个对象也具有响应式
 *      通过 push/shift/splice... 方法具有响应式，并且添加元素值是一个对象，那这个对象也具有响应式
 */

function observer(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        // 处理数组
        Object.setPrototypeOf(obj, proto);
        observerArray(obj);
    } else {
        for (let k in obj) {
            defineReactive(obj, k, obj[k])
        }
    }
}

function observerArray(arry) {
    for (let i = 0; i < arry.length; i++) {
        observer(arry[i])
    }
}

function defineReactive(obj, k, value) {
    // value 有可能也是一个对象，递归创建响应式数据
    observer(value);
    Object.defineProperty(obj, k, {
        get() {
            // console.log('get()');
            return value;
        },
        set(newValue) {
            console.log('视图更新');
            value = newValue
            return value;
        }
    });
}

let arrayProto = Array.prototype;
let proto = Object.create(arrayProto);
['push', 'shift', 'splice'].forEach(method => {
    proto[method] = function(...args) {
        console.log('更新视图操作');
        if (method === 'splice') {
            observerArray(args.slice(2));
        } else{
            observerArray(args);
        }
        arrayProto[method].call(this, ...args);
    }
})


let data = {
    a: 10,
    b: 20,
    c: {
        num: 100
    },
    d: [1, 2, {num: 20}]
}

observer(data);
// data.a = 30;
// data.c.num = 200;
// data.d[2].num = 10;
data.d.push(4, {a: 111});
console.log(data.d[4])