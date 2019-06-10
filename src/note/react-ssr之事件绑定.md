# react-ssr之事件绑定

> 没有处理事件的页面是不完整...
>
> 这里使用一个计数器的demo来展示如何实现事件绑定….
>
> 主要需要两个步骤，抽离配置，页面引入我们写好的计数器脚本

### 抽离webpack配置文件，单独打包server端和client端

-  webpack.base.js 基础配置

```typescript
module.exports = {
    mode: 'development',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        ]
    }
}
```



- webapck.client.js 客户端打包配置

```typescript
const path = require('path')
const nodeExternal = require('webpack-node-externals')
const merge = require('webpack-merge')
const base = require('./webpack.base')
module.exports = merge(base, {
    // entry: './src/server/index.js', // 提示
    entry: './src/client/index.js',
    output: {
        filename: 'client.js',
        path: path.join(__dirname,'public')
    }
})
```



-  webpack.server.js 服务端打包配置

```typescript
const path = require('path')
const nodeExternal = require('webpack-node-externals')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
    target: 'node', // 告诉webpack 打包的是node环境的
    // entry: './src/server/index.js', // 提示
    entry: ['babel-polyfill', './src/server/index.js'],
    output: {
        filename: 'server.js',
        path: path.join(__dirname,'build')
    },
    // 负责检测所有引入不得node的核心模块，并且通知webpack不需要将核心代码打入到server.js 文件中去
    externals: [nodeExternal()],
})

```



### 页面引入计数器

 1.引入上边写好的脚本(打包后，输出到public)

 2.配置服务器静态目录(client端打包后文件存放的路径)

### 文件修改

- `src/containers/Counter/index.js` 文件修改如下

```typescript
import React from 'react'
/**
@desc 这是一个简单的计数器demo
*/
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

> 因为服务端返回的是HTML文本，所以需要在客户端写一个一模一样的代码。用来处理事件绑定

- `src/client/index.js` 页面修改如下：

> ReactDOM.hydrate:是核心，通过他讲本地js和服务端返回的代码进行合并，而不是替换，从而实现事件绑定 

```typescript
import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../containers/Counter'

ReactDOM.hydrate(<Counter />, document.getElementById('root'))
```

- `src/server/index.js` 页面修改

```typescript
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

### 总结

> 至此，完成了事件绑定的基本写法，顺便整理一下实现步骤

- 为了方便处理，我们抽离了webpack的配置
- 写一个简单的计数器
- server端引入计数器，然后客户端(因为返回的内容是HTML，dom事件没法绑定...)
- 修改client脚本，使用`ReactDOM.hydrate`实现事件绑定