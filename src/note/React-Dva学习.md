# React-Dva学习

### 安装

- 安装脚手架

```powershell
npm install dva-cli -g
or
yarn global add dva-cli
```

- 创建新应用

> 安装完cli工具以后就可以在命令行访问到，
>
> 为了方便学习，我们可以使用命令创建

```
// 创建一个标准项目
 dva new my-app
// 创建一个学习的 简答的demo
dva new my-app --demo

```

- 启动项目

> 进入项目目录，执行启动命令，启动开发服务器

```
// 启动项目
npm start 0r yarn start

// 等到看到以下信息输出，就可以启动项目了
Compiled successfully!
The app is running at:
 http://localhost:8000/
```

### 使用antd

- 安装antd

> 通过 npm 安装 `antd` 和 `babel-plugin-import` 。`babel-plugin-import` 是用来按需加载 antd 的脚本和样式的，

```
npm install antd babel-plugin-import --save
Or 
yarn add antd babel-plugin-import --save
```

- 编辑 `.webpackrc`，使 `babel-plugin-import` 插件生效。

```javascript
{
+  "extraBabelPlugins": [
+    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
+  ]
}
```

> 注：dva-cli 基于 roadhog 实现 build 和 dev，更多 `.webpackrc` 的配置详见 [roadhog#配置](https://github.com/sorrycc/roadhog#%E9%85%8D%E7%BD%AE)

### 定义路由

- 新建文件，创建路由表

```javascript
// 1.在src下新建pages目录
// 2.新建在src/pages新一个js文件，命名名为Login.js
// 3.src/pages/Login.js 文件内容如下

import React from 'react';

const Login = (props) => (
  <h2>Login</h2>
);

export default Login;
```

- 添加路由信息到路由表

```javascript
// routers.js 新增一下代码
// 引入模板
import Login from './pages/Login'

// 添加Route
<Route path="/login" exact component={Login} />
```

> 现在就可以在浏览器查看路径了

### 定义model

- model是一个对象，提供了注册model方法`app.model({})`,取消注册方法`app.unmodel(namespace)`,  需要特别注意的是： 取消 model 注册，清理 reducers, effects 和 subscriptions。subscription 如果没有返回 unlisten 函数，使用 `app.unmodel` 会给予警告
- namespace：，字符串，命名空间，我们在对该model进行CRUD的时候通过这个空间来方法具体的数据或者actions
- reducers： 一个对象， 里边方react-redux里的dispatch函数，我们出发同步的action，然后经过reducers里对应的函数处理，然后更新store
- effects: 对象，副作用。当我们在开发的时候如果有异步的操作，会先出发effects里的函数，然后拿到结果以后再出发reducers里的同步函数对store进行CRUD
- subscriptions：对象， 订阅 在这里我们监听url变化，当切换到todos的时候，调用后台接口异步渲染数据

- 下边是一个简单的model

```javascript
// model demo
app.model({
  // 命名空间，它就是之前combineReducers里边的key值
  namespace: 'counter',
  state: { // 状态
    number: 0
  },
  // 处理器， 这里可以直接定义子reducer
  reducers: {
    // 这个函数会在派发一个动作 'counter/add'的时候触发add函数
    add (state, action) {
      return {number: state.number + 1}
    },
    minus (state, action) {
      return { number: state.number - 1 }
    }
  }
})
```

### 定义组件组件

> dva里所有的组件都是函数组件,只有在特殊情况下，如需要声明周期的组件才会使用类组件
>
> 定义一个简单的组件如下：

```javascript
function Counter({ number, dispatch}) {
  return (
    <div>
      <p>{number}</p>
      <button onClick={()=> dispatch({type: 'counter/add'})} >add</button>
      {/* <button onClick={add} >add</button> */}
    </div>
  )
```

### actions派发

```javascript
let actions = {
  add () {
    return {
      type: 'counter/add'
    }
  }, 
  mins () {
    return {
      type: 'counter/minus'
    }
  }
}

// 使用connect连接
let mapStatetoProps = state => state.counter
let ConnectCounter = connect(
  mapStatetoProps
)(Counter)
```

### 配置动态加载组件

```javascript
 import dynamic from 'dva/dynamic';

const UserPageComponent = dynamic({
  app,
  models: () => [
    import('./models/users'),
  ],
  component: () => import('./routes/UserPage'),
});
```

### 来一个栗子

- 使用dva初始化一个demo项目，在这个demo的基础上写一个技术的小练习

- 初始化项目， `dva new counter --demo `
- 进入`counter/src/index.js`
- 开始改写

```javascript
import React, {Component} from 'react';
import dva, { connect } from 'dva'

let app = dva()
// combineReducers({
//   counter: counter
// })
 // state 合成后的样子
//  {
//    counter: {number: 1}
//  }

// 配置模型
app.model({
  // 命名空间，它就是之前combineReducers里边的key值
  namespace: 'counter',
  state: { // 状态
    number: 0
  },
  // 处理器， 这里可以直接定义子reducer
  reducers: {
    // 这个函数会在派发一个动作 'counter/add'的时候触发add函数
    add (state, action) {
      return {number: state.number + 1}
    },
    minus (state, action) {
      return { number: state.number - 1 }
    }
  }
})


// 使用action派发
let actions = {
  add () {
    return {type: 'counter/add'}
  }, 
  mins () {
    return {type: 'counter/minus'}
  }
}

// 定义组件， dva里所有的组件都是函数组件 
// function Counter({ number, dispatch}) { // 之前写法
//   return (
//     <div>
//       <p>{number}</p>
//       <button onClick={()=> dispatch({type: 'counter/add'})} >add</button>
//       {/* <button onClick={add} >add</button> */}
//     </div>
//   )
// }
function Counter({ number, add }) {// dva的写法
  return (
    <div style={{border: '1px solid #06c', width: 200, height: 3 00, margin: '100px auto 0', padding: 20}}>
      <p>{number}</p>
      <button onClick={add} >add</button>
    </div>
  )
}
// 使用connect连接
let mapStatetoProps = state => state.counter
// let ConnectCounter = connect(
//   mapStatetoProps
// )(Counter)

// 使用actions派发动作
let ConnectCounter = connect(
  mapStatetoProps,
  actions
)(Counter)
// 定义路由
app.router((history, app) => (
  <div>
    <ConnectCounter />
  </div>
))
// 启动程序
app.start('#root')
```

- 启动项目，就能看到效果了

### 总结

> 以上是一个简单的dva的使用介绍，以及一个计数器的小栗子，后边再写一个todoList，用来深入的理解dva的使用和数据流