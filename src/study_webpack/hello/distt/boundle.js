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