# 配合使用redux-thunk
### 假设需求，我们值home页面需要加载用户列表
- 首先修改服务器， 这里主要是给几个假数据，在请求接口的时候使用
```js
// 1.在src下新建api目录
// 2. 在src/api目录下 新建server.js, 内容如下
const express = require('express')
const cors = require('cors')
const app = express()

// 处理跨域
app.use(cors({
  orgin: 'localhost:3000'
}))
// 定义用户列表
let users = [
  {id: 1, name: 'leo'},
  {id: 2, name: 'Jhon'}
]
// 获取用户接口
app.get('/api/users', function (req, res) {
  res.json(users)
})
app.listen(4000)

// 然后使用 nodemon 运行脚本， 浏览器使用localhost访问服务是否正常
```
#### 创建 需要的reducer
> 既然使用redux-thunk, 肯定是需要新建reducer和actions的，这里一步步的来创建
-  reducer
```js
// 1. src/store/reducers中新建home.js
// 2. 内容如下
import * as types from '../action-types'
// 定义初始化状态
let initState = {
    list: [], // 保存用户列表
}

export default function (state = initState, action) {
    switch (action.type) {
        case types.SET_HOME_LIST:
        
        return {list: action.payload}
    default:
        return state;
    }
}

// 然后在src/store/reducers/index.js 引入home，并何必该reducer

```
- actions
```js
// 1. 在src/store/actions中创建home.js
// 2. 在home.js 输入以下内容，异步获取数据
import * as types from '../action-types'
import axios from 'axios'
export default {
    getHomeList () {
        return function (dispatch, getState) {
          // 服务器地址， 自己看自己的
            return axios.get('http://localhost:4000/api/users').then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_HOME_LIST,
                payload: data
            }) 
        })
        }
    }
}
```
### 在home组件中使用该数据
> 上边完成了定义数据，模拟接口，获取数据，ruuder和对应的actions，接下来我们将数据在home页面展示出来
> 和客户端使用一样，用connect连接仓库
```js
// src/container/Home 组件修改如下
import React, {Component} from 'react';
import { connect } from 'react-redux'
import actions from '../../store/actions/home'

class Home extends Component {
    componentDidMount () {
      // 获取数据 在本地切换的时候需要异步加载数据
      this.props.getHomeList()
    }
    render () {
        return (<div className="row">
            <h1>Home</h1>
            <ul className="list-group">
                {this.props.list.map(item => <li key={item.id} className="list-group-item">{item.name}</li>)
                }
            </ul>
        </div>)
    }
}
// 连接仓库
Home = connect(
    state => state.home,
    actions
)(Home)

export default Home;

// 至此， 客户端异步加载数据完成，浏览器刷新页面即可
```
### 服务端异步加载数据
> 随然可以加载数据了，但是我们发现是我们本地以后发起了一个ajax请求，然后获取的数据，这个肯定不是我们想要的，
> 并服务器里直接返回来的更直接一些，而且还能减少请求， 代码看下便：
- home 组件新增属性
> 思路： 给home 组建新增一个属性(loadData)，赋值为一个function，我们在路由渲染的时候检测是否拥有此属性，如果有该属性，直接调用即可
> loadData =》 函数接受一个参数，就说store，等我们获取数据的时候方便存储到store中去
```js
import React, {Component} from 'react';
import { connect } from 'react-redux'
import actions from '../../store/actions/home'

class Home extends Component {
    componentDidMount () {
        // 获取数据 在本地切换的时候需要异步加载数据
        if (this.props.list.length === 0) {
            this.props.getHomeList()
        }
    }
    render () {
        return (<div className="row">
            <h1>Home</h1>
            <ul className="list-group">
                {this.props.list.map(item => <li key={item.id} className="list-group-item">{item.name}</li>)
                }
            </ul>
        </div>)
    }
}
Home = connect(
    state => state.home,
    actions
)(Home)

// 此方法是用来异步加载数据， 并且放到仓库中去
Home.loadData = function (store) {
    // dispatch的返回值就是action
    return store.dispatch(actions.getHomeList())
}
export default Home;
```

### 修改路由
> 修改路由，新增一个loadData属性，值为组建的loadData
> 执行路由渲染的时候会用到
```js
// src/routers.js 导出路由修改如下
export default [
    {
        path: '/',
        component: Home,
        key: 'home',
        exact: true,
        loadData: Home.loadData // 加载数据，如果有此配置项，那么则意味着需要加载异步数据
    },
    {
        path: '/counter',
        component: Counter,
        key: 'counter'
    }
]
```

### 修改渲染模板
> 
```js
// src/client/index.js 修改后如下
import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import routers from '../routes'
import Header from '../components/Header'
import { Provider } from 'react-redux' // 配合使用redux
import { getClientStore } from '../store'

// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(
<Provider store={getClientStore()}>
<BrowserRouter>
    <Fragment>
        <Header />
        <div className="container" style={{marginTop: 70}}>
            {routers.map( route => {
                return <Route {...route}/>
            })}
        </div>
    </Fragment>
</BrowserRouter>
</Provider>, document.getElementById('root'))
```
### 修改服务端脚本
> 这里主要处理在渲染页面的时候检查是否存在loadData属性，存在的话进行加载数据
```js
// src/server/render.js
import { StaticRouter } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import { getServerStore } from '../store'
import { Route, matchPath } from 'react-router-dom'

export default  function (ctx, next) {
    let context = {}
    let store = getServerStore()
    // 获取要渲染的组件
    // matchPath 是路由提供的工具方法， 可以用来判断路径和路由是否匹配
    let matchRoutes = routes.filter( route => (matchPath(ctx.req.url, route)))
    let promises = []
    // 遍历需要渲染的模板列表， 看是否需要异步加载数据
    matchRoutes.map(route => {
        // 判断是否需要加载异步数据
        if (route.loadData) { // 如果需要加载数据，调用其loadData方法
            promises.push(route.loadData(store))
        }
    })
    // 这里主要是可能会有多个promise，等全部处理完了在返回
    return Promise.all(promises).then(() => {
        // 创建仓库的时候， 仓库里已经有默认值
        console.log(store.getState())
        let html = renderToString(
            <Provider store={store}>
                <StaticRouter context={{}} location={ctx.req.url}>
                    <Fragment>
                        <Header />
                        <div className="container" style={{marginTop: 70}}>
                            {routes.map( route => ( <Route {...route}/>))}
                        </div>
                    </Fragment>
                </StaticRouter>
            </Provider>
        )
        
        ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                // 这里主要是保证服务器端的store和本地创建的store一样
                // 一定要放在client前边，因为会在client中调用
                // 同步服务器端的state对象
                window.content = {
                    state: ${JSON.stringify(store.getState())}
                }
            </script>
            <script src="/client.js"></script>
        </body>
        </html>
        `
    })
}
```
### 修改sore
> 这边主要是因为服务端没有dom，所以需要处理，我们首先件渲染哪里将store得知作为全局对象放在一个script中，这里引用
```js
import { createStore, applyMiddleware } from 'redux'
// import saga from 'redux-saga'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
export function getServerStore () {
    return createStore(
        reducers,
        applyMiddleware(thunk, logger)
    )
}


export function getClientStore () {
   // 在这里拿到我们之前挂载在window上的state， 然后作为初始值
    let initState = window.content.state
    return createStore(
        reducers,
        initState,
        applyMiddleware(thunk, logger)
    )
}
```

### 总结
> 以上时简单的redux-think的使用，可以看出来和客户端不一样的地方有，但是不多，就几个关键的点吗，学会的就好了