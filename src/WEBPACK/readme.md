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


### npx 8.5以上
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
npm run build
yarn run build
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


// 多个入口文件是没有关系的，但是要打包到一起去，可以写成一个数组，实现多个文件打包成一个文件
let path = require('path')

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


/*
* 配置打包html
*/
// 多个入口文件是没有关系的，但是要打包到一起去，可以写成一个数组，实现多个文件打包成一个文件
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



/**
 * 配置清空不用的文件
 */

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


/**
 * 多页面开发， 如何配置多页面
 */
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