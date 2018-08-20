// 默认情况下就叫 webpack.config.js
// webpack是基于node的 用的语法是commonjs规范

// 默认导出一个对象
// module.exports = {
//     entry: '', // 入口文件
//     output: {}, // 对象，输出
//     module: {}, // 对象模块的处理，loader加载器
//     plugins: [],// webpack对应的插件
//     devServer: {}, // 开发服务配置
//     mode: 'development', // 模式配置
// }

// 多个入口文件是没有关系的，但是要打包到一起去，可以写成一个数组，实现多个文件打包成一个文件
// 配置打包处理html
// let path = require('path')
// module.exports = {
//     entry: ['./src/index.js', './src/a.js'], // 入口文件
//     output: {
//         filename: 'bundle.[hash:8].js',
//         // 必须是绝对路径
//         path: path.join(__dirname, 'dist')
//     }, // 对象，输出
//     module: {}, // 对象模块的处理，loader加载器
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './src/index.html', // 用那个模板
//             hash: true, // 为了防止缓存问题，添加一个MD5戳
//             minify: {
//                 // collapseWhitespace: true, // 去除空格
//                 // removeAttributeQuotes: true, //
//             }
//         })
//     ],// webpack对应的插件
//     devServer: {}, // 开发服务配置
//     mode: 'development' // 模式配置
// }

/**
 * 配置清空不用的文件
 */

// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// module.exports = {
//     entry: ['./src/index.js', './src/a.js'], // 入口文件
//     output: {
//         filename: 'bundle.[hash:8].js',
//         // 必须是绝对路径
//         path: path.join(__dirname, 'dist')
//     }, // 对象，输出
//     module: {}, // 对象模块的处理，loader加载器
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './src/index.html', // 用那个模板
//             hash: true, // 为了防止缓存问题，添加一个MD5戳
//             minify: {
//                 // collapseWhitespace: true, // 去除空格
//                 // removeAttributeQuotes: true, //
//             }
//         }),
//         //  清楚废弃文件配置
//         new CleanWebpackPlugin(['dist'])
//     ],// webpack对应的插件
//     devServer: {}, // 开发服务配置
//     mode: 'development' // 模式配置
// }

/**
 * 多页面开发， 如何配置多页面
 */

// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// module.exports = {
//     entry: { // 入口文件
//         index: './src/index.js',
//         a: './src/a.js'
//     }, 
//     output: {
//         filename: '[name].[hash:8].js',
//         // 必须是绝对路径
//         path: path.join(__dirname, 'dist')
//     }, // 对象，输出
//     module: {}, // 对象模块的处理，loader加载器
//     plugins: [
//         new HtmlWebpackPlugin({
//             filename: 'index.html', // 文件名
//             template: './src/index.html', // 用那个模板
//             hash: true, // 为了防止缓存问题，添加一个MD5戳
//             chunks: ['index'], //设置对应关系 即引用的文件
//             minify: {
//                 // collapseWhitespace: true, // 去除空格
//                 // removeAttributeQuotes: true, //
//             }
//         }),
//         new HtmlWebpackPlugin({
//             filename: 'a.html', // 文件名
//             template: './src/a.html', // 用那个模板
//             hash: true, // 为了防止缓存问题，添加一个MD5戳
//             chunks: ['a', 'index'], //设置对应关系 即引用的文件
//             minify: {
//                 // collapseWhitespace: true, // 去除空格
//                 // removeAttributeQuotes: true, //
//             }
//         }),
//         //  清楚废弃文件配置
//         new CleanWebpackPlugin(['dist'])
//     ],// webpack对应的插件
//     devServer: {}, // 开发服务配置
//     mode: 'development' // 模式配置
// }



/**
 * 配置开发服务器
 */
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
module.exports = {
    entry: { // 入口文件
        index: './src/index.js',
        a: './src/a.js'
    }, 
    output: {
        filename: '[name].[hash:8].js',
        // 必须是绝对路径
        path: path.join(__dirname, 'dist')
    }, // 对象，输出
    module: {}, // 对象模块的处理，loader加载器
    plugins: [ // webpack对应的插件
        //热模块替换插件
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件名
            template: './src/index.html', // 用那个模板
            hash: true, // 为了防止缓存问题，添加一个MD5戳
            chunks: ['index'], //设置对应关系 即引用的文件
            minify: {
                // collapseWhitespace: true, // 去除空格
                // removeAttributeQuotes: true, //
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'a.html', // 文件名
            template: './src/a.html', // 用那个模板
            hash: true, // 为了防止缓存问题，添加一个MD5戳
            chunks: ['a', 'index'], //设置对应关系 即引用的文件
            minify: {
                // collapseWhitespace: true, // 去除空格
                // removeAttributeQuotes: true, //
            }
        }),
        //  清楚废弃文件配置
        new CleanWebpackPlugin(['dist'])
       
    ],
    // 启动一个静态服务
    // 默认自动刷新，热更新
    devServer: {
        contentBase: path.join(__dirname, 'dist'),// 启动目录
        host: 'localhost', // 域名
        port: 5000, // 端口
        open: true, // 默认打开浏览器
        hot: true // 还需要配置一个插件，HotModuleReplacementPlugin使用
    }, // 开发服务配置
    mode: 'development' // 模式配置
}
