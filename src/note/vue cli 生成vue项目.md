

### vue cli 生成vue项目

> Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，
>
> 官网  [vue cli ]([介绍 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/))

### 安装vue cli

```bash
npm install -g @vue/cli-service-global
```

### 创建项目

```bash
# 创建项目
vue create project name
# 选择默认选项 完成安装

# 进入项目目录
cd project name

# 启动项目
npm run serve or yarn serve
```

### 路由配置

> 在scr目录下创建如下目录

1. router 目录 存放路由文件
2. pages 目录，存放所有的页面组件

#### 新建页面文件

> 在pages 目录内新增 a.vue, b.vue 两个文件， 内容如下

```vue
// pages/a.vue 内容
<template>
  <div class="a"> page a</div>
</template>
// pages/b.vue 内容
<template>
  <div class="b"> page b</div>
</template>
```

#### 创建路由

1. 在router目录下新建demo.js， 页面配置路由
2. 在router目录下新建index.js， // 创建router实力， 导出路由

```javascript
// 1. router/demo.js 内容 导出一个数组 数组item为路由配置信息
export default [
  {
    path: '/a',
    name: 'Apage',
    meta: {
      title: 'a',
      scroll: true,  // 判断是否记录滚动位置
      keepAlive: true // 是否不销毁组件
    },
    component: ACompnenent
  },
  {
    path: '/b',
    name: 'bpage',
    component: BComponent,
    
  }
]

// 2. router/index.js 内容
import Vue from 'vue'
import VueRouter from 'vue-router'
import demo from './demo'
Vue.use(VueRouter)

// 所有路由信息
const routes = [
  ...demo,
]

// 创建路由对象
const router =  new VueRouter({
  mode: 'history',
  routes
})

// 守卫函数
router.beforeEach((to, from, next) => {
  // title 预加载 鉴权
  let isLogin = false
  if (!isLogin) next({ name: 'Login' })
  else next()
})
// 跳转后的处理逻辑
// 通常是处理 滚动位置 
router.afterEach((to) => {
  if (to.meta.scroll) {
    // 处理跳转到指定滚动位置
  }
  // ...
})
// 导出路由
export default router
```

#### 使用vue路由

1. 在mainjs注入路由
2. 在app.vue 文件使用`<router-view />`标签渲染路由模板

```javascript
// src/main.js 文件内容
import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由文件


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router // 注入路由
}).$mount('#app')


```

```vue
// src/app.vue 内容
<template>
  <div id="app">
    <div class="link-wrap">
      &emsp;&emsp;
      <router-link to="/a">to page a</router-link>
      &emsp;&emsp;
      <router-link to="/b">to page b</router-link>
    </div>
   <!-- 渲染路由模板 -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  computed: {
    route() {
      return this.$route
    }
  },
  mounted() {
  }
}
</script>

<style>
</style>

```

### 使用vant UI组件库

- 安装组件

- 引入组件库

  ```bash
  # 安装组件
  npm i vant -S
  or
  yarn add vant
  
  ```

- 导入组件

  ```javascript
  // 1.在src目录下新建vant.js
  
  // 2. src/vant.js 内容如下 
  // 全量引入组件 
  import Vue from 'vue';
  import Vant from 'vant';
  import 'vant/lib/index.css'; // 样式文件需要单独引入
  
  Vue.use(Vant);
  
  
  // 按需引入组件
  import Vue from 'vue'
  import 'vant/lib/index.css' // 样式文件需要单独引入
  // 按需UI组件
  import {
    Button
  } from 'vant'
  
  
  // 使用组件 按需UI组件
  Vue.use(Button)
  
  // 注意 全量引入组件 和按需引入组件只需要一种即可，需要两个都写
  ```

- 在src/main.js 引入vant.js

  ```javascript
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  import './vant' // 引入vant 组件
  
  Vue.config.productionTip = false
  
  new Vue({
    render: h => h(App),
    router
  }).$mount('#app')
  
  ```

- 在页面中使用vant组件查看效果



### 创建store

1. 在src目录下新建store目录

2. 在src/store目录下新建`index.js`, `a.js`, `b.js`, 

   ```javascript
   // src/store/ a.js b.js 分别为两个module，内容如下
   // a.js 内容
   const moduleA = {
     namespaced: true, // 这个参数一定要有，否则vuex不会做模块话处理
     state: {
       count: 0
     },
     mutations: {
       // 计数器自增
       increasement(state) {
         state.count++
       }
     },
     actions: {}
   }
   
   export default moduleA
   
   // b.js 内容
   const moduleB = {
     namespaced: true,
     state: {
       count: 0
     },
     mutations: {
       // 计数器自增
       increasement(state) {
         state.count++
       }
     },
     actions: {}
   }
   
   export default moduleB
   
   
   ```

3. 创建store实例

   ```javascript
   // 在src/store/index.js 内创建并导出store实例
   import Vue from 'vue'
   import Vuex from 'vuex'
   import createPersistedState from 'vuex-persistedstate'
   import a from './a'
   import b from './b'
   import * as types from './types'
   
   Vue.use(Vuex)
   // 模块化state
   const modules = {// modules内的state只能通过this.$store.state[modules name] 访问
     a,
     b
   }
   //  创建store
   const store = new Vuex.Store({
     state: { // 该state对象属性可以通过this.$store.state 直接访问
       count1: 0,
       globalInfo: {
         user: {
           name: 'leo',
           age: 11
         }
       }
     },
     mutations: { // 只能同步
       increment (state) {
         state.count1++
       },
       increment1 (state, payload) {
         state.count1 += payload
       },
       
     },
     
     modules,
     plugins: [
       createPersistedState({
         key: '$vuex'
       })
     ],
   })
   
   
   // 导出 store
   export default store
   ```

4. 注入store,

   ```javascript
   import Vue from 'vue'
   import App from './App.vue'
   import router from './router'
   import store from './store' // 引入store实例
   import './vant'
   Vue.config.productionTip = false
   
   new Vue({
     render: h => h(App),
     router,
     store // 注入store
   }).$mount('#app')
   
   ```

5. 页面中使用state中的数据

   ```vue
   <template>
     <div class="home-wrap">
       home page
       <br />
       <br />
       <br />
       <div class="count-wrap">count: {{ aInfo.count }}</div>
       <br />
       <van-button type="primary" @click="increasement">增加</van-button>
       <br /><br />
       <div class="count-wrap">count1: {{ count1 }}</div>
       <br />
       <van-button type="primary" @click="add">增加</van-button>
       &emsp; &emsp;
       <van-button type="primary" @click="syncAdd">异步增加</van-button>
     </div>
   </template>
   
   <script>
   // 引入api
   import {
     mapState, // 返回一个计算属性，需要配合computed使用
     mapMutations, // 返回对应mapMtation，直接挂在到this实例上访问
   } from 'vuex'
   
   export default{
     name: 'Home',
     data() {
       return {}
     },
     computed: {
       // a module  不同的module 可以引入多次
       ...mapState({
         aInfo: state => state.a
       }),
       // b moudle 不同的module 可以引入多次
       ...mapState({
         bInfo: state => state.b
       }),
       // 也可以直接引入，使用state中的key值，挂在到当前实例
       ...mapState(['count1']),
       
     },
     methods: {
       // a module  不同的module 可以引入多次
       ...mapMutations('a', {
         increasement: 'increasement'
       }),
       // 直接调用
       add() {
         this.$store.commit('increment', 'add')
       },
       // 异步出发 actions
       syncAdd() {
         console.log('add')
         this.$store.dispatch('syncIncrement', '调用时穿的参数')
       }
     },
     mounted() {
       console.log('home', this)
     }
   }
   </script>
   
   ```

   

   





