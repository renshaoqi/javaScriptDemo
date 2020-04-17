1. 安装 npm i style-loader css-loader -D
2. 配置 webpack 
```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                res: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```
3. 再打包入口文件中 执行 css 文件  import 'index.css'

## 处理 css 前缀

1. 安装 npm i postcss-loader autoprefixer -D

2. 配置 webpack
```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                res: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
}
```

3. 编写 postcss.config.js 文件

```javascript
const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [autoprefixer];
}
```