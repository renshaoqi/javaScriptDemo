const path = require('path');
// 导入 html-webpack-plugin 生产预览页面配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',   // 指定预览页面的模板
    filename: 'index.html'  // 设置预览页面的名称
});


module.exports = {
    mode: 'development', // production
    // 指定打包入口
    entry: path.join(__dirname, './src/index.js'),
    output: {
        // 输出文件路径
        path: path.join(__dirname, './dist'),
        // 输出文件名
        filename: 'bundle.js'
    },
    // 插件
    plugins: [htmlPlugin],
    // 配置规则
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: "url-loader?limit=16940"  // 设置小于 16940 就转换成 base64 
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/ // 排除打包的文件，因为node_modules 已经打包好了 而且里面的文件特别多 这样重新打包 node_modules 就特别耗时
            }
        ]
    }
}
