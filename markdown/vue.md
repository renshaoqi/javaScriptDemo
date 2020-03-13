# vue

## 简介

1. vue 是 js 的一个框架

vue 核心: vue-core + components + vue-router + vuex + vue-cli

渐进性: 就是在上述核心中可以使用一个或多个来写项目，任意的搭配技术栈

2. mvvm 

vue 很早之前都是很多的思想都是从后端移植过来的


比如 mvc
    view           controller            model
     |
    view        viewmode          model
    视图         视图模型          数据

## vue 基本使用

```html
<!-- 2 mvvm 中的 view 视图层 -->
<div id="app">
    <!-- 插值表达式 -->
    {{msg}}
</div>
<!-- 1 导入 -->
<script src="vue.js"></script>
```

```javascript
// 3 创建 vue 构造函数 vm 为 mvvm 中的 viewmodel 层
let vm = new Vue({
    el: '#app', // 管理哪个视图
    data() {    // mvvm 中的 mode 数据层
        return {
            msg: 'hello Vue'
        }
    }
})
```

## vue 的指令

- v-cloak 解决页面的闪烁问题，需要和css一起使用
- v-html 用于将数据填充到标签中，可以解决页面闪烁，支持标签的数据，要谨慎使用
- v-text 也是用于将数据填充到标签中，也可以解决页面闪烁问题，但不支持标签的数据
- v-pre 显示原始信息
- v-once 给标签只绑定数据一次，后面数据发生了改变，标签的内容不会发生改变
- v-model 数据的双向绑定，用于表单；双向绑定就是视图改变影响数据改变，相反数据改变也会影响视图的变化
- v-bind:属性 简写(:属性) 单向数据绑定，也就是数据改变会影响视图变化，而视图变化则不会影响数据的改变
- v-on:事件名称 简写(@事件名称) 给标签绑定事件 如 @click 点击事件

逻辑指令

- v-if 通过创建和销毁元素达到元素的显示和隐藏
- v-show 通过属性 display:none 来控制元素的显示和隐藏

## vue 事件修饰符

- @事件名称.prevent 阻止事件默认行为
- @事件名称.stop 阻止冒泡

## vue 按键修饰符

格式: @事件名.按键名 如

```html
<div id="app">
    <!-- 按下 delete 键，清空 input 中的文本内容 -->
    <input type="text" v-model="uname" @keyup.delete="clearText">
</div>
<script src="vue.js"></script>
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                uname: ''
            }
        },
        methods: {
            clearText() {
                this.uname = '';
            }
        }
    })
</script>
```

## v-model 实现双向数据绑定的原理

```html
<div id="app">
    <input type="text" v-model="userName"/>
    <input type="text" :value="userName" @input="handler"/>
</div>
<script src="vue.js"></script>
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                userName: ''
            }
        },
        methods: {
            handler(event) {
                this.userName = event.target.value;
            }
        }
    })
</script>
```