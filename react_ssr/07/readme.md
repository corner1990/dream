# node代理

- src/server/index.js 中配置代理
```js
const Koa = require('koa2')
const _ = require('koa-route');
const httpProxy = require('http-proxy-middleware');
import render from './render'
const k2c = require('koa2-connect');
const port = 4000
let app = new Koa()

app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/api')) {
        await k2c(httpProxy({
        target: 'http://127.0.0.1:4001', 
        changeOrigin: true,
        secure: false,
//         pathRewrite: {'^/api': ''}
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
- 在src/client/下新建request.js,内容如下
```js
import axios from 'axios'
// 创建一个axios的实例， 配置baseURL的基准路径
export default axios.create({
  baseURL: '/'
})

```
- src/server/request.js 新建文件，
```js
import axios from 'axios'
// 创建一个axios的实例， 配置baseURL的基准路径
// 服务器端访问的时候访问4001
export default axios.create({
  baseURL: 'http://localhost:4001'
})
```
- 修改src/store/index.js, 给redux参数，
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