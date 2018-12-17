# webapck打包文件之异步版学习

> 在这之前已经看过乞丐版webpack打包后的文件，已经阅读，这次稍微提高一丢丢难度，看看经典的异步加载的逻辑。。。。老规矩，还是从项目搭建开始

### 基础代码

> 这里的代码和之前乞丐版的基本上一样，知识再src新增了一个lazy.js的文件，代码如下

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
      import('./lazy.js').then(obj => {
          console.log(obj)
      })
  }, false)
  ```
  
- lazy.js
```js
export default {
    name: 'lazy.js'
}
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

### 项目打包输出文件

- 使用cmd进入当前目录，然后输入如下命令

  ```bash
  num run build
  ```

- 终端输出信息如下

  ```bash
  Hash: 93cd852bd1e18a796a19
  Version: webpack 4.27.1
  Time: 481ms
  Built at: 2018-12-16 18:31:58
         Asset       Size  Chunks             Chunk Names
  0.boundle.js  497 bytes       0  [emitted]
    boundle.js   8.41 KiB    main  [emitted]  main
    index.html  459 bytes          [emitted]
  Entrypoint main = boundle.js
  [./src/index.js] 159 bytes {main} [built]
  [./src/lazy.js] 40 bytes {0} [built]
  Child html-webpack-plugin for "index.html":
       1 asset
      Entrypoint undefined = index.html
      [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 605 bytes {0} [built]
      [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
      [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
          + 1 hidden module
          
  ```

- 打包后dist目录文件有三个

  - `0.boundle.js`

    ```js
    (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{
    
    /***/ "./src/lazy.js":
    /*!*********************!*\
      !*** ./src/lazy.js ***!
      \*********************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    name: 'lazy.js'\r\n});\n\n//# sourceURL=webpack:///./src/lazy.js?");
    
    /***/ })
    
    }]);
    
    /* 
    
    ```

  - `boundle.js`

    ```js
     (function(modules) { // webpackBootstrap webpack启动程序入口
        debugger
     	// install a JSONP callback for chunk loading jsonp加载模块方法
     	function webpackJsonpCallback(data) {
     		var chunkIds = data[0];
     		var moreModules = data[1];
    
    
     		// add "moreModules" to the modules object,
     		// then flag all "chunkIds" as loaded and fire callback
     		var moduleId, chunkId, i = 0, resolves = [];
     		for(;i < chunkIds.length; i++) {
     			chunkId = chunkIds[i];
     			if(installedChunks[chunkId]) {
     				resolves.push(installedChunks[chunkId][0]);
     			}
     			installedChunks[chunkId] = 0;
     		}
     		for(moduleId in moreModules) {
     			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
     				modules[moduleId] = moreModules[moduleId];
     			}
     		}
     		if(parentJsonpFunction) parentJsonpFunction(data);
    
     		while(resolves.length) {
     			resolves.shift()();
     		}
    
     	};
    
    
     	// The module cache 缓存模块
     	var installedModules = {};
    
     	// object to store loaded and loading chunks
     	// undefined = chunk not loaded, null = chunk preloaded/prefetched
        // Promise = chunk loading, 0 = chunk loaded
        //  存储加载和加载块的对象
        // 当值为undefined的时候模块还没有被加载
        // 当模块等于null时模块预加载
        // 当值为0时模块加载完成
     	var installedChunks = {
     		"main": 0
     	};
    
    
    
     	// script path function // 拼接模块加载路径函数
     	function jsonpScriptSrc(chunkId) {
     		return __webpack_require__.p + "" + chunkId + ".boundle.js"
     	}
    
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
    
     	// This file contains only the entry chunk. 该文件仅包含如旧模块
     	// The chunk loading function for additional chunks 其他模块的加载功能
     	__webpack_require__.e = function requireEnsure(chunkId) {
            debugger
     		var promises = [];
    
    
             // JSONP chunk loading for javascript 使用JSONP加载模块
            //  从缓存中读取模块，检查是否已经被加载
     		var installedChunkData = installedChunks[chunkId];
     		if(installedChunkData !== 0) {
                // 0 means "already installed". 如果值为0则说明已经记载完成，如果不等于0，说明没有被加载，则创建一个promise加载模块
                // 创建一个Promise加载当期am模块
     			// a Promise means "currently loading".
     			if(installedChunkData) { 
                    // 如果installedChunkData有值得说明模块正在加载中，将该promse函数方式promises中，后边一起执行
     				promises.push(installedChunkData[2]);
     			} else {
                    //  模块还没有被加载，在这里创建promise对象，加载文件
     				// setup Promise in chunk cache
     				var promise = new Promise(function(resolve, reject) {
                        // 跟新installedChunks为一个数组，里边是promise的两个方法， 并将installedChunks赋值给installedChunkData,
                        // 在上班检测installedChunkData不为空，就不会走这里，并且会把当前promise对象加入promises中，后边一起调用执行
     					installedChunkData = installedChunks[chunkId] = [resolve, reject];
                     });
                    //  将当前promse对象保存到installedChunkData
                    // installedChunkData =  [resolve, reject, promise];
     				promises.push(installedChunkData[2] = promise);
    
     				// start chunk loading 开始加载模块， 这里使用jsonp动态创建script标签，相信大家很熟悉了，就不说了
     				var head = document.getElementsByTagName('head')[0];
     				var script = document.createElement('script');
     				var onScriptComplete; 
    
     				script.charset = 'utf-8'; //设置文件编码
     				script.timeout = 120; // 设置加载文件超时时间
     				if (__webpack_require__.nc) {// 安全配置，防止文件多次加载
     					script.setAttribute("nonce", __webpack_require__.nc);
                     }
                    // 赋值src
     				script.src = jsonpScriptSrc(chunkId);
                    // script.src =  __webpack_require__.p + "" + chunkId + ".boundle.js"
                     
                    // 加载后的回调函数
     				onScriptComplete = function (event) {
     					// avoid mem leaks in IE. 避免IE中的mem泄漏
                         script.onerror = script.onload = null;
                        //  如果文件加载成功，清空定时器（在141行创建的）
                         clearTimeout(timeout);
                        // 从缓存中读取chunk， 如果不没有被加载，这里chunk就是一个数组  [resolve, reject, promise]
     					var chunk = installedChunks[chunkId];
     					if(chunk !== 0) {
                            //  如果不等于0， 说明文件还没有被加载，进行下述操作
     						if(chunk) {
                                // 拿到event对象进项判断处理 
     							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
     							var realSrc = event && event.target && event.target.src;
     							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
     							error.type = errorType;
     							error.request = realSrc;
     							chunk[1](error);
                             }
                            //  跟新值为加载中(undefined)
     						installedChunks[chunkId] = undefined;
     					}
                     };
                    // 创建一个定时器，并在在我们设置标签加载时长相同的时候调用onScriptComplete函数 
                    // 传入类型为timeout， script作为target传入
     				var timeout = setTimeout(function(){
     					onScriptComplete({ type: 'timeout', target: script });
                     }, 120000);
                    //  将onload和error事件的回调函数都是用onScriptComplete， 确保该函数能被调用
                     script.onerror = script.onload = onScriptComplete;
                    //  将script标签插入到页面
     				head.appendChild(script);
     			}
     		}
     		return Promise.all(promises);
     	};
    
     	// expose the modules object (__webpack_modules__) 挂载modules到__webpack_require__
     	__webpack_require__.m = modules;
    
     	// expose the module cache 挂载缓存模块到__webpack_require__
     	__webpack_require__.c = installedModules;
    
     	// define getter function for harmony exports s数据劫持，重写getter方法
     	__webpack_require__.d = function(exports, name, getter) {
     		if(!__webpack_require__.o(exports, name)) {
     			Object.defineProperty(exports, name, { enumerable: true, get: getter });
     		}
     	};
    
     	// define __esModule on exports 异步加载模块
     	__webpack_require__.r = function(exports) {
     		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
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
     	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
     	var parentJsonpFunction = oldJsonpFunction;
    
    
     	// Load entry module and return exports 加载入口文件
     	return __webpack_require__(__webpack_require__.s = "./src/index.js");
     })
    /************************************************************************/
     ({
    
    /***/ "./src/index.js":
    /*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    eval("document.getElementById('btn').addEventListener('click', function () {\r\n    __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./lazy.js */ \"./src/lazy.js\")).then(obj => {\r\n        console.log(obj)\r\n    })\r\n}, false)\n\n//# sourceURL=webpack:///./src/index.js?");
    
    /***/ })
    
     });
    ```

  - `index.html`

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
    <script type="text/javascript" src="boundle.js?93cd852bd1e18a796a19"></script></body>
    </html>
    ```


### 老规矩 逐行读代码

> 代码结构仍然是一个匿名自执行函数，入口文件代码被作为一个对象，传递给改函数，逻辑如下：

- 同步加载逻辑

  1. `modules`赋值为一个对象，{代码快的路径/文件名: webpack封装后的带代码}，1行
  2. 初始化缓存模块：`installedModules`43行
  3. 初始化缓存代码块`installedChunks`, 43行
  4. 给webpack加载函数`__webpack_require__`挂在异步加载函数`requireEnsure`，81行
  5. 怪哉modules到`__webpack_require__`函数上，方便后期使用160行
  6. 挂在`installedModules`到`__webpack_require__`函数，163行
  7. 创建命名空间管理模块`__webpack_require__.t`， 185行
  8. 挂在错误处理函数`__webpack_require__.oe `，225行
  9. 初始化一个模块数组，处理异步加载模块`jsonpArray`,227行
  10. 创建一个临时变量保存`jsonpArray`的push方法，这里使用了`bind`方法处理this指向始终未`jsonpArray`, 229行
  11. 重写`jsonpArray`的`push`方法为`webpackJsonpCallback`，231行
  12. 拷贝一个新的数组，然后循环调用加载，223行
  13. 保存函数`parentJsonpFunction`,`webpackJsonpCallback`加载数据时调用，235行
  14. 加载入口我呢见，并返回加载的结果239行
  15. 进入`__webpack_require__`方法内部
      1. 检测是否已经被加载
      2. 创建一个新的模块module，并将moduleId赋值给该对象
      3. 使用module为执行上下文加载该函数，并传入如下参数，模块导出对象，模块，__webpack_require__作为require函数传入，方便我们在模块内部加载其他模块
      4. 到这里完成了第一次同步文件的加载

- 异步文件`0.boundle.js`加载过程

  1. 点击页面test按钮，执行`__webpack_require__.e`方法，传入`chunkId(0)`,这里是一个promse函数，结果就是我们在加载以后执行的代码

     ```js
     __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./lazy.js */ \"./src/lazy.js\")).then(obj => {\r\n        console.log(obj)\r\n    })\r\n}, false)
     ```

  2. 创建一个promses数组，后期使用，83行

  3. 从缓存模块`installedChunks`中读取文件，并将结果保存在`installedChunkData`变量中 88行

  4. 检查代码是否被加载，因为文件没有被加载，此时`installedChunkData`的值问undefined，89行

  5. 创建新的promise对象加载文件， 99行

  6. 将上一步创建的promise对象的resolve和reject方法保存到`installedChunks[chunkId]`中，并赋值给`installedChunkData`,102行

  7. 保存创建的promise对象到promises（ 并且这里时先将第五步创建的promise对象保存到installedChunkData，然后将该对象保存起来），106行

  8. 开始动态创建script标签，并设置一些参数，109-117行

  9. 处理src，119行

  10. 处理script标签加载完成后的函数`onScriptComplete`，123行，

  11. 创建一个定时器，调用时间为我们设置的script标签的链接超时时间，回调函数为`onScriptComplete`, 传入错误参数，类型为超时，taiget为8创建的script标签， 147行

  12. 将script的错误处理函数，加载成功函数的回调都设置为`onScriptComplete`，保证该函数无论任何情况下都可以被执行, 151行

  13. 将scrpt标签插入页面， 153行

  14. 返回一个Promse.all, 参数时promises对象，也就是我们需要加载的模块的所有promise对象， 156行

  15. 进入`0.boundle.js`文件内部，将该文件和文件导出的模块对象作为一个参数，加入到`webpackJsonp`变量中去

  16. 进入`webpackJsonpCallback`函数内部，开始加载文件，data = [模块id(0)， 模块对象]， 也就是上一步骤传递过来的参数， 4行

  17. 解析参数，解析到需要加载的chunkid保存到chunkIds， 解析模块保存到moreModules， 5-6行，

  18. 遍历参数，将所有的模块的的状态修改为加载完成(0)， 12-18行

  19. 将加载好的模块缓存到缓存模块中(moreModules)， 19-23行

  20. 调用`parentJsonpFunction`函数(jsonpArray的push方法)，将文件加入到jsonpArray数组中， 24行

  21. 调用所有模块的resolve方法， 26行

  22. 进入到同同步模块的加载方法(__webpack_require__)中,逻辑额上边一样

      1. 检测是否已经被加载
      2. 创建一个新的模块module，并将moduleId赋值给该对象
      3. 使用module为执行上下文加载该函数，并传入如下参数，模块导出对象，模块，__webpack_require__作为require函数传入，方便我们在模块内部加载其他模块
      4. 标记文件为已经加载完成，73行
      5. 返回模块exports导出的对象， 76行

### 总结

> 妥妥啦啦的写了很多，以上就是webpack在处理异步模块的基本步骤，个人也是刚学习，肯定是半瓶子水，各种晃荡，但是还是要记好笔记，方便后期查阅.....

