# 配置使用路由
- 新增路由文件, 并配置内部文件
```jsx
// src/routes.js

import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Counter from './containers/Counter'

export default (
    <Fragment>
        <Route path="/" exact component={Home}></Route>
        <Route path="/counter" exact component={Counter}></Route>
    </Fragment>
)
```
- 新增导航模块
```jsx
// src/components/Header/index.js
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render () {
        return (
            <nav className={"navbar navbar-inverse navbar-fixed-top"}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">SSR</a>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/counter">计数器</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
```

- 修改客户端代码
```jsx
// src/client/index.js 
import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import routers from '../routes'
import Header from '../components/Header' // 增加header
// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
// 这里多一层包裹，不然会报错
ReactDOM.hydrate(<BrowserRouter>
    <Fragment>
        <Header />
        <div className="container" style={{marginTop: 70}}>
            {routers}
        </div>
    </Fragment>
</BrowserRouter>, document.getElementById('root'))
```

- 修改服务端配置
```jsx
// src/server/index.js
const Koa = require('koa')
const _ = require('koa-route');
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import routes from '../routes'
import { StaticRouter } from 'react-router-dom'
import Header from '../components/Header'

let app = new Koa()

app.use(require('koa-static')('public'))
// 这里路径改为*， 不管哪个路径，都组走这里
app.use(_.get('*', async function (ctx, next) {
    // 转义组件为字符串
    // 保持和客户端代码一致
    let html = renderToString(
        <StaticRouter context={{}} location={ctx.req.url}>
            <Fragment>
                <Header />
                <div className="container" style={{marginTop: 70}}>
                    {routes}
                </div>
            </Fragment>
        </StaticRouter>
    )
    // 下边引入bootstrap的css
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
        <script src="/client.js"></script>
    </body>
    </html>
    `
}))

app.listen(3000)
```