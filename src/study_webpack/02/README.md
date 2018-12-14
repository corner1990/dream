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

### 源码

####  bundle.js

```js
(function (modules) { // webpack的启动函数
  // The module cache 模块的缓存
  var installedModules = {};

  // The require function webpack自己实现的在浏览器里能够执行的require方法
  function __webpack_require__(moduleId) {

    // Check if module is in cache 看看此模块是否在缓存中
    if (installedModules[moduleId]) {
      //如果缓存有的话，则取它缓存的模块的对象的exports属性并返回
      return installedModules[moduleId].exports;

    }
    // Create a new module (and put it into the cache)
    //创建一个新的模块，并且放置到缓存
    var module = installedModules[moduleId] = {
      i: moduleId,//i=identify模块的标识符，模块的ID
      l: false,//l= loaded 是否已经加载完成
      exports: {} //此模块导出对象
    };

    // Execute the module function 执行模块函数,传入参数 
    //1 module.exports=this 2.module 模块对象  3.module.exports 模块的导出对象 4.require方法
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块标识 为已加载 loaded=true
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;
  }


  // expose the modules object (__webpack_modules__) 把modules挂载到require的m属性
  __webpack_require__.m = modules;

  // expose the module cache把模块的缓存挂载到require的c属性上 
  __webpack_require__.c = installedModules;

 /**
   let obj={};
    let age='age';
    function getter() {
        return 9;
    }
    Object.defineProperty(obj,age,{enumerable: true,get: getter});
    console.log(obj.age)
  */
  // define getter function for harmony exports
  //定义(define)一个getter方法 1导出对象 2名称 3 getter
  __webpack_require__.d = function (exports, name, getter) {
      //判断对象有没有某个属性 exports.hasOwnProperty(name)
    if (!__webpack_require__.o(exports, name)) {
      //给exports对象定义name属性，值是可枚举的，get
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
      //   exports[name]
    }
  };
 /**
  * 对象的Symbol.toStringTag属性，指向一个方法
  * 在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型
  * 也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串
  * ({[Symbol.toStringTag]: 'Foo'}.toString())  "[object Foo]"
  */
  // define __esModule on exports 在导出对象上定义__esModule属性
  //如果此exports对象__esModule属性为true的话，表示这是一个es6的模块
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      //如果是支持es6的Symbol属性的话，那么定义属性 exports[Symbol.toStringTag] ='Module'
      // exports.toString = "[object Module]"
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    // exports['__esModule'] = true;
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // getDefaultExport function for compatibility with non-harmony modules
  // 获取默认导出函数为了兼容性 参数就是module对象
  __webpack_require__.n = function (module) {//hello
    //先拿到一个getter,如果是es模块，返回模块的default,否则返回自身
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    //var getter =    function() { return 'hello'; };
    //给getter上定义一个a属性，值为getter
    //该模块的a属性 = 模块本身
    __webpack_require__.d(getter, 'a', getter);
    // get a(){return 'a'}   obj['a']
    // getter['a'] = getter;
    //(function() { return 'hello'; })['a'] =  (function() { return 'hello'; })
    return getter;

  };

  // Object.prototype.hasOwnProperty.call
  //判断对象有没有某个属性
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__ webpack的公开路径  webpack publicPath
  __webpack_require__.p = "";


  // Load entry module and return exports
  // 加载入口模块并且返回导出对象 s就是入口标识符
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
  //modules是一个对象，有属性和值，属性就是此模块的ID，其实就是相对于根目录的相对路径
  ({
    "./src/base.js":
      (function (module, exports) {
        eval("module.exports = 'hello';\n\n//# sourceURL=webpack:///./src/base.js?");
      }),
    "./src/main.js":
      (function (module, exports, __webpack_require__) {
        eval("let name = __webpack_require__(/*! ./base */ \"./src/base.js\");\r\nconsole.log(name);\r\n\n\n//# sourceURL=webpack:///./src/main.js?");
      })
  });
```

####  hot bundle.js

```js
(function (modules) { // webpack的入口文件
  // install a JSONP callback for chunk loading
  //安装一个JSONP的回调为了懒加载chunk代码块
  function webpackJsonpCallback(data) {//data=[[0],additionalModules]
    var chunkIds = data[0];//第一个元素是chunkId的数组
    var moreModules = data[1];//这个chunk里包含的额外更多的模块
    // add "moreModules" to the modules object,
    //把这次取出来的更多的模块添加到modules对象中
    // then flag all "chunkIds" as loaded and fire callback
    //然后把所有的chunkIds标识为已加载，并且执行回调函数
    var moduleId, chunkId, i = 0, resolves = [];
    //循环本次取出来的chunkIds
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];//先取出一个chunkId
      if (installedChunks[chunkId]) {//如果说有值的话
        // installedChunks[chunkId] = [resolve, reject, promise]
        //把这个installedChunks[chunkId]的0元素，promise resovle方法添加resolves数组中去
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;//加载完成
    }
    //循环迭代新模块并且
    for (moduleId in moreModules) {
      //把新的模块对象的上的属性全部合并或者说拷贝到老的modules对象上
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    //如果parentJsonpFunction有值的话，调用它,其实就是jsonArray.push方法
    if (parentJsonpFunction) parentJsonpFunction(data);
    //依次调用resolve方法，让每个promise都成功
    while (resolves.length) {
      resolves.shift()();
    }
  };


  // 模块的缓存
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  //这是一个对象，用来存放加载过的和加载中的代码
  //chunk=undefined 表示未加载
  // chunk=null 表示预加载或者预获取
  //chunk=promise 的话表示加载中
  //chunk=0 表示已加载或者说加载完成
  var installedChunks = {
    "main": 0
  };

  // script path function 用来生成脚本路径的函数
  function jsonpScriptSrc(chunkId) {
    //p = output publicPath 访问路径  ,默认就是/
    return __webpack_require__.p + "" + chunkId + ".bundle.js"
  }

  //require方法
  function __webpack_require__(moduleId) {

    // Check if module is in cache 检查模块是否在缓存
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache) 创建一个新模块并且放到缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function 执行模块函数，给module.exports赋值
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块设置为已加载 
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;
  }

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  //这个文件只包含入口chunk
  //这个代码块加载函数是为了加载额外的模块
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];//创建一个空的promise数组

    // JSONP chunk loading for javascript
    // 先取出此chunkID对应的值 ,第一次的肯定是没有值
    var installedChunkData = installedChunks[chunkId];
    //不等0的话表示未安装，0表示已 安装或者说已加载
    if (installedChunkData !== 0) { // 0 means "already installed".

      // a Promise means "currently loading". 如果是一个promise表示正在加载
      if (installedChunkData) {//如果有值，把索引2对应的属性添加到promises数组中
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache 在chunk缓存中创建一个promise
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        //把这个promise添加到promise数组中去
        promises.push(installedChunkData[2] = promise);

        // start chunk loading 开始代码块的加载
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');//创建一个script脚本
        var onScriptComplete;//当脚本完成后

        script.charset = 'utf-8';//设置脚本的编码
        script.timeout = 120;//设置脚本的超时时间
        // if (__webpack_require__.nc) {//用来安全处理的 nonce
        //   script.setAttribute("nonce", __webpack_require__.nc);
        // }
        //拼出一个URL路径度且赋给script.src
        script.src = jsonpScriptSrc(chunkId);
        //  上边的代码等于下边这行代码
        // script.src = __webpack_require__.p + "" + chunkId + ".bundle.js"
        //定义加载后的回调函数
        onScriptComplete = function (event) {
          // avoid mem leaks in IE. 防止IE下面的内存泄露
          script.onerror = script.onload = null;
          //清除定时器.如果是提前执行此函数，则需要先清除定时器
          clearTimeout(timeout);
          //取得已安装的代码块中的chunk
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {//如果不等0表示加载失败
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);//直接调用chunk[1],把error作为参数传进去，调用promise的reject方法，让promise失败
            }
            //把对应的值置为undefine
            installedChunks[chunkId] = undefined;
          }
        };
        //开启了一个定时器，如果说到了120秒之后请求还没有回来，我们就认为超时了，直接执行回调
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        ///把JSONP脚本添加到head标签
        head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object 创建一个模拟的命名空间
  // mode & 1: value is a module id, require it 模块是一个模块标识符
  // mode & 2: merge all properties of value into the ns 把所有的属性合并到ns上
  // mode & 4: return value when already ns object 当ns对象OK后返回value
  // mode & 8|1: behave like require 和require表现一样
  __webpack_require__.t = function (value, mode) {
    //如果说mode是1的话，则用require去加载这个模块
    if (mode & 1) value = __webpack_require__(value);
    //如果mode是8的话，则直接返回
    if (mode & 8) return value;
    //如果是mode是4的话 直接返回value
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    //创建一个空的对象
    var ns = Object.create(null);
    //r就是在对象上定义__esModule= true
    __webpack_require__.r(ns);//ns是一个es模块  es.__esModule= true
    //ns的default属性为value
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    // ns['default'] = value;
    //如果mode值是2的话，把value上的所有属性全部拷贝到ns上
    if (mode & 2 && typeof value != 'string') 
        for (var key in value) 
           __webpack_require__.d(ns, key, function (key) { 
               return value[key]; 
           }.bind(null, key));
    return ns;//ns = {__esModule:true,default:'video'}
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
      //该模块的a属性 = 模块本身
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // on error function for async loading
  __webpack_require__.oe = function (err) { console.error(err); throw err; };
  //刚开始的时候webpackJsonp是undefined,那么就给他一个空数组
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  //给数组的push方法绑定数组本身,如果以后有人再调用oldJsonpFunction,就相当于调用jsonpArray.push
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  //让数组的push方法指向另外一个函数webpackJsonpCallback
  jsonpArray.push = webpackJsonpCallback;
  //拷贝出来一个新的数组 
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
  ({

    "./src/main.js":
      (function (module, exports, __webpack_require__) {
        //e ensure
        eval(`
        document.querySelector('#play')
        .addEventListener('mouseover', () => {
           __webpack_require__.e(0)
           //ns = {__esModule:true,default:'video'}
           .then(__webpack_require__.t.bind(null, \"./src/video.js\", 7))
           .then(video => {
             console.log(video.default);
             })
          });`);
      })

  });
```

#### 0.bundle

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {

  "./src/video.js":
    (function (module, exports) {
      eval("module.exports = 'video';\n\n//# sourceURL=webpack:///./src/video.js?");
    })
}]);
```

## 用 HMR 提高开发效率

- HMR 全称是 Hot Module Replacement，即模块热替换
- Hot Reloading，当代码变更时通知浏览器刷新页面，以避免频繁手动刷新浏览器页面
- HMR 可以理解为增强版的 Hot Reloading，但不用整个页面刷新，而是局部替换掉部分模块代码并且使其生效
- 原理是当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块
- 模块热替换技术的优势有：
  - 实时预览反应更快，等待时间更短。
  - 不刷新浏览器能保留当前网页的运行状态，例如在使用 Redux 来管理数据的应用中搭配模块热替换能做到代码更新时Redux 中的数据还保持不变

###  模块热替换原理

- 模块热替换的原理和自动刷新原理类似，都需要往要开发的网页中注入一个代理客户端用于连接 DevServer 和网页

![hotupdate](http://img.zhufengpeixun.cn/hotupdate.png)

###  配置

####  配置hot

- DevServer 默认不会开启模块热替换模式，要开启该模式，只需在启动时带上参数

   

  ```
  --hot
  ```

  ```js
  const webpack = require('webpack');
  module.exports = {
  entry:{
    main:'./src/index.js',
  },
  plugins: [
    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ],
  devServer:{
    // 告诉 DevServer 要开启模块热替换模式
    hot: true,      
  }  
  };
  ```

  > 在启动 Webpack 时带上参数 --hot 其实就是自动为你完成以上配置。

####  代码实现

```js
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
render(<App/>, document.getElementById('root'));

// 只有当开启了模块热替换时 module.hot 才存在
if (module.hot) {
  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
  // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
  module.hot.accept(['./App'], () => {
    // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
    let App=require('./App').default;  
    render(<App/>, document.getElementById('root'));
  });
}
```

- module.hot 是当开启模块热替换后注入到全局的 API，用于控制模块热替换的逻辑
- 当子模块发生更新时，更新事件会一层层往上传递，也就是从`App.js`文件传递到`index.js`文件， 直到有某层的文件接受了当前变化的模块
- 如果事件一直往上抛到最外层都没有文件接受它，就会直接刷新网页
- `.css`文件都会触发模块热替换的原因是`style-loader`会注入用于接受 CSS 的代码

###  原理

####  server端

webpack 在server端进行热更新的流程

#####  webpack 实例

创建一个 webpack 实例 webpack-dev-server/bin/webpack-dev-server.js

```js
let compiler = webpack(webpackOptions);
let server = new Server(compiler, options);
```

##### express实例

创建 express 和 WebpackDevMiddleware webpack-dev-server/lib/Server.js

```js
function Server(compiler, options) {
  compiler.plugin('done', (stats) => {
    // 当完成编译的时候，就通过 websocket 发送给客户端一个消息（一个 `hash` 和 一个`ok`)
    this._sendStats(this.sockets, stats.toJson(clientStats)); 
  });

  const app = this.app = new express();
  this.middleware = webpackDevMiddleware(compiler, options);
   // middleware会拦截所有请求，如果发现对应的请求是要请求 `dist` 中的文件，则会进行处理。
   app.use(this.middleware);
}
```

#### 9.3.2.浏览器端

在浏览器中的工作流程

##### 9.3.2.1 建立连接

初始化的时候，client.js 会启动一个 socket 和 webpack-dev-server 建立连接，然后等待 hash 和 ok 消息 webpack-dev-server/client/index.js:212

```js
socket(socketUrl, onSocketMsg);
```

##### 9.3.2.2 向client发消息

向client发送一条更新消息 当有文件发生变动的时候，webpack编译文件，并通过 websocket 向client发送一条更新消息 webpack-dev-server/lib/Server.js:119

```js
 compiler.plugin('done', (stats) => {
    // 当完成编译的时候，就通过 websocket 发送给客户端一个消息（一个 `hash` 和 一个`ok`)
    this._sendStats(this.sockets, stats.toJson(clientStats)); 
  });
```

##### 9.3.2.3 保存hash

当有文件内容改动的时候，首先会收到 webpack-dev-server 发来的 hash 消息，得到新的 哈希值并保存起来 webpack-dev-server/client/index.js:85

```js
hash: function hash(_hash) {
    currentHash = _hash;
},
```

##### 9.3.2.4 收到 ok 消息

然后会立刻接收到 ok 消息，表示现在可以加载最新的代码了，于是进入 reloadApp 方法 webpack-dev-server/client/index.js:136

```js
ok: function ok() {
    sendMsg('Ok');
    reloadApp();
}

function reloadApp() {
  var hotEmitter = require('webpack/hot/emitter');
  hotEmitter.emit('webpackHotUpdate', currentHash);  
}
```

##### 9.3.2.5 check方法执行

reloadApp会触发check方法执行 webpack/hot/dev-server.js:51

```js
var hotEmitter = require("./emitter");
hotEmitter.on("webpackHotUpdate", function(currentHash) {
    lastHash = currentHash;
    check();
});
```

##### 9.3.2.6 获取manifest文件

webpack/lib/HotModuleReplacement.runtime.js：134

```js
    check: hotCheck

        return hotDownloadManifest(hotRequestTimeout).then(function(update) {
      //// 取到了 manifest后，就可以通过jsonp 加载最新的模块的JS代码了  
            hotEnsureUpdateChunk(chunkId);
   }

   function hotEnsureUpdateChunk(chunkId) {
            hotDownloadUpdateChunk(chunkId);
    }
```

webpack/lib/web/JsonpMainTemplate.runtime.js

```js
    function hotDownloadManifest(requestTimeout) {
        return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                var requestPath = $require$.p + $hotMainFilename$;
                request.open("GET", requestPath, true);
                request.timeout = requestTimeout;
                request.send(null);
              request.onreadystatechange = function() {
                 var update = JSON.parse(request.responseText);
                 resolve(update);
             };
        });
    }
```

##### 9.3.2.7 加载新模块

```js
function hotDownloadUpdateChunk(chunkId) { 
        // 通过jsonp的方式加载
         var head = document.getElementsByTagName("head")[0];
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.charset = "utf-8";
         script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
         ;
         head.appendChild(script);
     }
```

加载到的代码如下

```js
webpackHotUpdate(0,{
"moduleId":
 (function(module, exports, __webpack_require__) {
})
})
```

##### 9.3.2.8 accept 回调

调用对应的 accept 回调 webpack/lib/HotModuleReplacement.runtime:278 hotApply 方法的后面部分

```js
function hotApply(options) {
  for(moduleId in outdatedDependencies) {
  module = installedModules[moduleId];
                 if(module) {
                     moduleOutdatedDependencies = outdatedDependencies[moduleId];
                     var callbacks = [];
                     for(i = 0; i < moduleOutdatedDependencies.length; i++) {
                         dependency = moduleOutdatedDependencies[i];
                         // 先去到所有对这个模块注册的 accept 回调
                         cb = module.hot._acceptedDependencies[dependency]; 
                         if(cb) {
                             if(callbacks.indexOf(cb) >= 0) continue;
                             callbacks.push(cb);
                         }
                     }
                     for(i = 0; i < callbacks.length; i++) {
                         cb = callbacks[i];
                         try {
                             // 挨个调用一遍
                             cb(moduleOutdatedDependencies); 
                         } 
                     }
                 }

         }
}
```

## 10. 输出分析

通过使用[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)可以看到项目各模块的大小，可以按需优化

![analyse](http://img.zhufengpeixun.cn/analyse.gif)

### 10.1 安装

```js
npm install --save-dev webpack-bundle-analyzer
```

### 10.2 配置

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins: [
  new BundleAnalyzerPlugin(
           {
              analyzerMode: 'server',
              analyzerHost: '127.0.0.1',
              analyzerPort: 8889,
              reportFilename: 'report.html',
              defaultSizes: 'parsed',
              openAnalyzer: true,
              generateStatsFile: false,
              statsFilename: 'stats.json',
              statsOptions: null,
              logLevel: 'info'
            }
       ),
]
```

### 10.3 输出

```js
"analyz": "NODE_ENV=production npm_config_report=true npm run build"
```

### 10.4 在线分析

```js
webpack --profile --json > stats.json
```

- profile：记录下构建过程中的耗时信息；
- json：以 JSON 的格式输出构建结果，最后只输出一个 .json 文件，这个文件中包括所有构建相关的信息。
- Webpack 官方提供了一个可视化分析工具 [Webpack Analyse](https://webpack.github.io/analyse)
- Modules：展示所有的模块，每个模块对应一个文件。并且还包含所有模块之间的依赖关系图、模块路径、模块ID、模块所属 Chunk、模块大小；
- Chunks：展示所有的代码块，一个代码块中包含多个模块。并且还包含代码块的ID、名称、大小、每个代码块包含的模块数量，以及代码块之间的依赖关系图；
- Assets：展示所有输出的文件资源，包括 .js、.css、图片等。并且还包括文件名称、大小、该文件来自哪个代码块；
- Warnings：展示构建过程中出现的所有警告信息；
- Errors：展示构建过程中出现的所有错误信息；
- Hints：展示处理每个模块的过程中的耗时。