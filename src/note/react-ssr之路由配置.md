# react-ssr之路由配置

> 凡事都是现有1，再有2，然后有100...
>
> 我们处理好了事件绑定，那肯定还是需要路由配置的，话不多说，撸起来

### 新增路由文件

- 在src目录下新建router.js

```typescript
/**
* @desc 这里是最基本的路由配置
* 只有两个页面，一个home，一个couter
*/
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

- 在components目录里新增导航模块

> 页面是使用了bootstrap来做基本样式的

```typescript
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

> 新增好了文件，我们从别的页面引入该文件

### 引入新增文件

- 客户端引入router.js

```typescript
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

- 服务端引入router.js

```typescript
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



### 总结

> 简单的几步修改，就实现了路由处理。这边留了一个尾巴，后边再不，回顾一下实现过程。。。

- 第一步，新增基本路由文件配置
- 第二步，为了方便路由切换，写了一个简单的导航模块
- 第三部，在客户端和服务端引入router.js
- 刷新页面看结果...
- [完成代码传送门](https://github.com/corner1990/dream/tree/master/react_ssr/03)