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

## vue computed 计算属性

优点：计算属性具有缓存效果

下面来看下字符串反转这个例子

```html
<div id="app">
    {{reverseStr}}{{reverseStr}}{{reverseStr2()}}{{reverseStr2()}}
</div>
<script src="vue.js"></script>
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                msg: 'hello'
            }
        },
        // 这里使用方法来实现字符串反转，这个方法没执行一次就调用一次
        methods: {
            reverseStr2: function() {
                return this.msg.split('').reverse().join('');
            }
        },
        // 这是计算属性的节点，调用一次之后，如果里面的数据没有变化，那么会使用缓存
        computed: {
            reverseStr: function() {
                return this.msg.split('').reverse().join('');
            }
        }
    })
</script>
```

从上面的例子可看出，如果要实现多次某个功能的话，使用计算属性比使用方法好。因为计算属性具有缓存的效果

## vue 侦听器

绝大多数和计算属性一样的，但是如果用于出来异步请求或者开销比较大的就使用watch

```html
<div id="app">
    <input type="text" v-model="fristName" >
    <input type="text" v-model="lastName" >
    {{fullName}}
</div>
<script src="vue.js"></script>
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                fristName: '',
                lastName: '',
                fullName: ''
            }
        },
        // 侦听器 只能监听data 中数据的变化
        watch: {
            fristName: function() {
                this.fullName = this.fristName + this.lastName;
            },
            lastName() {
                this.fullName = this.fristName + this.lastName;
            }
        }
    })
</script>
```

## 过滤器 filter

```html
<div id="app">
    {{ info | upper }}
    <!-- 传递参数 -->
    {{ info | getSum('你好') }}
</div>
<script src="vue.js"></script>
<script>
    // 全局过滤器
    Vue.filter('upper', function(val) {
        return val.toUpperCase();
    })
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                info: 'china'
            }
        },
        // 局部过滤器
        filters: {
            getSum: function(val, str) {
                console.log(str);   // 你好
            }
        }
    })
</script>
```

# 组件 component

```html
<div id="app">
    <my-button></my-button>
</div>
<script src="vue.js"></script>
<script>
    // 定义全局组件
    Vue.component('my-button', {
        template: `<button @click="increase">普通按钮</button>`,
        data() {
            return {
                num: 0
            }
        },
        methods: {
            increase() {
                this.num++
            }
        }
    })

    new Vue({
        el: '#app'
    })
</script>
```

### 组件命名

组件命名方式分为两种

- 短横线命名  my=button
- 驼峰式命名  MyButton

如果是驼峰式命名，使用组件时，只能在字符串模板中使用，不能在普通标签模板中使用

而短横线命名的，可以在字符串模板中使用，也可以在普通标签模板中使用


```html
<div id="app">
    <my-button></my-button>
    <MyButton></MyButton>   <!-- 报错 -->
</div>
<script src="vue.js"></script>
<script>
    // 定义全局组件
    Vue.component('MyButton', {
        template: `
            <div>
                <button @click="increase">普通按钮</button>
                <MyButton></MyButton>
            </div>
        `,
        data() {
            return {
                num: 0
            }
        },
        methods: {
            increase() {
                this.num++
            }
        }
    })

    Vue.component('MyComp', {
        template: '<h1>MyComp</h1>'
    })

    new Vue({
        el: '#app'
    })
</script>
```

# 组件间的数据通信

通信分为两种

1. 父组件传递给子组件

```html
<div id="app">
    <my-button :info="info"></my-button>
</div>
<script src="vue.js"></script>
<script>
    // 定义全局组件
    Vue.component('my-button', {
        // 通过 props 接收
        props: ['info'],
        template: `
            <div>
                <button>子组件{{info}}</button>
            </div>
        `
    })
    // 根组件
    new Vue({
        el: '#app',
        data() {
            return {
                info: '父组件'
            }
        }
    })
</script>
```

2. 子组件传递给父组件

点击子组件按钮 使得父组件内容增大

```html
<div id="app">
    <div :style="{fontSize:fontSize+'px'}">父组件内容</div>
    <child @enlarge-text="enlarge"></child>
</div>
<script src="vue.js"></script>
<script>
    Vue.component('child', {
        template: `
            <div>
                <button @click="en">增大父组件内容字号</button>
            </div>
        `,
        methods: {
            en() {
                this.$emit('enlarge-text', 10);
            }
        }
    })

    new Vue({
        el: '#app',
        data() {
            return {
                fontSize: 12
            }
        },
        methods: {
            enlarge() {
                let arr = [...arguments]
                this.fontSize += arr[0];
            }
        }
    })
</script>
```

3. 兄弟组件间的通信

```html
<div id="app">
    <test1></test1>
    <test2></test2>
    <button @click="destory">销毁test1</button>
</div>
<script src="vue.js"></script>
<script>
    // 事件中心
    let vm = new Vue();
    Vue.component('test1', {
        data() {
            return {
                a: 0
            }
        },
        template: `
            <div>
                <p>test1 -- {{a}}</p>
                <p>
                    <button @click="handler">点击</button>
                </p>
            </div>
        `,
        methods: {
            handler() {
                vm.$emit('test2-event', 3);
            }
        },
        mounted(){
            vm.$on('test1-event', (val) => {
                this.a += val;
            })
        }
    });
    Vue.component('test2', {
        data() {
            return {
                a: 0
            }
        },
        template: `
            <div>
                <p>test2 -- {{a}}</p>
                <p>
                    <button @click="handler">点击</button>
                </p>
            </div>
        `,
        methods: {
            handler() {
                vm.$emit('test1-event', 2);
            }
        },
        mounted() {
            vm.$on('test2-event', (val) => {
                this.a += val;
            })
        }
    });
    new Vue({
        el: '#app',
        methods: {
            destory() {
                vm.$off('test2-event');
            }
        }
    })
</script>
```