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