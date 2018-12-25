/* const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HelloPlugin = require('./src/plugins/helloplugin')
const EmitPlugin = require('./src/plugins/EmitPlugin')
const FilesPlugin = require('./src/plugins/FilesPlugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: join(__dirname, 'dist'),
        filename: 'boundle.js'
    },
    // 配置查找loaders的目录
    resolveLoader: {
        modules: [
            'node_modules',
            join(__dirname, 'src', 'loaders')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: {
                    loader: join(__dirname, 'src', 'loaders', 'log-loader.js'),
                    options: {
                        name: 'logger'
                    }
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'less-loader']
            },
            // {
            //     test: /\.html/,
            //     loader: 'html-layout-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/home.html',
            filename: 'home.html'
        }),
        // new HelloPlugin({name: 'hello plugin'})
        new EmitPlugin(),
        new FilesPlugin()
    ]
}
 */

 /* 
 inline plugin配置
 */
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HelloPlugin = require('./src/plugins/helloplugin')
const InlinePlugin = require('./src/plugins/InlinePlugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: join(__dirname, 'dist'),
        filename: 'boundle.js'
    },
    // 配置查找loaders的目录
    resolveLoader: {
        modules: [
            'node_modules',
            join(__dirname, 'src', 'loaders')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: {
                    loader: join(__dirname, 'src', 'loaders', 'log-loader.js'),
                    options: {
                        name: 'logger'
                    }
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new InlinePlugin()
    ]
}
