# node代理

### src/server/index.js 中配置代理
> 主要借用 httpProxy 插件实现
```js
const Koa = require('koa2')
const _ = require('koa-route');
const httpProxy = require('http-proxy-middleware');
import render from './render'
const k2c = require('koa2-connect');
const port = 4000
let app = new Koa()

// 代理插件配置
app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/api')) {
        await k2c(httpProxy({
        target: 'http://127.0.0.1:4001', 
        changeOrigin: true,
        secure: false,
        }
        ))(ctx,next);
    }
    await next()
});

// 设置服务端静态目录
app.use(require('koa-static')('public'))
// 这里路径改为*， 不管哪个路径，都组走这里
app.use(_.get('*', render))

app.listen(port, () => {
    console.log(`server start at ${port}`)
})
```

### 配置axios basepath
> 配置好以后我们就不用再添加host了，走默认配置
- 在src/client/下新建request.js,内容如下
```js
import axios from 'axios'
// 创建一个axios的实例， 配置baseURL的基准路径
export default axios.create({
  baseURL: '/'
})

```
### src/server/request.js 新建文件
> 这里是服务端的请求配置
```js
import axios from 'axios'
// 创建一个axios的实例， 配置baseURL的基准路径
// 服务器端访问的时候访问4001
export default (ctx) => axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    cookie: ctx.req.headers.cookie || '' // 从请求中拿到cookie
  }
})
```
### src/client/request.js 新建文件
> 这里是客户端的请求配置
```js
import axios from 'axios'
// 创建一个axios的实例， 配置baseURL的基准路径
export default axios.create({
  baseURL: '/'
})
```

### 修改src/store/index.js, 给redux参数
> 使用 withExtraArgument 给think传递额外的参数
> 服务端和客户端传入不同的请求对象
```js
import { createStore, applyMiddleware } from 'redux'
// import saga from 'redux-saga'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
import clientRequest from '../client/request'
import serverRequest from '../server/request'

// withExtraArgument 给redux-thunk传递自定义参数
export function getServerStore () {
    return createStore(
        reducers,
        applyMiddleware(thunk.withExtraArgument(serverRequest), logger)
    )
}

export function getClientStore () {
    let initState = window.content.state
    return createStore(
        reducers,
        initState,
        applyMiddleware(thunk.withExtraArgument(clientRequest), logger)
    )
}
```
### actions的修改
> 这里不在使用import引入的axios请求数据，而换成我们传递过来的request对象
```js
import * as types from '../action-types' 

export default {
    login ({user}) {
        return function (dispatch, getState, request) {
            return request.post('/api/login', {
                data: user
            }).then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_SESSION,
                payload: data.data
            }) 
        })
        }
    },
    logout () {
        return function (dispatch, getState, request) {
            return request.get('/api/logout').then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_SESSION,
                payload: data.data
            }) 
        })
        }
    },
    getUser () {
        return function (dispatch, getState, request) {
            return request.get('/api/user').then(res=>{
                let {data} = res
                dispatch({
                    type: types.SET_SESSION,
                    payload: data.data
                }) 
            })
        }
    }
}
```
### 总结
> 实现步骤如下：
- 使用httpProxy进行服务器的代理配置
- 修改服务端和客户端的request对象，设置basePath
- 将不同的请求对象传递给不同redcer
- 再actions中使用传递过来的request对象