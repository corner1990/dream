# webpack4学习(一)

> 大家都很熟悉了。如Vue，react等都用他打包，为了提高司机的开车体验，一下介绍一些30迈的飙车技巧，老司机勿喷

### 依赖

- 标识项目依赖， `--save` 上线开发都需要

- `--save-dev` 开发依赖，只有开发时使用

### 安装

```javascript

npm install webpack webpack-cli -D
yarn add webpack webpack-cli -D

// 运行
npx webpack --mode development

```

### webpack 可以0配置

- 打包工具 优化代码 模块化

### npx (node 8.5以上)

- 临时安装可执行依赖包，不用全局安装，不用担心长期的污染。

- 可以执行依赖包中的命令，安装完成自动运行。

- 自动加载node_modules中依赖包，不用指定$PATH。

- 可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

### 配置npm执行文件

```javascript
// 在package.json 中添加如下代码
{
    "scripts": {
        "build": "webpack"
    }
}

// 我们就可以通过 如下命令进行打包
npm run build || yarn run build
```

### webpack配置

```javascript
// 简单配置和模块功能解释
let path = require('path')

module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.js',
        // 必须是绝对路径
        path: path.join(__dirname, 'dist')
    }, // 对象，输出
    module: {}, // 对象模块的处理，loader加载器
    plugins: [],// webpack对应的插件
    devServer: {}, // 开发服务配置
    mode: 'development' // 模式配置

}
// 通过以上配置，就可以使用命令npx webpack 打包文件了
```

### 多入口文件配置

> 多个入口文件是没有关系的，但是要打包到一起去，可以写成一个数组，实现多个文件打包成一个文件

```javascript
let path = require('path')
// 假设我们有index.js 和a.js 需要打包成两个脚本，只需要将入口改写成数组即可，
// 代码如下
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: ['./src/index.js', './src/a.js'], // 入口文件
    output: {
        filename: 'bundle.js',
        // 必须是绝对路径
        path: path.join(__dirname, 'dist')
    }, // 对象，输出
    module: {}, // 对象模块的处理，loader加载器
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],// webpack对应的插件
    devServer: {}, // 开发服务配置
    mode: 'development' // 模式配置
}
```

### 配置打包html

> HTML在的处理，大概有压缩，去注释，多页面, 需要依赖插件：`html-webpack-plugin`

```javascript
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: ['./src/index.js', './src/a.js'], // 入口文件
    output: {
        filename: 'bundle.[hash:8].js',
        // 必须是绝对路径
        path: path.join(__dirname, 'dist')
    }, // 对象，输出
    module: {}, // 对象模块的处理，loader加载器
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 用那个模板
            hash: true, // 为了防止缓存问题，添加一个MD5戳
            minify: {
                // collapseWhitespace: true, // 去除空格
                // removeAttributeQuotes: true, //
            }
        })
    ],// webpack对应的插件
    devServer: {}, // 开发服务配置
    mode: 'development' // 模式配置
}
```

### 配置清空不用的文件

> 依赖插件：`clean-webpack-plugin`, 配置如下

```javascript
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: ['./src/index.js', './src/a.js'], // 入口文件
    output: {
        filename: 'bundle.[hash:8].js',
        // 必须是绝对路径
        path: path.join(__dirname, 'dist')
    }, // 对象，输出
    module: {}, // 对象模块的处理，loader加载器
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 用那个模板
            hash: true, // 为了防止缓存问题，添加一个MD5戳
            minify: {
                // collapseWhitespace: true, // 去除空格
                // removeAttributeQuotes: true, //
            }
        }),
        //  清楚废弃文件配置
        new CleanWebpackPlugin(['dist'])
    ],// webpack对应的插件
    devServer: {}, // 开发服务配置
    mode: 'development' // 模式配置
}
```

### 多页面开发， 如何配置多页面

> 和多入口配置有些类似，我们需要创建多个`HtmlWebpackPlugin`对象，进行配置即可，
>
> chunks，配置文件引用

```javascript
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
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
    plugins: [
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
    ],// webpack对应的插件
    devServer: {}, // 开发服务配置
    mode: 'development' // 模式配置
}

```

### 配置开发服务器

> 嗯么么，谁都不喜欢改一次代码，重新刷新页面，那么`webpack-dev-server`来解救懒癌晚期的自己

```javascript
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


// 需要在package.json中的script中添加命令，
{
    "scripts": {
        "build": "webpack",
        "dev": "webpack-dev-server"
    }
}

```

### 配置处理css

> css 处理需要很多loader，我们挨个的来安装：`style-loader`,  `css-loader` , `less` , `less-loader`,  `node-sass`, ` sass-loader`, ` stylur-loader`

- 常规配置



```
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
    module: { // 对象模块的处理，loader加载器
        // 配置css处理器
        rules: [
            {test: /\.css/, use: ['style-loader','css-loader']},
            {test: /\.less/, use: ['style-loader','css-loader', 'less-loader']},
        ]
    }, 
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
        new CleanWebpackPlugin(['dist']),
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
```

- 抽离文件,link引用

```javascript
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
// 抽离文件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
            // 抽离文件单独配置
            {test: /\.css/, use: ExtractTextWebpackPlugin.extract({
                 use: ['css-loader']
             })},
             {test: /\.less/, use: ExtractTextWebpackPlugin.extract({
                 use:  ['css-loader', 'less-loader']
             })}
        ]
    }, 
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
```

- 打包多个css

```javascript
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')

// 打包多个cass文件的配置
let cssExtractTextWebpackPlugin = new ExtractTextWebpackPlugin('./css/css.css')
let lessExtractTextWebpackPlugin = new ExtractTextWebpackPlugin('./css/less.css')
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
            // {test: /\.css/, use: ExtractTextWebpackPlugin.extract({
            //     use: ['css-loader']
            // })},
            // {test: /\.less/, use: ExtractTextWebpackPlugin.extract({
            //     use:  ['css-loader', 'less-loader']
            // })},
            //打包多个文件配置
            {test: /\.css/, use: cssExtractTextWebpackPlugin.extract({
                use: ['css-loader']
            })},
            {test: /\.less/, use: lessExtractTextWebpackPlugin.extract({
                use:  ['css-loader', 'less-loader']
            })},
        ]
    }, 
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
        new CleanWebpackPlugin(['dist']),
        // 配置抽离文件
        // new ExtractTextWebpackPlugin('css/index.css')
        // 打包多个文件配置
        cssExtractTextWebpackPlugin,
        lessExtractTextWebpackPlugin
       
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
```

### 配置css自动添加前缀

> 安装模块 postcss-loader autoprefixer, 主要依赖这两个模块

```javascript

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
// 抽离文件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
            {test: /\.css/, use: ExtractTextWebpackPlugin.extract({
                use: ['css-loader', 'postcss-loader']
            })}
        ]
    }, 
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


// postcss.config.js 内容
module.exports = {
    plugins: [require('autoprefixer')]
}
```

### 优化之移除不需要的css

```javascript
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
```

### 总结

> 以上就是简单的配置和使用，接下来将继续秀出一些飙车技巧，好不好，会不会出车祸，都要看自己了