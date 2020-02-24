/* requrie('./a')   
1 把相对路径解析成绝对路径 
2 读取该文件
3 让函数执行
*/

// module 构造函数
let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module(id) {
    this.id = id;
    this.exports = {};
}

Module.wrapper = [
    '(function(exports, require, module, __dirname, __filename){\n',
    '\n})'
]


Module._extensions = {
    // 添加后缀名
    '.js' (module) {  // '.js' : function() {}
        // 读取数据
        let script =  fs.readFileSync(module.id, 'utf-8');
        // 拼接获取到的数据，组合成一个函数
        let fnStr = Module.wrapper[0] + script + Module.wrapper[1];
        // 使用 vm.runInThisContext() 方法执行函数，因为 runInThisContext 会形成一个独立的运行环境
        let fn = vm.runInThisContext(fnStr);
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
    // 1 把 path 路径转成绝对路径
    let res = path.resolve(__dirname, myPath);
    // 2 判断文件是否存在 不存在 尝试添加后缀名(.js/.json)
    let isExists = fs.existsSync(res);
    if (isExists) {
        return res;
    } else {
        // 3 获取 Module 构造器的 _extensions 属性的 key 值
        let keyList = Object.keys(Module._extensions);
        console.log(keyList);
        for (let i = 0; i < keyList.length; i++) {
            let tryFilename = res + keyList[i]; // 拼接后缀名
            if (fs.existsSync(tryFilename)) {   // 判断拼接后的路径是否存在
                return tryFilename;
            }
        }
        throw new Error("module not found");
    }
    
}

function tryModuleLoad(module) {
    // 加载模块
    // 1 获取文件的扩展名
    let extname = path.extname(module.id);  // path.extname 获取文件的扩展名
    // 2 根据扩展名执行相应的方法
    Module._extensions[extname](module);
}

function myRequire(myPath) {
    let absPath = resolveFilename(myPath);
    // 使用缓存
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

let str = myRequire('./b.js');
myRequire('./b.js');
