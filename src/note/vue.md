# vue 学习

## Vue.js 介绍

Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)和 [Vue 生态系统支持的库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

### 安装 

- 兼容性  
> Vue.js 不支持 IE8 及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。 Vue.js 支持所有兼容 ECMAScript 5 的浏览器。  

- 独立版本 接下载并用 `<script>` 标签引入，Vue 会被注册为一个全局变量。重要提示：在开发时请用开发版本，遇到常见错误它会给出友好的警告。
- CDN   
>   开发环境不要用最小压缩版，不然就失去了错误提示和警告!
    + 推荐：unpkg, 会保持和 npm 发布的最新的版本一致。可以在 unpkg.com/vue/ 浏览 npm 包资源。
    + 也可以从 jsdelivr 或 cdnjs 获取，不过这两个服务版本更新可能略滞后。
- NPM
```
# 最新稳定版
$ npm install vue
```
>   在用 Vue.js 构建大型应用时推荐使用 NPM 安装， NPM 能很好地和诸如 Webpack 或 Browserify 模块打包器配合使用。 Vue.js 也提供配套工具来开发单文件组件。
- 独立构建和运行时构建
- 有两种构建方式，独立构建和运行构建。它们的区别在于前者包含模板编译器而后者不包含。
- 模板编译器的职责是将模板字符串编译为纯 JavaScript 的渲染函数。如果你想要在组件中使用 template 选项，你就需要编译器。\
- 独立构建包含模版编译其并支持template 选项。它依赖浏览器的接口存在，因此不能使用它来服务端渲染
- 运行构建不包含模板编译器，因此不支持 `template` 选项，只能用 `render` 选项，但即使使用运行时构建，在单文件组件中依然可以写模板，因为单文件组建的模版会在构建是预编译为 `render` 函数。运行时构建比独立构建要轻量30%，只有 17.14 Kb min+gzip大小。
- 默认 NPM 包导出的是运行是构建。
```
resolve : {
    alias :{
        'vue$' : 'vue/dist/vue.common.js'
    }
}
```
    
## 起步
- 页面直接通过标签引用vue
```
<script src="https://unpkg.com/vue/dist/vue.js"></script>
```

### 声明是渲染

> vue.js的核心是一个允许采用简介的模版语法来声明式的将数据渲染进DOM：

- dom 绑定数据

```
// html 结构
<div id="app">
    {{message}}
</div>

// js

var app = new Vue({
    el:'#app',
    data:{
        message: 'hello'
    }
    })
```

- dom元素绑定属性
```
// html 结构
<p class="title-small" v-bind:title="title">我是小标题 我有title</p>

//js 结构
var titleSmall = new Vue({
        el : '.title-small',
        data : {
            title: '哈哈，就知道你会看'
        }
    })
```

- 条件与循环 
>   通过条件判断控制元素 
```
/*
* 判断
 */
//html 结构 
<div id="show" v-if="show">你可以看到我</div>

//js 结构
var show = new Vue({
        el:'#show',
        data:{
            show: true
        }
    });

/*
* 循环
 */
//html 结构 
<ul class="list">
    <li class="item"  v-for="todo in todos">{{todo.text}}</li>
</ul>

//js 结构
var list = new Vue({
        el: '.list',
        data:{
            todos:[
                {text:'hello '},
                {text:'my name is vue'},
                {text:'nice metting you'}
            ]
        }
    });

//在控制台里，输入 list.todos.push({ text: '哈哈哈哈哈' })，你会发现列表中添加了一个新项。
```

- 绑定事件
以用 v-on 指令绑定一个事件监听器  

```  
//html
<button class="button" v-on:click="consoleText">{{message}}</button>

//js 
// 绑定事件
    var printText = new Vue({
        el:'.button',
        data:{
            message: 'click Me'
        },
        methods:{
            consoleText:function(){
                var $me = this;
                console.log($me.$el.innerHTML+new Date().getTime())
            }
        }
    })
//注意在 reverseMessage 方法中，我们更新了应用的状态，但没有触碰 DOM——所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注底层逻辑。
```

- v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。 
```
//html
<div class="bind-info">
    <p>{{info}}</p>
    <input type="text" v-model="info">
</div>

//js
// 数据双向绑定
    var bindInfo = new Vue({
        el : '.bind-info',
        data : {
            info : '你以为你以为的就是你以为的么'
        }
    });

```

- 自定义组建  
组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、自包含和通常可复用的组件构建大型应用。
```
// html
<ol class="ol-origin">
    <!-- 使用 v-bind 指令将待办项传到每一个重复的组件中 -->
    <origin v-for="key in list" v-bind:item="key"></origin>
</ol>
// 组件化构建
    Vue.component('origin',{
        props : ['item'],
        template : '<li>{{item.text}}</li>'
    })

//js 
    var originApp = new Vue({
        el : '.ol-origin',
        data:{
            list:[
                {text:'leo'},
                {text:'join'},
                {text:'jam'}
            ]
        }
    })
```

- 于自定义元素的关系  
    + web组建规范仍然处于草案阶段，并且尚无浏览器原生实现。vue组建支持所有的浏览器（IE9以及更高的版本），必要时可以包装于原生自定义元素之内
    + Vue 组建提供了一些重要功能，最突出的是跨组件数据流，自定时事件通信、构建工具集成。

## 模板语法   
Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。

- 插值： 数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值
- 双大括号会将数据解释为纯文本，而非 HTML 。为了输出真正的 HTML ，你需要使用 v-html 指令
- 属性：Mustache 不能在 HTML 属性中使用，应使用 v-bind 指令
- 使用javascript表达式
- 指令：指令（Directives）是带有 v- 前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式（除了 v-for，之后再讨论）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上。
- 参数：一些指令能接受一个“参数”，在指令后以冒号指明。
- 修饰符：修饰符（Modifiers）是以半句号.指明的特殊后缀，用于指出一个指令应该以特殊的方式绑定。

```
// 文本
<span>Message:{{msg}}</span>

// v-once 使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新
<span v-once>Message:{{msg}}</span>

// 纯html 被插入的内容都会被当做 HTML —— 数据绑定会被忽略
<div v-html="rawhtml"></div>

//注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。组件更适合担任 UI 重用与复合的基本单元。

//属性
<div v-bind:id="Id"></div>
//这对布尔值的属性也有效 —— 如果条件被求值为 false 的话该属性会被移除
<button v-bind:disabled="false">Button</button>

//javascript 表达式
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
//有个限制就是，每个绑定都只能包含单个表达式

//指令
<p v-if="seen">Now you see me</p>
//v-if 指令将根据表达式 seen 的值的真假来移除/插入 <p> 元素。


//参数
a v-bind:href="url"></a>
<a v-on:click="doSomething">

//修饰符
<form v-on:submit.prevent="onSubmit"></form>
//.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

```

### 过滤器
Vue.js 允许你自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：mustache 插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示

```
{{message | capitalize}}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
//Vue 2.x 中，过滤器只能在 mustache 绑定和 v-bind 表达式（从 2.1.0 开始支持）中使用,
在其他指令中实现更复杂的数据变换，使用计算属性。

//过滤器函数总接收表达式的值为第一个参数

new Vue({
    filters:{
        capitalize:function(val){
            if(!val) return '';
            val = val.toString();
            return value.charAt(0).toUpperCase() + val.slice(1)
        }
    }
})
//过滤器可以串联
{{message | filter1 | filter2}}
//过滤器可以接收参数
{{ message | filterA('arg1', arg2) }}new Vue({
    filters:{
        capitalize:function(val){
            if(!val) return '';
            val = val.toString();
            return value.charAt(0).toUpperCase() + val.slice(1)
        }
    }
})
//过滤器可以串联
{{message | filter1 | filter2}}

//过滤器可以接收参数
{{ message | filterA('arg1', arg2) }}
```

### 缩写
`v-` 前缀在模板中是作为一个标示特殊属性的明显标示。

- `v-bind` 缩写
- `v-on` 缩写
```
//完整语法
<a v-bind:href="url"></a>
//缩写语法
<a :href="url"></a>

//完整语法
<a v-on:click="click"></a>
//缩写语法
<!-- 有问题 后期解决 -->
<a @click="click"></a>
```

## 计算属性
    模板内的表达式是非常便利的。但他们实际上只用于简单的运算，在模板中放入太多的逻辑会让模板过重且难以维护。
### 基础例子
```
//html
<div id="wrap">
        <p>origin message:"{{message}}"</p>
        <p>Computed reversed message : "{{reversedMessage}}"</p>
    </div>
//js
var vm = new Vue({
            el : '#wrap',
            data:{
                message:'hello leo!'
            },
            computed:{
                //这里定义计算fn
                reversedMessage:function(){
                    return 666
                }
            }
        });
```

### 计算缓存 vs Methods
    可以通过调用表达式中的 method 来达到同样的效果
```
//html
<p>Reversed message: "{{ reversedMessage() }}"</p>

//js
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
>   可以将同一函数定义为一个 method 而不是一个计算属性。对于最终的结果，两种方式确实是相同的。不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

### Computed 属性 VS Watched
    Vue 确实提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：watch 属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的想法是使用 computed 属性而不是命令式的 watch 回调。 

```
//html 
<div id="demo">{{two}}</div>

//js
var watchInfo = new Vue({
            el:'#watch',
            data:{
                one:'one',
                two:'two',
                three:'one two'
            },
            watch:{
                one:function(val){
                    this.three = val + ' ' + this.two;
                },
                two:function(val){
                    this.two = this.one +' '+ val
                }
            }
        });

//使用computed实现
var computedInfo = new Vue({
        el:'#watch',
        data:{
            one:'one',
            two:'two',
        },
        computed:{
            three:function(){console.log(2222)
                return this.three = this.one+' '+this.two
            }
        }
    });
```