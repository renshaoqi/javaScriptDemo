需要借助 babel 语法  babel 也叫编译器


1. 安装 

npm i @babel/core @babel/runtime babel-loader

语法插件包: @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties

2. 配置 webpack 
```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                res: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/  // 排除打包的文件，因为node_modules 已经打包好了 而且里面的文件特别多 这样重新打包 node_modules 就特别耗时
            }
        ]
    }
}
```

3. 配置 babel.config

```javascript
// babel.config.js
module.exports = {
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
}
```
