// 封装常用的函数


function isType(type) {
    /**
     * 运用技术：高阶函数
     * 判断参数的类型
     * obj 参数
     * type 类型
     * 返回值 boolean 值
     */
    return function(obj) {
        return Object.prototype.toString.call(obj).includes(type);
    }
}

let types = ['String', 'Objcet', 'Array', 'Null', 'Undefind', 'Boolean'];
let fns = {};   
types.forEach(type => {
    // 批量生成函数
    fns['is' + type] = isType(type);
});

console.log(fns.isBoolean(false));