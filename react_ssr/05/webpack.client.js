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