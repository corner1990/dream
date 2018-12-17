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

eval("document.getElementById('btn').addEventListener('click', function () {\r\n    alert('click btn')\r\n}, false)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });