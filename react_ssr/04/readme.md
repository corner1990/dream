## 配置使用redux
- 安装redux
- 创建store
```jsx
// 1. 在src目录下创建store目录
// 2. 在store目录下创建index.js, actions-types.js actions 目录， reducers目录
import { createStore, applyMiddleware } from 'redux'
import saga from 'redux-saga'
import logger from 'redux-logger'
import reducers from './reducers'
// 因为服务端和客户端store不一样，所以分别创建，后期会看到代码
export function getServerStore () {
    return createStore(
        reducers,
        applyMiddleware(saga, logger)
    )
}


export function getClientStore () {
    return createStore(
        reducers,
        applyMiddleware(saga, logger)
    )
}

// 3. 创建actions-typeas
export const INCREMENT = 'INCREMENT'

// 4. 创建reducers, 使用index导出reducers， 单独定义每一个组建的reduces
// 5. src/store/reducers/counter.js
import * as types from '../action-types'

let initState = {
    number: 0
}

export default function (state = initState, action) {
    switch (action.type) {
        case types.INCREMENT:
        let {number} = state
        return {number: ++number}
    default:
        return state;
    }
}

// 6. src/store/reducers/index.js 中导出counter
import { combineReducers } from 'redux'
import counter from './counter'

let resucers = combineReducers({
    counter
})

export default resucers

// 7. 在src/store/reducers/actions目录中新建counter.js， 然后actions
import * as types from '../action-types'
export default {
    increment () {
        return {type: types.INCREMENT}
    }
}

```
### 页面中使用store
- client端
```jsx
import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import routers from '../routes'
import Header from '../components/Header'
import { Provider } from 'react-redux' // 配合使用redux
import { getClientStore } from '../store' // 导入store

// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(
<Provider store={getClientStore()}>
<BrowserRouter>
    <Fragment>
        <Header />
        <div className="container" style={{marginTop: 70}}>
            {routers}
        </div>
    </Fragment>
</BrowserRouter>
</Provider>, document.getElementById('root'))

```
- server端
> 因为server端代码比较多，首先在src/server目录下新建render.js, 然后抽离代码
```jsx
// src/server/index.js
const Koa = require('koa')
const _ = require('koa-route');
import render from './render'

let app = new Koa()
// 设置服务端静态目录
app.use(require('koa-static')('public'))
// 这里路径改为*， 不管哪个路径，都组走这里
app.use(_.get('*', render))

app.listen(3000, () => {
    console.log('server start at 3000')
})

// src/server/render.js
import { StaticRouter } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import { getServerStore } from '../store'

export default  function (ctx, next) {
    let context = {}
    let store = getServerStore()
    let html = renderToString(
        <Provider store={store}>
            <StaticRouter context={{}} location={ctx.req.url}>
                <Fragment>
                    <Header />
                    <div className="container" style={{marginTop: 70}}>
                        {routes}
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
        <script src="/client.js"></script>
    </body>
    </html>
    `
}
```
- counter中使用store
```jsx
// src/containers/Counter/index.js
import React from 'react'
import { connect } from "react-redux"
import actions from '../../store/actions/counter'

class Counter extends React.Component{
    state = {number: 0}
    render () {
        return (<div style={{textAlign: 'center'}}>
            <p>{this.props.number}</p>
            <button onClick={this.props.increment}>+</button>
        </div>)
    }
}
// 连接store
const WrapCounter = connect(
    state => state.counter,
    actions
)(Counter)
export default WrapCounter

```

### 完成，刷新页面看效果