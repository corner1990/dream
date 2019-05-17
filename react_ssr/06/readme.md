# 渲染多级路由
- 修改routes配置付下
```js
import Home from './containers/Home'
import Counter from './containers/Counter'
import App from './containers/App'

// 为了配合服务端渲染，这里需要修改为数组
export default [
    {
        path: '/',
        component: App,
        components: [
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
    }
]
```
- 安装依赖模块
> yarn react-router-config
> 这个路由专门处理多级路由
- 新建app.js 抽离路由渲染逻辑
```js
// 在src/containers 下新建App.js 文件
// 内容如下， Fragment 是从client里考本过来的
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import { renderRoutes, matchRoutes } from 'react-router-config'

class App extends Component{
  render () {
    // 拿到子路由
    let {route} = this.props
    return (
      <Fragment>
          <Header />
          <div className="container" style={{marginTop: 70}}>
              {renderRoutes(route.components)}
          </div>
      </Fragment>
    )
  }
}

export default App
```
- 修改client.js
```js
import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import routers from '../routes'
import Header from '../components/Header'
import { Provider } from 'react-redux' // 配合使用redux
import { getClientStore } from '../store'
import { renderRoutes, matchRoutes } from 'react-router-config'
// renderRouters 选人多级路由
// matchRoutes 实现路由匹配

// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(
<Provider store={getClientStore()}>
<BrowserRouter>
    {renderRoutes(routers)}
</BrowserRouter>
</Provider>, document.getElementById('root'))
```
- 修改render.js
```js
// src/server/render.js
// 修改后如下
import { StaticRouter } from 'react-router-dom'
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import routes from '../routes'
import { getServerStore } from '../store'
import { Route, matchPath } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// renderRouters 选人多级路由
// matchRoutes 实现路由匹配


export default  function (ctx, next) {
    let context = {}
    let store = getServerStore()
    
    // 获取要渲染的组件
    // matchPath 是路由提供的工具方法， 可以用来判断路径和路由是否匹配
    let matchRoute = matchRoutes(routes, ctx.req.url)
    let promises = []
    matchRoute.map(route => {
        // 判断是否需要加载异步数据
        if (route.loadData) {
            console.log('reoute', route)
            promises.push(route.loadData(store))
        }
    })
    
    return Promise.all(promises).then(() => {
        // 创建仓库的时候， 仓库里已经有默认值
        // console.log(store.getState())
        let html = renderToString(
            <Provider store={store}>
                <StaticRouter context={{}} location={ctx.req.url}>
                    {renderRoutes(routes)}
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