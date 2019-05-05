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
    },
    // 负责检测所有引入不得node的核心模块，并且通知webpack不需要将核心代码打入到server.js 文件中去
    externals: [nodeExternal()],
})