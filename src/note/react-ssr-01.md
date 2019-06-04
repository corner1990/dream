# react服务端渲染

### 说明
> 近期一直想看看react项目ssr到底是怎么做的，最近一直在学习，研究如何从零到一的实现react的服务端渲染，并将整个过程的代码整理出来，作为参考
- react项目重构
- 项目中使用了koa和express，主要是学习，如果项目中可以使用koa或者express

### 初始化一个项目
> 这里主要是实现基本的模拟代码，项目中我们通常会在原来的项目基础上做处理
- 新建一个目录
- `npm init `

### 创建基本目录
> 这里主要是新建基本的文件和目录，方便后期在内部处理代码
- 新建src目录
- 新建webpack.config.js 
### 基本的解构代码
- src目录下新建containers目录
- src/containers目录下新建Header， Home两个目录
- 在Header， Home两个目录下新建index.js, 内容如下
```js
// Header/index.js
import React from 'react'

function Header () {
    return (<header>
        header
    </header>)
}
export default Header

// Home/indes.js
import React, {Component} from 'react';

function Home () {
    return (<h1>Home</h1>)
}
export default Home;
```

### 入口文件处理
> 这里不是我们我们原来的样子 ，因为服务端渲染， 所以我们需要写一个服务器，
> 其次就是服务端返回的是字符串，我们急需要借助renderToString方法讲react组件转换为字符串, 然后返回
- src目录下新建server目录， 并在Server目录内部新建index.js文件爱你
-  src/server/index.js 中书写如下内容

```js
let Koa = require('koa')
import React from 'react'
import Home from '../containers/Home/index'
import Header from '../containers/Header/index'
import {renderToString} from 'react-dom/server'
// renderToString：react-dom 方法，讲react组件渲染为字符串
let app = new Koa()

app.use(async function (ctx, next) {
    // 转义组件为字符串
    let html = renderToString(<Home />)
    let head = renderToString(<Header />)
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
        ${head}
        ${html}
    </body>
    </html>
    `
})

app.listen(3000)
```
### 配置打包环境 (webpack)
> 这里的配置就是webpack的基本配置，没有什么好说的
```js
// package.json 中的配置
"scripts": {
    "dev": "npm-run-all --parallel dev:**", 
    "dev:build": "webpack --config webpack.config.js --watch", // 运行webpack ，--watch 文件改动自动打包
    "dev:start": "nodemon build/server.js" // 配置自动刷新
  },

// webpack.config.js 中的配置
const path = require('path')
const nodeExternal = require('webpack-node-externals')
module.exports = {
    target: 'node', // 告诉webpack 打包的是node环境的
    mode: 'development', 
    // entry: './src/server/index.js', // 提示
    entry: ['babel-polyfill', './src/server/index.js'],
    output: {
        filename: 'server.js',
        path: path.join(__dirname,'build')
    },
    // 负责检测所有引入不得node的核心模块，并且通知webpack不需要将核心代码打入到server.js 文件中去
    externals: [nodeExternal()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    }
}
```
### 配置自动刷新
> 依赖nodemon实现自动刷新
```js
"scripts": {
    "dev": "npm-run-all --parallel dev:**", 
    "dev:build": "webpack --config webpack.config.js --watch", 
    "dev:start": "nodemon build/server.js" // 配置自动刷新
  },
```
- 配置批量运行命令 (依赖 npm-run-all)
```js

"scripts": {
    "dev": "npm-run-all --parallel dev:**", // 配置批量运行命令
    "dev:build": "webpack --config webpack.config.js --watch",
    "dev:start": "nodemon build/server.js"
  },
```