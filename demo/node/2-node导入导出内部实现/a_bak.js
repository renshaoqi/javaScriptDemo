let fs = require('fs');
let path = require('path');
let vm = require('vm');

function Module(id) {
    this.id = id;
    this.exports = {};
}

Module.warpper = [
    '(function(exports, require, module, __dirname, __filename){\n',
    '\n})'
]

// 给 Module 构造器添加后缀名属性
Module._extensions = {
    '.js' (module) {
        // 1 读取文件
        let script = fs.readFileSync(module.id, 'utf-8');
        // 2 拼接成一个函数内部带有读取文件的数据
        let fnStr = Module.warpper[0] + script + Module.warpper[1];
        // 3 使用 vm.runInThisContext 方法执行拼接好的这个函数， 因为 runInThisContext 会形成一个独立的运行环境
        let fn = vm.runInThisContext(fnStr);
        // 4 使用 call() 方法改变 this 指向，使其 this 指向 module 这个模块
        let exports = module.exports;
        fn.call(exports, exports, myRequire, module, path.dirname(module.id), module.id);
    },
    '.json' (module) {
        let json = fs.readFileSync(module.id, 'utf-8');
        module.exports = JSON.parse(json);
    }
}

// 缓存
Module._cache = {

}

function resolveFilename(myPath) {
    // 1 把 myPath 解析成绝对路径
    let res = path.resolve(__dirname, myPath);
    // 2 判断该文件是否存在 不存在则添加后缀名
    let isExists = fs.existsSync(res);
    if (isExists) {
        // 直接返回绝对路径
        return res;
    } else {    // 添加后缀名
        // 3 获取 Module 构造器的属性 _extensions
        let keyList = Object.keys(Module._extensions);  // 返回的是一个数组
        for (let i = 0; i < keyList.length; i++) {  // 循环数组，得到没有 key 值
            // 进行后缀名的拼接
            let tryFilename = res + keyList[i];
            // 判断拼接后的路径是否存在
            if (fs.existsSync(tryFilename)) {
                return tryFilename;
            }
        }
        // 表示都没有找到文件，抛出异常
        throw new Error('module not found');
    }
}

function tryModuleLoad(module) {
    // 1 获取模块的扩展名
    let extname = path.extname(module.id)
    Module._extensions[extname](module);
}

function myRequire(myPath) { 
    let absPath = resolveFilename(myPath);
    let cacheModule = Module._cache[absPath];
    if (cacheModule) {
        return cacheModule.exports;
    }
    // 加载模块
    let module = new Module(absPath);
    Module._cache[absPath] = module;
    tryModuleLoad(module);
    return module.exports;
}

let str = myRequire('./b');
myRequire('./b');
console.log(str);
