# 服务端渲染
- 配置打包环境 (webpack)
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
- 配置自动刷新 (依赖nodemon)
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