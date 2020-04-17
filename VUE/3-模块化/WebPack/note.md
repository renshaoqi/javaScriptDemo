# webpack

## webpack 生成预览页面

### 安装 

npm i html-webpack-plugin -D

### 编写 webpack 配置文件

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',    // 以哪个文件为预览模板
    filename: 'index.html'  // 生产预览页面的名称
});

module.exports = {
    ...
    plugins: [htmlPlugin]
}
```