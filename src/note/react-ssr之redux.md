# react-ssr之redux

> 作为全家桶之一，必须要有啊。必须的必啊

- 安装redux(这个我就不说了，自己去npm找)

### 仓库的基本配置

- 在src目录下新增store目录
- 在store目录下创建index.js, actions-types.js actions 目录， reducers目录
- `src/store/index.js`

```typescript
import { createStore, applyMiddleware } from 'redux'
import saga from 'redux-saga'
import logger from 'redux-logger'
import reducers from './reducers'
// 注意：因为服务端和客户端store不一样，所以分别创建，后期会看到代码不同处理
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

// 
```



- 创建actions-typeas

```typescript
export const INCREMENT = 'INCREMENT'
```

- 创建reducers, 使用index导出reducers， 单独定义每一个组建的reduces

```typescript
//src/store/reducers/index.js 中导出counter
import { combineReducers } from 'redux'
import counter from './counter'

let resucers = combineReducers({
    counter
})

export default resucers
```

- 新增`src/store/reducers/counter.js`文件，内容如下

```typescript
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

```

- 在src/store/reducers/actions目录中新建counter.js， 然后定义actions

```typescript
// 计数器的基本配置
import * as types from '../action-types'
export default {
    increment () {
        return {type: types.INCREMENT}
    }
}
```



### 引入store

- 客户端的配置

```typescript
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

- 服务端的配置

```typescript
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

```typescript
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



### 总结

> 上边是实现redux的基本过程，这里再总结一下思路

1. 在src目录下创建store目录

2. 在store目录下创建index.js, actions-types.js actions 目录， reducers目录
3. 创建actions-typeas
4. 创建reducers, 使用index导出reducers， 单独定义每一个组建的reduces
5. 在服务端和客户端配置redux的基本代码
6. counter中使用store

[完整代码](https://github.com/corner1990/dream/tree/master/react_ssr/04)