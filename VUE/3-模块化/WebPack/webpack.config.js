const path = require('path');
module.exports = {
    mode: 'development', // production
    // 指定打包入口
    entry: path.join(__dirname, './index.js'),
    output: {
        // 输出文件路径
        path: path.join(__dirname, './dist'),
        // 输出文件名
        filename: 'bundle.js'
    }
}