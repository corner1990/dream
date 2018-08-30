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
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let webpack = require('webpack')
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
//     plugins: [ // webpack对应的插件
//         //热模块替换插件
//         new webpack.HotModuleReplacementPlugin(),
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
       
//     ],
//     // 启动一个静态服务
//     // 默认自动刷新，热更新
//     devServer: {
//         contentBase: path.join(__dirname, 'dist'),// 启动目录
//         host: 'localhost', // 域名
//         port: 5000, // 端口
//         open: true, // 默认打开浏览器
//         hot: true // 还需要配置一个插件，HotModuleReplacementPlugin使用
//     }, // 开发服务配置
//     mode: 'development' // 模式配置
// }

/**
 * @description 配置处理css
 * 安装： style-loader css-loader less less-loader node-sass sass-loader stylur-loader
 */

// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let webpack = require('webpack')
// // 抽离文件
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

// // 打包多个cass文件的配置
// let cssExtractTextWebpackPlugin = new ExtractTextWebpackPlugin('./css/css.css')
// let lessExtractTextWebpackPlugin = new ExtractTextWebpackPlugin('./css/less.css')
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
//     module: { // 对象模块的处理，loader加载器
//         // 配置css处理器
//         // 抽离出样式文件，以link标签的形式引入
//         // extract-text-webpack-plugin@next
//         // min-css-extract-plugin
//         rules: [
//             // {test: /\.css/, use: ['style-loader','css-loader']},
//             // {test: /\.less/, use: ['style-loader','css-loader', 'less-loader']},
//             // 抽离文件单独配置
//             // {test: /\.css/, use: ExtractTextWebpackPlugin.extract({
//             //     use: ['css-loader']
//             // })},
//             // {test: /\.less/, use: ExtractTextWebpackPlugin.extract({
//             //     use:  ['css-loader', 'less-loader']
//             // })},
//             //打包多个文件配置
//             {test: /\.css/, use: cssExtractTextWebpackPlugin.extract({
//                 use: ['css-loader']
//             })},
//             {test: /\.less/, use: lessExtractTextWebpackPlugin.extract({
//                 use:  ['css-loader', 'less-loader']
//             })},
//         ]
//     }, 
//     plugins: [ // webpack对应的插件
//         //热模块替换插件
//         new webpack.HotModuleReplacementPlugin(),
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
//         new CleanWebpackPlugin(['dist']),
//         // 配置抽离文件
//         // new ExtractTextWebpackPlugin('css/index.css')
//         // 打包多个文件配置
//         cssExtractTextWebpackPlugin,
//         lessExtractTextWebpackPlugin
       
//     ],
//     // 启动一个静态服务
//     // 默认自动刷新，热更新
//     devServer: {
//         contentBase: path.join(__dirname, 'dist'),// 启动目录
//         host: 'localhost', // 域名
//         port: 5000, // 端口
//         open: true, // 默认打开浏览器
//         hot: true // 还需要配置一个插件，HotModuleReplacementPlugin使用
//     }, // 开发服务配置
//     mode: 'development' // 模式配置
// }



// 配置css自动添加前缀
// 安装模块 postcss-loader autoprefixer
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let webpack = require('webpack')
// // 抽离文件
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
//     module: { // 对象模块的处理，loader加载器
//         // 配置css处理器
//         // 抽离出样式文件，以link标签的形式引入
//         // extract-text-webpack-plugin@next
//         // min-css-extract-plugin
//         rules: [
//             // {test: /\.css/, use: ['style-loader','css-loader']},
//             // {test: /\.less/, use: ['style-loader','css-loader', 'less-loader']},
//             // 抽离文件单独配置
//             // postcss-loader 配合文件使用，需要在更目录创建文件postcss.config.js
//             {test: /\.css/, use: ExtractTextWebpackPlugin.extract({
//                 use: ['css-loader', 'postcss-loader']
//             })}
//         ]
//     }, 
//     plugins: [ // webpack对应的插件
//         //热模块替换插件
//         new webpack.HotModuleReplacementPlugin(),
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
//         new CleanWebpackPlugin(['dist']),
//         // 配置抽离文件
//         new ExtractTextWebpackPlugin('css/index.css')
       
//     ],
//     // 启动一个静态服务
//     // 默认自动刷新，热更新
//     devServer: {
//         contentBase: path.join(__dirname, 'dist'),// 启动目录
//         host: 'localhost', // 域名
//         port: 5000, // 端口
//         open: true, // 默认打开浏览器
//         hot: true // 还需要配置一个插件，HotModuleReplacementPlugin使用
//     }, // 开发服务配置
//     mode: 'development' // 模式配置
// }


// css 优化之移除不需要的css
// 安装模块： purifycss-webpack purify-css
// 以上两个模块需要同时安装
// 安装glob模块，搜索文件使用
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
// 抽离文件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let PurifyWebpack = require('purifycss-webpack')
let glob = require('glob')

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
    module: { // 对象模块的处理，loader加载器
        // 配置css处理器
        // 抽离出样式文件，以link标签的形式引入
        // extract-text-webpack-plugin@next
        // min-css-extract-plugin
        rules: [
            // {test: /\.css/, use: ['style-loader','css-loader']},
            // {test: /\.less/, use: ['style-loader','css-loader', 'less-loader']},
            // 抽离文件单独配置
            // postcss-loader 配合文件使用，需要在更目录创建文件postcss.config.js
            {
                test: /\.css/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                })
            }
        ]
    }, 
    plugins: [ // webpack对应的插件
        // 去除冗余css
        new PurifyWebpack({
            // 查找src下的所有的HTML
            paths: glob.sync(path.join(__dirname, './src/*.html')),

        }),
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
        new CleanWebpackPlugin(['dist']),
        // 配置抽离文件
        new ExtractTextWebpackPlugin('css/index.css')
       
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