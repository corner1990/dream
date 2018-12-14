# webpack优化学习

### libraryTarget 和 library

当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们

- `output.libraryTarget` 配置以何种方式导出库
- `output.library` 配置导出库的名称 output.libraryTarget 是字符串的枚举类型，支持以下配置

### var (默认)

编写的库将通过`var`被赋值给通过`library`指定名称的变量。

####  index.js

```js
module.exports =  {
    add(a,b) {
        return a+b;
    }
}
```

#### bundle.js

```js
var calculator=(function (modules) {}({})
```

#### index.html

```js
    <script src="bundle.js"></script>
    <script>
        let ret = calculator.add(1,2);
        console.log(ret);
    </script>
```

### commonjs

编写的库将通过 CommonJS 规范导出。

#### 导出方式

```js
exports["calculator"] = (function (modules) {}({})
```

#### 使用方式

```js
require('npm-name')['calculator'].add(1,2);
```

> npm-name是指模块发布到 Npm 代码仓库时的名称

### commonjs2

编写的库将通过 CommonJS 规范导出。

#### 导出方式

```js
module.exports = (function (modules) {}({})
```

#### 使用方式

```js
require('npm-name').add();
```

> 在 output.libraryTarget 为 commonjs2 时，配置 output.library 将没有意义。

### this

编写的库将通过 this 被赋值给通过 library 指定的名称，输出和使用的代码如下：

#### 导出方式

```js
this["calculator"]= (function (modules) {}({})
```

#### 使用方式

```js
this.calculator.add();
```

### window

编写的库将通过 window 被赋值给通过 library 指定的名称，即把库挂载到 window 上，输出和使用的代码如下：

#### 导出方式

```js
window["calculator"]= (function (modules) {}({})
```

#### 使用方式

```js
window.calculator.add();
```

### global

编写的库将通过 global 被赋值给通过 library 指定的名称，即把库挂载到 global 上，输出和使用的代码如下：

#### 导出方式

```js
global["calculator"]= (function (modules) {}({})
```

#### 使用方式

```js
global.calculator.add();
```

## DLL

`.dll`为后缀的文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据

- 把基础模块独立出来打包到单独的动态连接库里
- 当需要导入的模块在动态连接库里的时候，模块不能再次被打包，而是去动态连接库里获取
- [dll-plugin](https://webpack.js.org/plugins/dll-plugin/)

###  定义Dll

- DllPlugin插件： 用于打包出一个个动态连接库
- DllReferencePlugin: 在配置文件中引入DllPlugin插件打包好的动态连接库

```js
const path=require('path');
const DllPlugin=require('webpack/lib/DllPlugin');
module.exports={
    entry: {
        react:['react','react-dom']
    },// 把 React 相关模块的放到一个单独的动态链接库
    output: {
        path: path.resolve(__dirname,'dist'),// 输出的文件都放到 dist 目录下
        filename: '[name].dll.js',//输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
        library: '_dll_[name]',//存放动态链接库的全局变量名称,例如对应 react 来说就是 _dll_react
    },
    plugins: [
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            // 例如 react.manifest.json 中就有 "name": "_dll_react"
            name: '_dll_[name]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}
webpack --config webpack.dll.config.js --mode development
```

### 使用动态链接库文件

```js
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
plugins: [
  new DllReferencePlugin({
    manifest:require('./dist/react.manifest.json')
  })
]
webpack --config webpack.config.js --mode development
```

### html中使用

```html
<script src="react.dll.js"></script>
<script src="bundle.js"></script>
```

 ### HappyPack

- 构建需要解析和处理文件,文件读写和计算密集型的操作太多后速度会很慢
- Node.js 之上的 Webpack 是单线程模型
- [happypack](https://github.com/amireh/happypack) 就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

```js
npm i happypack@next -D
const HappyPack = require('happypack');
    rules: [
    {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel'],
        exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
        test: /\.css$/,
        // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
        use: ['happypack/loader?id=css']
    }
],
plugins: [
    new Happypack({
        //ID是标识符的意思，ID用来代理当前的happypack是用来处理一类特定的文件的
        id: 'js',
        use: [{
            loader: 'babel-loader',
            //options=query都是向插件传递参数的
            options: {
                presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
                plugins: [
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose": true }],
                ]
            }
        }]
    }),
    new Happypack({
        //ID是标识符的意思，ID用来代理当前的happypack是用来处理一类特定的文件的
        id: 'css',
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        threads: 4,//你要开启多少个子进程去处理这一类型的文件
        verbose: true//是否要输出详细的日志 verbose
    })
]
```

### CDN

CDN 又叫内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度。

![cnd](https://laod.cn/wp-content/uploads/2016/06/cnd.gif)

- HTML文件不缓存，放在自己的服务器上，关闭自己服务器的缓存，静态资源的URL变成指向CDN服务器的地址
- 静态的JavaScript、CSS、图片等文件开启CDN和缓存，并且文件名带上HASH值
- 为了并行加载不阻塞，把不同的静态资源分配到不同的CDN服务器上

### 使用缓存

- 由于 CDN 服务一般都会给资源开启很长时间的缓存，例如用户从 CDN 上获取到了 index.html 这个文件后， 即使之后的发布操作把 index.html 文件给重新覆盖了，但是用户在很长一段时间内还是运行的之前的版本，这会新的导致发布不能立即生效 解决办法
- 针对 HTML 文件：不开启缓存，把 HTML 放到自己的服务器上，而不是 CDN 服务上，同时关闭自己服务器上的缓存。自己的服务器只提供 HTML 文件和数据接口。
- 针对静态的 JavaScript、CSS、图片等文件：开启 CDN 和缓存，上传到 CDN 服务上去，同时给每个文件名带上由文件内容算出的 Hash 值
- 带上 Hash 值的原因是文件名会随着文件内容而变化，只要文件发生变化其对应的 URL 就会变化，它就会被重新下载，无论缓存时间有多长。
- 启用CDN之后 相对路径，都变成了绝对的指向 CDN 服务的 URL 地址

### 域名限制

- 同一时刻针对同一个域名的资源并行请求是有限制
- 可以把这些静态资源分散到不同的 CDN 服务上去
- 多个域名后会增加域名解析时间
- 可以通过在 HTML HEAD 标签中 加入`<link rel="dns-prefetch" href="">`去预解析域名，以降低域名解析带来的延迟

### 接入CDN

要给网站接入 CDN，需要把网页的静态资源上传到 CDN 服务上去，在服务这些静态资源的时候需要通过 CDN 服务提供的 URL 地址去访问

```diff
    output: {
        path: path.resolve(__dirname, 'dist'),
+        filename: '[name]_[hash:8].js',
+        publicPath: 'http://img.qiniu.cn'
    },
```

## Tree Shaking

`Tree Shaking` 可以用来剔除`JavaScript`中用不上的死代码。它依赖静态的`ES6`模块化语法，例如通过`import`和`export`导入导出。

### 普通情况

calc.js

```js
export function add(a,b){
   return a + b;
}
export function minus(a,b){
   return a - b;
}
```

index.js

```js
import {add} from './calc';
add(1,2)
```

calc.js

```js
export function add(a,b){
   return a + b;
}
```

由于只用到了 calc.js 中的 add，所以剩下的都被 Tree Shaking 当作死代码给剔除了

### 不要编译ES6模块

- 要让 Tree Shaking 正常工作的前提是交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法的
- 对于 `module.export` Webpack 无法分析出哪些代码可以剔除
- `"modules": false` 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法。

```diff
    use:[{
        loader: 'babel-loader',
            options: {
+                presets:[['@babel/preset-env',{modules: false }],'@babel/preset-react']
        }
    }]
```

###  显示未使用的导出实例

```js
npx webpack --display-used-exports
```

###  剔除用不上的代码

- Webpack只是分析出了哪些函数用上了哪些没用上，要剔除用不上的代码还得经过`UglifyJS`去处理

```js
webpack --display-used-exports --optimize-minimize
```

### 启用压缩

```js
optimization: {
      minimizer: [
             new UglifyJsPlugin({
                 cache: true,//启动缓存
                 parallel: true,//启动并行压缩
                 //如果为true的话，可以获得sourcemap
                 sourceMap: true // set to true if you want JS source maps
             }),
             //压缩css资源的
             new OptimizeCSSAssetsPlugin({})
         ]
}
```

###  深度分析

- [webpack-deep-scope-analysis-plugin](https://github.com/vincentdchan/webpack-deep-scope-analysis-plugin)

![webpack-deep-scope-analysis-plugin](http://img.zhufengpeixun.cn/webpack-deep-scope-analysis-plugin.jpeg)

```js
import _ from 'lodash-es';
//加法
function isArray(value) {
    return _.isArray(value);
}
//减法
function add(a, b) {
    return a + b + _.isArray([]);
}
export {
    isArray,
    add
}
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

module.export = {
  plugins: [
    ...,
    new WebpackDeepScopeAnalysisPlugin(),
  ],
}
```

## 提取公共代码

###  为什么需要提取公共代码

大网站有多个页面，每个页面由于采用相同技术栈和样式代码，会包含很多公共代码，如果都包含进来会有问题

- 相同的资源被重复的加载，浪费用户的流量和服务器的成本；
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。 如果能把公共代码抽离成单独文件进行加载能进行优化，可以减少网络传输流量，降低服务器成本

###  如何提取

- 基础类库，方便长期缓存
- 页面之间的公用代码
- 各个页面单独生成文件
- [common-chunk-and-vendor-chunk](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)

### 提取公共代码

pageA.js

```js
import utility1 from './utility1';
import utility2 from './utility2';
import $ from 'jquery';
```

pageB.js

```js
import utility2 from './utility1';
import utility3 from './utility2';
import $ from 'jquery';
```

pageC.js

```js
import utility2 from './utility3';
import utility3 from './utility1';
import $ from 'jquery';
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB',
        pageC: './src/pageC'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 不同页面之间的公用模块
                commons: {
                    chunks: "initial",
                    minChunks: 2,//最小重复使用的次数
                    minSize: 0 //最小提取字节数
                },
                // 第三方模块
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                }
            }
        }
    }

    plugins:[
       new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageA.html',
            chunks: ['pageA'],
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageB.html',
            chunks: ['pageB'],
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageC.html',
            chunks: ['pageC'],
            minify: {
                removeAttributeQuotes: true
            }
        })
    ]
```

## 开启 Scope Hoisting

Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能。

- 代码体积更小，因为函数申明语句会产生大量代码
- 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小

###  插件配置

```js
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
```

### 代码

hello.js

```js
export default 'Hello';
```

index.js

```js
import str from './hello.js';
console.log(str);
```

输出的结果main.js

```js
var n = name = "zfpx";
  console.log(n)
```

> 函数由两个变成了一个，hello.js 中定义的内容被直接注入到了 main.js 中

## 动态导入和懒加载

用户当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载 在给单页应用做按需加载优化时，一般采用以下原则：

- 对网站功能进行划分，每一类一个chunk
- 对于首次打开页面需要的功能直接加载，尽快展示给用户
- 某些依赖大量代码的功能点可以按需加载
- 被分割出去的代码需要一个按需加载的时机

###  动态导入和懒加载

####  handler.js

```js
module.exports=function () {
    alert('你点我啦!');
}
```

#### index.js

```js
document.querySelector('#clickBtn').addEventListener('mouseover',() => {
    import('./handler').then(clickMe => {
        window.clickMe=clickMe.default;
    });
});
```

#### html

```html
<div id="clickBtn" onclick="clickMe()">弹框</div>
```

### react-router4 路由懒加载

#### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom';
import Bundle from './Bundle';
let LazyAbout=(props) => (<Bundle {...props} load={()=>import('./About')}/>)
let Home=() => <div>Home</div>
ReactDOM.render(
<Router>
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={LazyAbout}/>
    </div>
</Router>,document.getElementById('root'));
```

####  Bundle

```js
import React from 'react';
export default class Bundle extends React.Component{
    state={Mod: null}
    componentWillMount() {
        this.props.load().then(mod=>this.setState({Mod: mod.default? mod.default:mod}));
    }
    render() {
        let Mod=this.state.Mod;
        return Mod&&<Mod  {...this.props}/>;
    }
}
```

####  About

```js
import React from 'react';
export default props => <div>About</div>
```

