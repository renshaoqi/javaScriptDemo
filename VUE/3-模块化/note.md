一个功能单独封装到一个模块中

浏览器
    以前用得比较多的: AMD(Require.js)、CMD(Sea.js)  

服务端 commonjs



ECMA 推出 ES6 模块化
浏览器和服务端通用
特点：
    1.每一个js文件也是一个模块
    2.import 导入
    3.export 导出
因为现在有些浏览器不支持 ES6 模块化，所有通过 Babel 进行打包

Babel 安装如下
npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/node

--save @babel/polyfill


# webpack

