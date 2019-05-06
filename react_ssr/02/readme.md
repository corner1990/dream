### 配置绑定事件
- 写一个计数器
```jsx
// src/containers/Counter/index.js
import React from 'react'

class Counter extends React.Component{
    state = {
        number: 0
    }
    render () {
        return (<div style={{textAlign: 'center'}}>
            <p>{this.state.number}</p>
            <button onClick={() => {
                let {number} = this.state
                number++;
                
                this.setState({number})
            }}>+</button>
        </div>)
    }
}

export default Counter
```
- 写一个完全一样的页面 用来绑定事件
```jsx
// src/client/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../containers/Counter'
// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(<Counter />, document.getElementById('root'))
```
- 抽离webpack配置文件，单独打包server端和client端
    + webpack.base.js 基础配置
    + webapck.client.js 客户端打包配置
    + webpack.server.js 服务端打包配置

- 页面引入计数器
> 1.引入上边写好的脚本(打包后，输出到public)
> 2.配置服务器静态目录(client端打包后文件存放的路径)
```jsx
// src/server/index.js
const Koa = require('koa')
const path = require('path')
const _ = require('koa-route');
import React from 'react'
import Counter from '../containers/Counter/index'
import {renderToString} from 'react-dom/server'

let app = new Koa()
app.use(require('koa-static')('public')) // 设置静态目录 方便浏览器访问

app.use(_.get('/', async function (ctx, next) {
    // 转义组件为字符串
    let counter = renderToString(<Counter />)
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="root">${counter}</div>
        <script src="/client.js"></script><!-- 引入脚本 -->
    </body>
    </html>
    `
}))

app.listen(3000)
```