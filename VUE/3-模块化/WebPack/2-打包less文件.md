1. 安装 npm i less-loader less -D
2. 配置 webpack 
```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                res: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
}
```
3. 再打包入口文件中 执行 css 文件  import 'index.less'
