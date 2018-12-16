# Webpack打包文件学习

> 开始学习，当然是从最简单的开始，首先是搭建项目结构，具体操作如下

### 开始搭建项目

- 创建一个目录study_webpack
- 进入进入study_webpack, `npm init -y ` 初始化项目
- 新建src目录，并进入src，新建文件
  - index.js
  - index.html
- 新建webpack.congfig.js文件



### 配置webpack和完成简单的代码结构

- webpack.config.js

  ```js
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
      entry: './src/index.js',
      output: {
          path: path.join(__dirname, 'dist'),
          filename: 'boundle.js'
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: path.join(__dirname, './src/index.html'),
              filename: 'index.html',
              hash: true
          })
      ]
  }
  ```

- inde.js

  ```js
  document.getElementById('btn').addEventListener('click', function () {
      alert('click btn')
  }, false)
  ```

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      <div id="root">
  
      </div>
      <button id="btn">test</button>
      <script src="./boundle.js"></script>
  </body>
  </html>
  ```

- 在package.json中的scripts中添加一句命令

  ```json
  {
    "scripts": {
      "build": "webpack --mode development"
    },
  }
  
  ```

### 打包文件

> 需要注意的是，这里的代码和打包后的代码并不是完全一样的，删除了部分目前没有使用到的逻辑，方便自己阅读

- 使用cmd进入当前目录，然后输入如下命令

  ```bash
  num run build
  ```

- 在`/dist`目录查看打包后的文件`boundle.js`, 一下是简单的文件结构和解释

  ```js
   (function(modules) { // webpackBootstrap webpack启动入口
      debugger
   	// The module cache webpack缓存对象
   	var installedModules = {};
  
   	// The require function webpack加载函数
   	function __webpack_require__(moduleId) {
  
   		// Check if module is in cache 检查模块是否被缓存
   		if(installedModules[moduleId]) {
              //  如果被缓存，则直接返回缓存中模块的exports导出的对象
   			return installedModules[moduleId].exports;
   		}
   		// Create a new module (and put it into the cache) 新建一个模块
   		var module = installedModules[moduleId] = {
   			i: moduleId, // 模块id
   			l: false, // 是否被加载
   			exports: {} // 模块导出对象，默认为空
   		};
  
   		// Execute the module function 执行模块方法
   		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  
   		// Flag the module as loaded 标记模块已经被加载
   		module.l = true;
  
   		// Return the exports of the module 返回模块module.exports导出的对象
   		return module.exports;
   	}
  
  
   	// expose the modules object (__webpack_modules__) 将module挂载到__webpack_require__函数上
   	__webpack_require__.m = modules;
  
   	// expose the module cache 将缓存模块挂载到__webpack_require__函数上
   	__webpack_require__.c = installedModules;
  
  
   	// __webpack_public_path__ // 公共路径
   	__webpack_require__.p = "";
  
  
   	// Load entry module and return exports // 加载入口文件
   	return __webpack_require__(__webpack_require__.s = "./src/index.js");
   })
  /************************************************************************/
   ({
  
  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  eval("doucment.addEventListener('click', function () {\r\n    alert('click btn')\r\n}, false)\n\n//# sourceURL=webpack:///./src/index.js?");
  
  /***/ })
  
   });
  ```


### 分析代码执行过程

> 这个过程很简单，就是自己在代码的最顶端加一个`debugger`然后一步一步的看，到底在做什么，一直到最后完成文件加载

- 代码为一个自执行函数，我们的入口文件被作为一个参数传递给webpack的入口启动程序
- 将入口文件挂载到`__webpack_require__`函数上
- 将缓存个对象挂载到`__webpack_require__`函数上
- 调用`__webpack_require__`加载入口文件，并将结果返回
- 进入`__webpack_require__`函数
  - moduleID = './src/index.js'，拿到形参
  - 检测是否已经被加载
  - 创建一个新的模块module，并将moduleId赋值给该对象
  - 使用module为执行上下文加载该函数，并传入如下参数，模块导出对象，模块，__webpack_require__作为require函数传入，方便我们在模块内部加载其他模块

### 总结

> 以上是最简单的webpack包后的文件加载逻辑，看起来也是一目了然，下一步学习一下异步加载组件的代码执行逻辑，