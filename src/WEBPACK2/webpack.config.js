// let webpack = require('webpack')
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let isDev = process.env.NODE_ENV == 'development-test'
 // 配置环境更新
// module.exports = {
//     entry: {
//         index: './src/index.js',
//     },
//     output: {
//         filename: 'build.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.less$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader', 'less-loader' ],
//                     fallback: 'style-loader'
//                 })
//               },
//         ]
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './src/index.html',
//             hash: true,
//             chunks: ['index']
//         }),
//         new CleanWebpackPlugin('./dist'),
//         // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
//         new ExtractTextWebpackPlugin({
//             filename: 'css/index.css',
//             disable: isDev
//         })
//     ],
//     devServer: {
//         contentBase: './dist',
//         host: 'localhost',
//         port: 5000,
//         hot: true,
//         open: true
//     }
// }

// 配置环境变量 处理开发环境和生产环境
// module.exports = {
//     entry: {
//         index: './src/index.js',
//     },
//     output: {
//         filename: 'build.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.less$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader', 'less-loader' ],
//                     fallback: 'style-loader'
//                 })
//               },
//         ]
//     },
//     plugins: [
//         // 使用这个插件注入一个全局的名字
//         // 然后我们就可以在任何地方拿到__DEV__来做判断条件
//         new webpack.DefinePlugin({
//             __DEV__: isDev
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './src/index.html',
//             hash: true,
//             chunks: ['index']
//         }),
//         new CleanWebpackPlugin('./dist'),
//         // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
//         new ExtractTextWebpackPlugin({
//             filename: 'css/index.css',
//             disable: isDev
//         })
//     ],
//     devServer: {
//         contentBase: './dist',
//         host: 'localhost',
//         port: 5000,
//         hot: true,
//         open: true
//     }
// }

// webpack处理图片
// 项目组引用图片的方式：
    // 1.直接通过路径引用，相对HTML
    // 2.在js中引用
    // 3.在背景图中引用

// let webpack = require('webpack')
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let isDev = process.env.NODE_ENV == 'development-test'

// module.exports = {
//     entry: {
//         index: './src/index.js',
//     },
//     output: {
//         filename: 'build.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {// css 引入图片配置为相对路径,使用publicPath
//                 test: /\.less$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader', 'less-loader' ],
//                     fallback: 'style-loader',
//                     publicPath: '../' // 配置相对路径
//                 })
//             },
//             {
//                 test: /\.(png|gif|jpg)$/i,
//                 use: [
//                     {// js引入图片
//                         loader: 'url-loader',
//                         options: {
//                             limit: 5, // 超过5字节, 就会调用file-loader打包一个真实的文件
//                             outputPath: 'images/', // 图片输出路径
//                         }
//                     }
//                 ]
//             },
//             {// 配置html里引用图片
//                 test: /\.html$/i,
//                 use: 'html-withimg-loader'
//             }
//         ]
//     },
//     plugins: [
//         // 使用这个插件注入一个全局的名字
//         // 然后我们就可以在任何地方拿到__DEV__来做判断条件
//         new webpack.DefinePlugin({
//             __DEV__: isDev
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './src/index.html',
//             hash: true,
//             chunks: ['index']
//         }),
//         new CleanWebpackPlugin('./dist'),
//         // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
//         new ExtractTextWebpackPlugin({
//             filename: 'css/index.css',
//             disable: isDev
//         })
//     ],
//     devServer: {
//         contentBase: './dist',
//         host: 'localhost',
//         port: 5000,
//         hot: true,
//         open: true
//     }
// }


// js处理
// babel-core 核心包
// babel-loader 转化js
// babel-env 将es6转码为es5
// babel-preset-env 草案里的
// babel-preset-stage-0 // 编译高级语法
// babel-preset-react // 编译react

// let webpack = require('webpack')
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let isDev = process.env.NODE_ENV == 'development-test'

// module.exports = {
//     entry: {
//         index: './src/index.js',
//     },
//     output: {
//         filename: 'build.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx$/i,
//                 // 如果我们把所所有的包都编译，会导致文件体积很大，
//                 // 所以我们会使用exclude排除某个目录不被编译，include，指定引用那个目录
        
//                 exclude: /node_modules/,
//                 include: /src/,
//                 use: [
//                     {
//                         loader: 'babel-loader',
//                         // // 通常我们不会这么写，我们配置babel-loader以后，插件会自动查找根目录下的babel.lrc
//                         // options: {
//                         //     // 这里的顺序和css一样，从后到前
//                         //     preset: ['env', 'stage-0', 'react']
//                         // }
//                     }
//                 ]
//             },
//             {// css 引入图片配置为相对路径,使用publicPath
//                 test: /\.less$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader', 'less-loader' ],
//                     fallback: 'style-loader',
//                     publicPath: '../' // 配置相对路径
//                 })
//             },
//             {
//                 test: /\.(png|gif|jpg)$/i,
//                 use: [
//                     {// js引入图片
//                         loader: 'url-loader',
//                         options: {
//                             limit: 5, // 超过5字节, 就会调用file-loader打包一个真实的文件
//                             outputPath: 'images/', // 图片输出路径
//                         }
//                     }
//                 ]
//             },
//             {// 配置html里引用图片
//                 test: /\.html$/i,
//                 use: 'html-withimg-loader'
//             }
//         ]
//     },
//     plugins: [
//         // 使用这个插件注入一个全局的名字
//         // 然后我们就可以在任何地方拿到__DEV__来做判断条件
//         new webpack.DefinePlugin({
//             __DEV__: isDev
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './src/index.html',
//             hash: true,
//             chunks: ['index']
//         }),
//         // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
//         new ExtractTextWebpackPlugin({
//             filename: 'css/index.css',
//             disable: isDev
//         }),
//         new CleanWebpackPlugin('./dist')
//     ],
//     devServer: {
//         contentBase: './dist',
//         host: 'localhost',
//         port: 5000,
//         hot: true,
//         open: true
//     }
// }


// js 抽离，优化
// let webpack = require('webpack')
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let isDev = process.env.NODE_ENV == 'development-test'
// // 拷贝文件
// let CopyWebpackPlugin = require('copy-webpack-plugin')

// module.exports = {
//     entry: {
//         index: './src/index.js',
//     },
//     output: {
//         filename: 'build.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx$/i,
//                 // 如果我们把所所有的包都编译，会导致文件体积很大，
//                 // 所以我们会使用exclude排除某个目录不被编译，include，指定引用那个目录
        
//                 exclude: /node_modules/,
//                 include: /src/,
//                 use: [
//                     {
//                         loader: 'babel-loader',
//                         // // 通常我们不会这么写，我们配置babel-loader以后，插件会自动查找根目录下的babel.lrc
//                         // options: {
//                         //     // 这里的顺序和css一样，从后到前
//                         //     preset: ['env', 'stage-0', 'react']
//                         // }
//                     }
//                 ]
//             },
//             {// css 引入图片配置为相对路径,使用publicPath
//                 test: /\.less$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader', 'less-loader' ],
//                     fallback: 'style-loader',
//                     publicPath: '../' // 配置相对路径
//                 })
//             },
//             {
//                 test: /\.(png|gif|jpg)$/i,
//                 use: [
//                     {// js引入图片
//                         loader: 'url-loader',
//                         options: {
//                             limit: 5, // 超过5字节, 就会调用file-loader打包一个真实的文件
//                             outputPath: 'images/', // 图片输出路径
//                         }
//                     }
//                 ]
//             },
//             {// 配置html里引用图片
//                 test: /\.html$/i,
//                 use: 'html-withimg-loader'
//             }
//         ]
//     },
//     plugins: [
//         // 拷贝文件
//         new CopyWebpackPlugin([{
//             from: './src/1.jpg',
//             to: 'public/'
//         }]),
//         // 使用这个插件注入一个全局的名字
//         // 然后我们就可以在任何地方拿到__DEV__来做判断条件
//         new webpack.DefinePlugin({
//             __DEV__: isDev
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './src/index.html',
//             output: 'index.html',
//             hash: true,
//             chunks: ['index']
//         }),
//         // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
//         new ExtractTextWebpackPlugin({
//             filename: 'css/index.css',
//             disable: isDev
//         }),
//         new CleanWebpackPlugin('./dist')
//     ],
//     devServer: {
//         contentBase: './dist',
//         host: 'localhost',
//         port: 5000,
//         hot: true,
//         open: true
//     },
//     resolve: {
//         // 别名
//         alias: {
//             'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
//         },
//         // 省略后缀名
//         extensions: [' ', '.js', '.css', '.less'],
//         // 第三方库
//         modules: ['node_modules', 'lib']
//     },
//     mode: 'production'
// }



// // 设置全局变量
// let webpack = require('webpack')
// let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let isDev = process.env.NODE_ENV == 'development-test'
// // 拷贝文件
// let CopyWebpackPlugin = require('copy-webpack-plugin')

// module.exports = {
//     entry: {
//         index: './src/index.js',
//         test: './src/test.js',
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /jquery/,
//                 use: [
//                     {
//                         loader: 'expose-loader',
//                         options: '$'
//                     }
//                 ]
//             },
//             {
//                 test: /\.jsx$/i,
//                 // 如果我们把所所有的包都编译，会导致文件体积很大，
//                 // 所以我们会使用exclude排除某个目录不被编译，include，指定引用那个目录
//                 exclude: /node_modules/,
//                 include: /src/,
//                 use: 'babel-loader'
//             },
//             {// css 引入图片配置为相对路径,使用publicPath
//                 test: /\.less$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader', 'less-loader' ],
//                     fallback: 'style-loader',
//                     publicPath: '../' // 配置相对路径
//                 })
//             },
//             {
//                 test: /\.css$/i,
//                 use: ExtractTextWebpackPlugin.extract({
//                     use: [ 'css-loader'],
//                     fallback: 'style-loader',
//                     publicPath: '../' // 配置相对路径
//                 })
//             },
//             {
//                 test: /\.(png|gif|jpg)$/i,
//                 use: [
//                     {// js引入图片
//                         loader: 'url-loader',
//                         options: {
//                             limit: 5, // 超过5字节, 就会调用file-loader打包一个真实的文件
//                             outputPath: 'images/', // 图片输出路径
//                         }
//                     }
//                 ]
//             },
//             {// 配置html里引用图片
//                 test: /\.html$/i,
//                 use: 'html-withimg-loader'
//             }
//         ]
//     },
//     plugins: [
//         // 提供全局变量插件
//         new webpack.ProvidePlugin({
//             $: 'jquery'
//         }),
//         // 拷贝文件
//         new CopyWebpackPlugin([{
//             from: './src/1.jpg',
//             to: 'public/'
//         }]),
//         // 使用这个插件注入一个全局的名字
//         // 然后我们就可以在任何地方拿到__DEV__来做判断条件
//         new webpack.DefinePlugin({
//             __DEV__: isDev
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './src/index.html',
//             output: 'index.html',
//             hash: true,
//             chunks: ['index']
//         }),
//         new HtmlWebpackPlugin({
//             filename: 'test.html',
//             template: './src/test.html',
//             output: 'test.html',
//             hash: true,
//             chunks: ['test']
//         }),
//         // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
//         new ExtractTextWebpackPlugin({
//             filename: 'css/index.css',
//             disable: isDev
//         }),
//         new CleanWebpackPlugin('./dist')
//     ],
//     devServer: {
//         contentBase: './dist',
//         host: 'localhost',
//         port: 5000,
//         hot: true,
//         open: true
//     },
//     resolve: {
//         // 别名
//         alias: {
//             'bootstrap': path.resolve(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'),
//         },
//         // 省略后缀名
//         extensions: [' ', '.js', '.css', '.less'],
//         // 第三方库
//         modules: ['node_modules', 'lib']
//     },
//     mode: 'development'
// }



// 代码分割
let webpack = require('webpack')
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let isDev = process.env.NODE_ENV == 'development-test'
// 拷贝文件
let CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        test: './src/test.js',
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx$/i,
                // 如果我们把所所有的包都编译，会导致文件体积很大，
                // 所以我们会使用exclude排除某个目录不被编译，include，指定引用那个目录
                exclude: /node_modules/,
                include: /src/,
                use: 'babel-loader'
            },
            {// css 引入图片配置为相对路径,使用publicPath
                test: /\.less$/i,
                use: ExtractTextWebpackPlugin.extract({
                    use: [ 'css-loader', 'less-loader' ],
                    fallback: 'style-loader',
                    publicPath: '../' // 配置相对路径
                })
            },
            {
                test: /\.css$/i,
                use: ExtractTextWebpackPlugin.extract({
                    use: [ 'css-loader'],
                    fallback: 'style-loader',
                    publicPath: '../' // 配置相对路径
                })
            },
            {
                test: /\.(png|gif|jpg)$/i,
                use: [
                    {// js引入图片
                        loader: 'url-loader',
                        options: {
                            limit: 5, // 超过5字节, 就会调用file-loader打包一个真实的文件
                            outputPath: 'images/', // 图片输出路径
                        }
                    }
                ]
            },
            {// 配置html里引用图片
                test: /\.html$/i,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        // 提供全局变量插件
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // 拷贝文件
        new CopyWebpackPlugin([{
            from: './src/1.jpg',
            to: 'public/'
        }]),
        // 使用这个插件注入一个全局的名字
        // 然后我们就可以在任何地方拿到__DEV__来做判断条件
        new webpack.DefinePlugin({
            __DEV__: isDev
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            output: 'index.html',
            hash: true,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'test.html',
            template: './src/test.html',
            output: 'test.html',
            hash: true,
            chunks: ['test']
        }),
        // 配置抽离文件, 并将模式修改为变量,我们可以自己配置
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
            disable: isDev
        }),
        new CleanWebpackPlugin('./dist')
    ],
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 5000,
        hot: true,
        open: true
    },
    resolve: {
        // 别名
        alias: {
            'bootstrap': path.resolve(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'),
        },
        // 省略后缀名
        extensions: [' ', '.js', '.css', '.less'],
        // 第三方库
        modules: ['node_modules', 'lib']
    },
    mode: 'development'
}







