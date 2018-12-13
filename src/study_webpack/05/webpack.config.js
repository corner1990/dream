const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'boundle.js'
    },
    devServer: {
        inline: true, // 打包后在文件里注入一个websocket客户端
        hot: true, // 热更新
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,
        compress: true,
        host: 'localhost'
        
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname,'src'),
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
	        template: './src/index.html',
	        filename:'index.html',
        }),
        // 模块热更新
        new webpack.HotModuleReplacementPlugin(),
        // 用名称代替ID
        new webpack.NamedModulesPlugin(),
    ]

}