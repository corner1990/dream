/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/http-proxy-middleware/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/http-proxy-middleware/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var HPM = __webpack_require__(/*! ./lib */ \"./node_modules/http-proxy-middleware/lib/index.js\")\n\nmodule.exports = function(context, opts) {\n  return new HPM(context, opts)\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/index.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/config-factory.js":
/*!******************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/config-factory.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _ = __webpack_require__(/*! lodash */ \"lodash\")\nvar url = __webpack_require__(/*! url */ \"url\")\nvar ERRORS = __webpack_require__(/*! ./errors */ \"./node_modules/http-proxy-middleware/lib/errors.js\")\nvar logger = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/lib/logger.js\").getInstance()\n\nmodule.exports = {\n  createConfig: createConfig\n}\n\nfunction createConfig(context, opts) {\n  // structure of config object to be returned\n  var config = {\n    context: undefined,\n    options: {}\n  }\n\n  // app.use('/api', proxy({target:'http://localhost:9000'}));\n  if (isContextless(context, opts)) {\n    config.context = '/'\n    config.options = _.assign(config.options, context)\n\n    // app.use('/api', proxy('http://localhost:9000'));\n    // app.use(proxy('http://localhost:9000/api'));\n  } else if (isStringShortHand(context)) {\n    var oUrl = url.parse(context)\n    var target = [oUrl.protocol, '//', oUrl.host].join('')\n\n    config.context = oUrl.pathname || '/'\n    config.options = _.assign(config.options, { target: target }, opts)\n\n    if (oUrl.protocol === 'ws:' || oUrl.protocol === 'wss:') {\n      config.options.ws = true\n    }\n    // app.use('/api', proxy({target:'http://localhost:9000'}));\n  } else {\n    config.context = context\n    config.options = _.assign(config.options, opts)\n  }\n\n  configureLogger(config.options)\n\n  if (!config.options.target) {\n    throw new Error(ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING)\n  }\n\n  // Legacy option.proxyHost\n  config.options = mapLegacyProxyHostOption(config.options)\n\n  // Legacy option.proxyTable > option.router\n  config.options = mapLegacyProxyTableOption(config.options)\n\n  return config\n}\n\n/**\n * Checks if a String only target/config is provided.\n * This can be just the host or with the optional path.\n *\n * @example\n *      app.use('/api', proxy('http://localhost:9000'));\n        app.use(proxy('http://localhost:9000/api'));\n *\n * @param  {String}  context [description]\n * @return {Boolean}         [description]\n */\nfunction isStringShortHand(context) {\n  if (_.isString(context)) {\n    return !!url.parse(context).host\n  }\n}\n\n/**\n * Checks if a Object only config is provided, without a context.\n * In this case the all paths will be proxied.\n *\n * @example\n *     app.use('/api', proxy({target:'http://localhost:9000'}));\n *\n * @param  {Object}  context [description]\n * @param  {*}       opts    [description]\n * @return {Boolean}         [description]\n */\nfunction isContextless(context, opts) {\n  return _.isPlainObject(context) && _.isEmpty(opts)\n}\n\nfunction mapLegacyProxyHostOption(options) {\n  // set options.headers.host when option.proxyHost is provided\n  if (options.proxyHost) {\n    logger.warn('*************************************')\n    logger.warn('[HPM] Deprecated \"option.proxyHost\"')\n    logger.warn(\n      '      Use \"option.changeOrigin\" or \"option.headers.host\" instead'\n    )\n    logger.warn('      \"option.proxyHost\" will be removed in future release.')\n    logger.warn('*************************************')\n\n    options.headers = options.headers || {}\n    options.headers.host = options.proxyHost\n  }\n\n  return options\n}\n\n// Warn deprecated proxyTable api usage\nfunction mapLegacyProxyTableOption(options) {\n  if (options.proxyTable) {\n    logger.warn('*************************************')\n    logger.warn('[HPM] Deprecated \"option.proxyTable\"')\n    logger.warn('      Use \"option.router\" instead')\n    logger.warn('      \"option.proxyTable\" will be removed in future release.')\n    logger.warn('*************************************')\n\n    options.router = _.clone(options.proxyTable)\n    _.omit(options, 'proxyTable')\n  }\n\n  return options\n}\n\nfunction configureLogger(options) {\n  if (options.logLevel) {\n    logger.setLevel(options.logLevel)\n  }\n\n  if (options.logProvider) {\n    logger.setProvider(options.logProvider)\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/config-factory.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/context-matcher.js":
/*!*******************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/context-matcher.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _ = __webpack_require__(/*! lodash */ \"lodash\")\nvar url = __webpack_require__(/*! url */ \"url\")\nvar isGlob = __webpack_require__(/*! is-glob */ \"is-glob\")\nvar micromatch = __webpack_require__(/*! micromatch */ \"micromatch\")\nvar ERRORS = __webpack_require__(/*! ./errors */ \"./node_modules/http-proxy-middleware/lib/errors.js\")\n\nmodule.exports = {\n  match: matchContext\n}\n\nfunction matchContext(context, uri, req) {\n  // single path\n  if (isStringPath(context)) {\n    return matchSingleStringPath(context, uri)\n  }\n\n  // single glob path\n  if (isGlobPath(context)) {\n    return matchSingleGlobPath(context, uri)\n  }\n\n  // multi path\n  if (Array.isArray(context)) {\n    if (context.every(isStringPath)) {\n      return matchMultiPath(context, uri)\n    }\n    if (context.every(isGlobPath)) {\n      return matchMultiGlobPath(context, uri)\n    }\n\n    throw new Error(ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY)\n  }\n\n  // custom matching\n  if (_.isFunction(context)) {\n    var pathname = getUrlPathName(uri)\n    return context(pathname, req)\n  }\n\n  throw new Error(ERRORS.ERR_CONTEXT_MATCHER_GENERIC)\n}\n\n/**\n * @param  {String} context '/api'\n * @param  {String} uri     'http://example.org/api/b/c/d.html'\n * @return {Boolean}\n */\nfunction matchSingleStringPath(context, uri) {\n  var pathname = getUrlPathName(uri)\n  return pathname.indexOf(context) === 0\n}\n\nfunction matchSingleGlobPath(pattern, uri) {\n  var pathname = getUrlPathName(uri)\n  var matches = micromatch(pathname, pattern)\n  return matches && matches.length > 0\n}\n\nfunction matchMultiGlobPath(patternList, uri) {\n  return matchSingleGlobPath(patternList, uri)\n}\n\n/**\n * @param  {String} contextList ['/api', '/ajax']\n * @param  {String} uri     'http://example.org/api/b/c/d.html'\n * @return {Boolean}\n */\nfunction matchMultiPath(contextList, uri) {\n  for (var i = 0; i < contextList.length; i++) {\n    var context = contextList[i]\n    if (matchSingleStringPath(context, uri)) {\n      return true\n    }\n  }\n  return false\n}\n\n/**\n * Parses URI and returns RFC 3986 path\n *\n * @param  {String} uri from req.url\n * @return {String}     RFC 3986 path\n */\nfunction getUrlPathName(uri) {\n  return uri && url.parse(uri).pathname\n}\n\nfunction isStringPath(context) {\n  return _.isString(context) && !isGlob(context)\n}\n\nfunction isGlobPath(context) {\n  return isGlob(context)\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/context-matcher.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/errors.js":
/*!**********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/errors.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable max-len */\n\nmodule.exports = {\n  ERR_CONFIG_FACTORY_TARGET_MISSING:\n    '[HPM] Missing \"target\" option. Example: {target: \"http://www.example.org\"}',\n  ERR_CONTEXT_MATCHER_GENERIC:\n    '[HPM] Invalid context. Expecting something like: \"/api\" or [\"/api\", \"/ajax\"]',\n  ERR_CONTEXT_MATCHER_INVALID_ARRAY:\n    '[HPM] Invalid context. Expecting something like: [\"/api\", \"/ajax\"] or [\"/api/**\", \"!**.html\"]',\n  ERR_PATH_REWRITER_CONFIG:\n    '[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function'\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/errors.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/handlers.js":
/*!************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/handlers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _ = __webpack_require__(/*! lodash */ \"lodash\")\nvar logger = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/lib/logger.js\").getInstance()\n\nmodule.exports = {\n  init: init,\n  getHandlers: getProxyEventHandlers\n}\n\nfunction init(proxy, opts) {\n  var handlers = getProxyEventHandlers(opts)\n\n  _.forIn(handlers, function(handler, eventName) {\n    proxy.on(eventName, handlers[eventName])\n  })\n\n  logger.debug('[HPM] Subscribed to http-proxy events: ', _.keys(handlers))\n}\n\nfunction getProxyEventHandlers(opts) {\n  // https://github.com/nodejitsu/node-http-proxy#listening-for-proxy-events\n  var proxyEvents = [\n    'error',\n    'proxyReq',\n    'proxyReqWs',\n    'proxyRes',\n    'open',\n    'close'\n  ]\n  var handlers = {}\n\n  _.forEach(proxyEvents, function(event) {\n    // all handlers for the http-proxy events are prefixed with 'on'.\n    // loop through options and try to find these handlers\n    // and add them to the handlers object for subscription in init().\n    var eventName = _.camelCase('on ' + event)\n    var fnHandler = _.get(opts, eventName)\n\n    if (_.isFunction(fnHandler)) {\n      handlers[event] = fnHandler\n    }\n  })\n\n  // add default error handler in absence of error handler\n  if (!_.isFunction(handlers.error)) {\n    handlers.error = defaultErrorHandler\n  }\n\n  // add default close handler in absence of close handler\n  if (!_.isFunction(handlers.close)) {\n    handlers.close = logClose\n  }\n\n  return handlers\n}\n\nfunction defaultErrorHandler(err, req, res) {\n  var host = req.headers && req.headers.host\n  var code = err.code\n\n  if (res.writeHead && !res.headersSent) {\n    if (/HPE_INVALID/.test(code)) {\n      res.writeHead(502)\n    } else {\n      switch (code) {\n        case 'ECONNRESET':\n        case 'ENOTFOUND':\n        case 'ECONNREFUSED':\n          res.writeHead(504)\n          break\n        default:\n          res.writeHead(500)\n      }\n    }\n  }\n\n  res.end('Error occured while trying to proxy to: ' + host + req.url)\n}\n\nfunction logClose(req, socket, head) {\n  // view disconnected websocket connections\n  logger.info('[HPM] Client disconnected')\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/handlers.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _ = __webpack_require__(/*! lodash */ \"lodash\")\nvar httpProxy = __webpack_require__(/*! http-proxy */ \"http-proxy\")\nvar configFactory = __webpack_require__(/*! ./config-factory */ \"./node_modules/http-proxy-middleware/lib/config-factory.js\")\nvar handlers = __webpack_require__(/*! ./handlers */ \"./node_modules/http-proxy-middleware/lib/handlers.js\")\nvar contextMatcher = __webpack_require__(/*! ./context-matcher */ \"./node_modules/http-proxy-middleware/lib/context-matcher.js\")\nvar PathRewriter = __webpack_require__(/*! ./path-rewriter */ \"./node_modules/http-proxy-middleware/lib/path-rewriter.js\")\nvar Router = __webpack_require__(/*! ./router */ \"./node_modules/http-proxy-middleware/lib/router.js\")\nvar logger = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/lib/logger.js\").getInstance()\nvar getArrow = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/lib/logger.js\").getArrow\n\nmodule.exports = HttpProxyMiddleware\n\nfunction HttpProxyMiddleware(context, opts) {\n  // https://github.com/chimurai/http-proxy-middleware/issues/57\n  var wsUpgradeDebounced = _.debounce(handleUpgrade)\n  var wsInitialized = false\n  var config = configFactory.createConfig(context, opts)\n  var proxyOptions = config.options\n\n  // create proxy\n  var proxy = httpProxy.createProxyServer({})\n  logger.info(\n    '[HPM] Proxy created:',\n    config.context,\n    ' -> ',\n    proxyOptions.target\n  )\n\n  var pathRewriter = PathRewriter.create(proxyOptions.pathRewrite) // returns undefined when \"pathRewrite\" is not provided\n\n  // attach handler to http-proxy events\n  handlers.init(proxy, proxyOptions)\n\n  // log errors for debug purpose\n  proxy.on('error', logError)\n\n  // https://github.com/chimurai/http-proxy-middleware/issues/19\n  // expose function to upgrade externally\n  middleware.upgrade = wsUpgradeDebounced\n\n  return middleware\n\n  function middleware(req, res, next) {\n    if (shouldProxy(config.context, req)) {\n      var activeProxyOptions = prepareProxyRequest(req)\n      proxy.web(req, res, activeProxyOptions)\n    } else {\n      next()\n    }\n\n    if (proxyOptions.ws === true) {\n      // use initial request to access the server object to subscribe to http upgrade event\n      catchUpgradeRequest(req.connection.server)\n    }\n  }\n\n  function catchUpgradeRequest(server) {\n    // subscribe once; don't subscribe on every request...\n    // https://github.com/chimurai/http-proxy-middleware/issues/113\n    if (!wsInitialized) {\n      server.on('upgrade', wsUpgradeDebounced)\n      wsInitialized = true\n    }\n  }\n\n  function handleUpgrade(req, socket, head) {\n    // set to initialized when used externally\n    wsInitialized = true\n\n    if (shouldProxy(config.context, req)) {\n      var activeProxyOptions = prepareProxyRequest(req)\n      proxy.ws(req, socket, head, activeProxyOptions)\n      logger.info('[HPM] Upgrading to WebSocket')\n    }\n  }\n\n  /**\n   * Determine whether request should be proxied.\n   *\n   * @private\n   * @param  {String} context [description]\n   * @param  {Object} req     [description]\n   * @return {Boolean}\n   */\n  function shouldProxy(context, req) {\n    var path = req.originalUrl || req.url\n    return contextMatcher.match(context, path, req)\n  }\n\n  /**\n   * Apply option.router and option.pathRewrite\n   * Order matters:\n   *    Router uses original path for routing;\n   *    NOT the modified path, after it has been rewritten by pathRewrite\n   * @param {Object} req\n   * @return {Object} proxy options\n   */\n  function prepareProxyRequest(req) {\n    // https://github.com/chimurai/http-proxy-middleware/issues/17\n    // https://github.com/chimurai/http-proxy-middleware/issues/94\n    req.url = req.originalUrl || req.url\n\n    // store uri before it gets rewritten for logging\n    var originalPath = req.url\n    var newProxyOptions = _.assign({}, proxyOptions)\n\n    // Apply in order:\n    // 1. option.router\n    // 2. option.pathRewrite\n    __applyRouter(req, newProxyOptions)\n    __applyPathRewrite(req, pathRewriter)\n\n    // debug logging for both http(s) and websockets\n    if (proxyOptions.logLevel === 'debug') {\n      var arrow = getArrow(\n        originalPath,\n        req.url,\n        proxyOptions.target,\n        newProxyOptions.target\n      )\n      logger.debug(\n        '[HPM] %s %s %s %s',\n        req.method,\n        originalPath,\n        arrow,\n        newProxyOptions.target\n      )\n    }\n\n    return newProxyOptions\n  }\n\n  // Modify option.target when router present.\n  function __applyRouter(req, options) {\n    var newTarget\n\n    if (options.router) {\n      newTarget = Router.getTarget(req, options)\n\n      if (newTarget) {\n        logger.debug(\n          '[HPM] Router new target: %s -> \"%s\"',\n          options.target,\n          newTarget\n        )\n        options.target = newTarget\n      }\n    }\n  }\n\n  // rewrite path\n  function __applyPathRewrite(req, pathRewriter) {\n    if (pathRewriter) {\n      var path = pathRewriter(req.url, req)\n\n      if (typeof path === 'string') {\n        req.url = path\n      } else {\n        logger.info('[HPM] pathRewrite: No rewritten path found. (%s)', req.url)\n      }\n    }\n  }\n\n  function logError(err, req, res) {\n    var hostname =\n      (req.headers && req.headers.host) || (req.hostname || req.host) // (websocket) || (node0.10 || node 4/5)\n    var target = proxyOptions.target.host || proxyOptions.target\n    var errorMessage =\n      '[HPM] Error occurred while trying to proxy request %s from %s to %s (%s) (%s)'\n    var errReference =\n      'https://nodejs.org/api/errors.html#errors_common_system_errors' // link to Node Common Systems Errors page\n\n    logger.error(\n      errorMessage,\n      req.url,\n      hostname,\n      target,\n      err.code || err,\n      errReference\n    )\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/index.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/logger.js":
/*!**********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/logger.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var util = __webpack_require__(/*! util */ \"util\")\nvar _ = __webpack_require__(/*! lodash */ \"lodash\")\n\nvar loggerInstance\n\nvar defaultProvider = {\n  log: console.log,\n  debug: console.log, // use .log(); since console does not have .debug()\n  info: console.info,\n  warn: console.warn,\n  error: console.error\n}\n\n// log level 'weight'\nvar LEVELS = {\n  debug: 10,\n  info: 20,\n  warn: 30,\n  error: 50,\n  silent: 80\n}\n\nmodule.exports = {\n  // singleton\n  getInstance: function() {\n    if (!loggerInstance) {\n      loggerInstance = new Logger()\n    }\n\n    return loggerInstance\n  },\n  getArrow: getArrow\n}\n\nfunction Logger() {\n  var logLevel\n  var provider\n\n  var api = {\n    log: log,\n    debug: debug,\n    info: info,\n    warn: warn,\n    error: error,\n    setLevel: function(v) {\n      if (isValidLevel(v)) {\n        logLevel = v\n      }\n    },\n    setProvider: function(fn) {\n      if (fn && isValidProvider(fn)) {\n        provider = fn(defaultProvider)\n      }\n    }\n  }\n\n  init()\n\n  return api\n\n  function init() {\n    api.setLevel('info')\n    api.setProvider(function() {\n      return defaultProvider\n    })\n  }\n\n  // log will log messages, regardless of logLevels\n  function log() {\n    provider.log(_interpolate.apply(null, arguments))\n  }\n\n  function debug() {\n    if (_showLevel('debug')) {\n      provider.debug(_interpolate.apply(null, arguments))\n    }\n  }\n\n  function info() {\n    if (_showLevel('info')) {\n      provider.info(_interpolate.apply(null, arguments))\n    }\n  }\n\n  function warn() {\n    if (_showLevel('warn')) {\n      provider.warn(_interpolate.apply(null, arguments))\n    }\n  }\n\n  function error() {\n    if (_showLevel('error')) {\n      provider.error(_interpolate.apply(null, arguments))\n    }\n  }\n\n  /**\n   * Decide to log or not to log, based on the log levels 'weight'\n   * @param  {String}  showLevel [debug, info, warn, error, silent]\n   * @return {Boolean}\n   */\n  function _showLevel(showLevel) {\n    var result = false\n    var currentLogLevel = LEVELS[logLevel]\n\n    if (currentLogLevel && currentLogLevel <= LEVELS[showLevel]) {\n      result = true\n    }\n\n    return result\n  }\n\n  // make sure logged messages and its data are return interpolated\n  // make it possible for additional log data, such date/time or custom prefix.\n  function _interpolate() {\n    var fn = _.spread(util.format)\n    var result = fn(_.slice(arguments))\n\n    return result\n  }\n\n  function isValidProvider(fnProvider) {\n    var result = true\n\n    if (fnProvider && !_.isFunction(fnProvider)) {\n      throw new Error('[HPM] Log provider config error. Expecting a function.')\n    }\n\n    return result\n  }\n\n  function isValidLevel(levelName) {\n    var validLevels = _.keys(LEVELS)\n    var isValid = _.includes(validLevels, levelName)\n\n    if (!isValid) {\n      throw new Error('[HPM] Log level error. Invalid logLevel.')\n    }\n\n    return isValid\n  }\n}\n\n/**\n * -> normal proxy\n * => router\n * ~> pathRewrite\n * ≈> router + pathRewrite\n *\n * @param  {String} originalPath\n * @param  {String} newPath\n * @param  {String} originalTarget\n * @param  {String} newTarget\n * @return {String}\n */\nfunction getArrow(originalPath, newPath, originalTarget, newTarget) {\n  var arrow = ['>']\n  var isNewTarget = originalTarget !== newTarget // router\n  var isNewPath = originalPath !== newPath // pathRewrite\n\n  if (isNewPath && !isNewTarget) {\n    arrow.unshift('~')\n  } else if (!isNewPath && isNewTarget) {\n    arrow.unshift('=')\n  } else if (isNewPath && isNewTarget) {\n    arrow.unshift('≈')\n  } else {\n    arrow.unshift('-')\n  }\n\n  return arrow.join('')\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/logger.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/path-rewriter.js":
/*!*****************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/path-rewriter.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _ = __webpack_require__(/*! lodash */ \"lodash\")\nvar logger = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/lib/logger.js\").getInstance()\nvar ERRORS = __webpack_require__(/*! ./errors */ \"./node_modules/http-proxy-middleware/lib/errors.js\")\n\nmodule.exports = {\n  create: createPathRewriter\n}\n\n/**\n * Create rewrite function, to cache parsed rewrite rules.\n *\n * @param {Object} rewriteConfig\n * @return {Function} Function to rewrite paths; This function should accept `path` (request.url) as parameter\n */\nfunction createPathRewriter(rewriteConfig) {\n  var rulesCache\n\n  if (!isValidRewriteConfig(rewriteConfig)) {\n    return\n  }\n\n  if (_.isFunction(rewriteConfig)) {\n    var customRewriteFn = rewriteConfig\n    return customRewriteFn\n  } else {\n    rulesCache = parsePathRewriteRules(rewriteConfig)\n    return rewritePath\n  }\n\n  function rewritePath(path) {\n    var result = path\n\n    _.forEach(rulesCache, function(rule) {\n      if (rule.regex.test(path)) {\n        result = result.replace(rule.regex, rule.value)\n        logger.debug('[HPM] Rewriting path from \"%s\" to \"%s\"', path, result)\n        return false\n      }\n    })\n\n    return result\n  }\n}\n\nfunction isValidRewriteConfig(rewriteConfig) {\n  if (_.isFunction(rewriteConfig)) {\n    return true\n  } else if (!_.isEmpty(rewriteConfig) && _.isPlainObject(rewriteConfig)) {\n    return true\n  } else if (\n    _.isUndefined(rewriteConfig) ||\n    _.isNull(rewriteConfig) ||\n    _.isEqual(rewriteConfig, {})\n  ) {\n    return false\n  } else {\n    throw new Error(ERRORS.ERR_PATH_REWRITER_CONFIG)\n  }\n}\n\nfunction parsePathRewriteRules(rewriteConfig) {\n  var rules = []\n\n  if (_.isPlainObject(rewriteConfig)) {\n    _.forIn(rewriteConfig, function(value, key) {\n      rules.push({\n        regex: new RegExp(key),\n        value: rewriteConfig[key]\n      })\n      logger.info(\n        '[HPM] Proxy rewrite rule created: \"%s\" ~> \"%s\"',\n        key,\n        rewriteConfig[key]\n      )\n    })\n  }\n\n  return rules\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/path-rewriter.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/lib/router.js":
/*!**********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/lib/router.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _ = __webpack_require__(/*! lodash */ \"lodash\")\nvar logger = __webpack_require__(/*! ./logger.js */ \"./node_modules/http-proxy-middleware/lib/logger.js\").getInstance()\n\nmodule.exports = {\n  getTarget: getTarget\n}\n\nfunction getTarget(req, config) {\n  var newTarget\n  var router = config.router\n\n  if (_.isPlainObject(router)) {\n    newTarget = getTargetFromProxyTable(req, router)\n  } else if (_.isFunction(router)) {\n    newTarget = router(req)\n  }\n\n  return newTarget\n}\n\nfunction getTargetFromProxyTable(req, table) {\n  var result\n  var host = req.headers.host\n  var path = req.url\n\n  var hostAndPath = host + path\n\n  _.forIn(table, function(value, key) {\n    if (containsPath(key)) {\n      if (hostAndPath.indexOf(key) > -1) {\n        // match 'localhost:3000/api'\n        result = table[key]\n        logger.debug('[HPM] Router table match: \"%s\"', key)\n        return false\n      }\n    } else {\n      if (key === host) {\n        // match 'localhost:3000'\n        result = table[key]\n        logger.debug('[HPM] Router table match: \"%s\"', host)\n        return false\n      }\n    }\n  })\n\n  return result\n}\n\nfunction containsPath(v) {\n  return v.indexOf('/') > -1\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/lib/router.js?");

/***/ }),

/***/ "./node_modules/koa2-connect/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/koa2-connect/dist/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;\r\n    return { next: verb(0), \"throw\": verb(1), \"return\": verb(2) };\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [0, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n/**\r\n * Inject raw response, so we can know if middleware has responsed.\r\n */\r\nfunction makeInjectedResponse(koaCtx, /*markHandled,*/ whenEnded) {\r\n    var res = koaCtx.res;\r\n    res.on('close', whenEnded).on('finish', whenEnded);\r\n    var dummyRes = Object.create(res);\r\n    [\r\n        'setHeader',\r\n        'writeHead',\r\n        'write',\r\n        'end'\r\n    ].forEach(function (name) {\r\n        dummyRes[name] = function () {\r\n            var args = [];\r\n            for (var _i = 0; _i < arguments.length; _i++) {\r\n                args[_i] = arguments[_i];\r\n            }\r\n            res[name].apply(res, args);\r\n            // koa2.0 initial assign statusCode to 404, reset to 200\r\n            if (res.statusCode === 404) {\r\n                res.statusCode = 200;\r\n            }\r\n            // markHandled();\r\n        };\r\n    });\r\n    [\r\n        'statusCode',\r\n        'statusMessage'\r\n    ].forEach(function (name) {\r\n        dummyRes.__defineSetter__(name, function (value) {\r\n            res[name] = value;\r\n            // markHandled();\r\n        });\r\n    });\r\n    return dummyRes;\r\n}\r\n/**\r\n * The middleware function does include the `next` callback so only resolve\r\n * the Promise when it's called. If it's never called, the middleware stack\r\n * completion will stall\r\n */\r\nfunction handler(ctx, connectMiddleware) {\r\n    return new Promise(function (resolve, reject) {\r\n        // let hasHandled = false;\r\n        // (req, res)\r\n        var args = [\r\n            ctx.req,\r\n            makeInjectedResponse(ctx, \r\n            // () => {\r\n            //   // hasHandled = true;\r\n            // },\r\n            function () {\r\n                resolve(false);\r\n            })\r\n        ];\r\n        var assumeSync = true;\r\n        // (req, res, next) or (err, req, res, next)\r\n        if (connectMiddleware.length >= 3) {\r\n            args.push(function (err) {\r\n                if (err)\r\n                    reject(err);\r\n                else\r\n                    resolve(true);\r\n            });\r\n            assumeSync = false;\r\n        }\r\n        // (err, req, res, next)\r\n        if (connectMiddleware.length >= 4) {\r\n            args.unshift(null);\r\n        }\r\n        connectMiddleware.apply(void 0, args);\r\n        /**\r\n         * If the middleware function does not declare receiving the `next` callback\r\n         * assume that it's synchronous.\r\n         */\r\n        if (assumeSync /*&& !hasHandled*/) {\r\n            resolve(true);\r\n        }\r\n    });\r\n}\r\n/**\r\n * Returns a Koa middleware function that varies its async logic based on if the\r\n * given middleware function declares at least 3 parameters, i.e. includes\r\n * the `next` callback function\r\n */\r\nfunction koaConnect(connectMiddleware) {\r\n    var _this = this;\r\n    return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {\r\n        var goNext, err_1;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    ctx.respond = false;\r\n                    _a.label = 1;\r\n                case 1:\r\n                    _a.trys.push([1, 3, , 4]);\r\n                    return [4 /*yield*/, handler(ctx, connectMiddleware)];\r\n                case 2:\r\n                    goNext = _a.sent();\r\n                    if (goNext) {\r\n                        ctx.respond = true;\r\n                        return [2 /*return*/, next()];\r\n                    }\r\n                    return [3 /*break*/, 4];\r\n                case 3:\r\n                    err_1 = _a.sent();\r\n                    ctx.respond = true;\r\n                    throw err_1;\r\n                case 4:\r\n                    ;\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    }); };\r\n}\r\nmodule.exports = koaConnect;\r\n\n\n//# sourceURL=webpack:///./node_modules/koa2-connect/dist/index.js?");

/***/ }),

/***/ "./src/client/request.js":
/*!*******************************!*\
  !*** ./src/client/request.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n // 创建一个axios的实例， 配置baseURL的基准路径\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n  baseURL: '/'\n}));\n\n//# sourceURL=webpack:///./src/client/request.js?");

/***/ }),

/***/ "./src/components/Header/index.js":
/*!****************************************!*\
  !*** ./src/components/Header/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Header; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar Header =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Header, _Component);\n\n  function Header() {\n    _classCallCheck(this, Header);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));\n  }\n\n  _createClass(Header, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n        className: \"navbar navbar-inverse navbar-fixed-top\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"container-fluid\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"navbar-header\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n        className: \"navbar-brand\"\n      }, \"SSR\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"nav navbar-nav\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/\"\n      }, \"\\u9996\\u9875\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/counter\"\n      }, \"\\u8BA1\\u6570\\u5668\"))))));\n    }\n  }]);\n\n  return Header;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/Header/index.js?");

/***/ }),

/***/ "./src/containers/App.js":
/*!*******************************!*\
  !*** ./src/containers/App.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Header */ \"./src/components/Header/index.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../routes */ \"./src/routes.js\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      // 拿到子路由\n      var route = this.props.route;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"container\",\n        style: {\n          marginTop: 70\n        }\n      }, Object(react_router_config__WEBPACK_IMPORTED_MODULE_4__[\"renderRoutes\"])(route.components)));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/containers/App.js?");

/***/ }),

/***/ "./src/containers/Counter/index.js":
/*!*****************************************!*\
  !*** ./src/containers/Counter/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_actions_counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/counter */ \"./src/store/actions/counter.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar Counter =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Counter, _React$Component);\n\n  function Counter() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, Counter);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Counter)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_this), \"state\", {\n      number: 0\n    });\n\n    return _this;\n  }\n\n  _createClass(Counter, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        style: {\n          textAlign: 'center'\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, this.props.number), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        onClick: this.props.increment\n      }, \"+\"));\n    }\n  }]);\n\n  return Counter;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component); // 连接store\n\n\nvar WrapCounter = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(function (state) {\n  return state.counter;\n}, _store_actions_counter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Counter); // Counter = connect(state => state.counter, actions)(Counter)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (WrapCounter); // export default Counter\n\n//# sourceURL=webpack:///./src/containers/Counter/index.js?");

/***/ }),

/***/ "./src/containers/Home/index.js":
/*!**************************************!*\
  !*** ./src/containers/Home/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_actions_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/home */ \"./src/store/actions/home.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar Home =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Home, _Component);\n\n  function Home() {\n    _classCallCheck(this, Home);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));\n  }\n\n  _createClass(Home, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      // 获取数据 在本地切换的时候需要异步加载数据\n      if (this.props.list.length === 0) {\n        this.props.getHomeList();\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Home\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"list-group\"\n      }, this.props.list.map(function (item) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          key: item.id,\n          className: \"list-group-item\"\n        }, item.name);\n      })));\n    }\n  }]);\n\n  return Home;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nHome = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(function (state) {\n  return state.home;\n}, _store_actions_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Home); // 此方法是用来异步加载数据， 并且放到仓库中去\n\nHome.loadData = function (store) {\n  // dispatch的返回值就是action\n  return store.dispatch(_store_actions_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getHomeList());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./src/containers/Home/index.js?");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _containers_Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers/Home */ \"./src/containers/Home/index.js\");\n/* harmony import */ var _containers_Counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/Counter */ \"./src/containers/Counter/index.js\");\n/* harmony import */ var _containers_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/App */ \"./src/containers/App.js\");\n// import React, {Component, Fragment} from 'react'\n// import { Route } from 'react-router-dom'\n\n\n // 为了配合服务端渲染，这里需要修改为数组\n\n/**\r\n * \r\n\r\nexport default (\r\n    <Fragment>\r\n        <Route path=\"/\" exact component={Home}></Route>\r\n        <Route path=\"/counter\" exact component={Counter}></Route>\r\n    </Fragment>\r\n)\r\n */\n\n/*\r\nexport default [\r\n   {\r\n       path: '/',\r\n       component: Home,\r\n       key: 'home',\r\n       exact: true,\r\n       loadData: Home.loadData // 加载数据，如果有此配置项，那么则意味着需要加载异步数据\r\n   },\r\n   {\r\n       path: '/counter',\r\n       component: Counter,\r\n       key: 'counter'\r\n   }\r\n]\r\n*/\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  path: '/',\n  component: _containers_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  components: [{\n    path: '/',\n    component: _containers_Home__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    key: 'home',\n    exact: true,\n    loadData: _containers_Home__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadData // 加载数据，如果有此配置项，那么则意味着需要加载异步数据\n\n  }, {\n    path: '/counter',\n    component: _containers_Counter__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    key: 'counter'\n  }]\n}]);\n\n//# sourceURL=webpack:///./src/routes.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/server/render.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Koa = __webpack_require__(/*! koa2 */ \"koa2\");\n\nvar _ = __webpack_require__(/*! koa-route */ \"koa-route\");\n\nvar httpProxy = __webpack_require__(/*! http-proxy-middleware */ \"./node_modules/http-proxy-middleware/index.js\");\n\n\n\nvar k2c = __webpack_require__(/*! koa2-connect */ \"./node_modules/koa2-connect/dist/index.js\");\n\nvar port = 4000;\nvar app = new Koa();\napp.use(\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(ctx, next) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!ctx.url.startsWith('/api')) {\n              _context.next = 3;\n              break;\n            }\n\n            _context.next = 3;\n            return k2c(httpProxy({\n              target: 'http://127.0.0.1:4001',\n              changeOrigin: true,\n              secure: false //         pathRewrite: {'^/api': ''}\n\n            }))(ctx, next);\n\n          case 3:\n            _context.next = 5;\n            return next();\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}()); // 设置服务端静态目录\n\napp.use(__webpack_require__(/*! koa-static */ \"koa-static\")('public')); // 这里路径改为*， 不管哪个路径，都组走这里\n\napp.use(_.get('*', _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\napp.listen(port, function () {\n  console.log(\"server start at \".concat(port));\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/render.js":
/*!******************************!*\
  !*** ./src/server/render.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../routes */ \"./src/routes.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store */ \"./src/store/index.js\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n // renderRouters 选人多级路由\n// matchRoutes 实现路由匹配\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (ctx, next) {\n  var context = {};\n  var store = Object(_store__WEBPACK_IMPORTED_MODULE_5__[\"getServerStore\"])(); // 获取要渲染的组件\n  // matchPath 是路由提供的工具方法， 可以用来判断路径和路由是否匹配\n\n  var matchRoute = Object(react_router_config__WEBPACK_IMPORTED_MODULE_6__[\"matchRoutes\"])(_routes__WEBPACK_IMPORTED_MODULE_4__[\"default\"], ctx.req.url);\n  var promises = [];\n  matchRoute.map(function (route) {\n    // 判断是否需要加载异步数据\n    if (route.loadData) {\n      console.log('reoute', route);\n      promises.push(route.loadData(store));\n    }\n  });\n  return Promise.all(promises).then(function () {\n    // 创建仓库的时候， 仓库里已经有默认值\n    // console.log(store.getState())\n    var html = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"], {\n      store: store\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_0__[\"StaticRouter\"], {\n      context: {},\n      location: ctx.req.url\n    }, Object(react_router_config__WEBPACK_IMPORTED_MODULE_6__[\"renderRoutes\"])(_routes__WEBPACK_IMPORTED_MODULE_4__[\"default\"]))));\n    ctx.body = \"\\n        <!DOCTYPE html>\\n        <html lang=\\\"en\\\">\\n        <head>\\n            <meta charset=\\\"UTF-8\\\">\\n            <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n            <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"ie=edge\\\">\\n            <title>Document</title>\\n            <!-- \\u6700\\u65B0\\u7248\\u672C\\u7684 Bootstrap \\u6838\\u5FC3 CSS \\u6587\\u4EF6 -->\\n            <link rel=\\\"stylesheet\\\" href=\\\"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css\\\">\\n        </head>\\n        <body>\\n            <div id=\\\"root\\\">\".concat(html, \"</div>\\n            <script>\\n                // \\u540C\\u6B65\\u670D\\u52A1\\u5668\\u7AEF\\u7684state\\u5BF9\\u8C61\\n                window.content = {\\n                    state: \").concat(JSON.stringify(store.getState()), \"\\n                }\\n            </script>\\n            <script src=\\\"/client.js\\\"></script>\\n        </body>\\n        </html>\\n        \");\n  });\n});\n\n//# sourceURL=webpack:///./src/server/render.js?");

/***/ }),

/***/ "./src/server/request.js":
/*!*******************************!*\
  !*** ./src/server/request.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n // 创建一个axios的实例， 配置baseURL的基准路径\n// 服务器端访问的时候访问4001\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n  baseURL: 'http://localhost:4001'\n}));\n\n//# sourceURL=webpack:///./src/server/request.js?");

/***/ }),

/***/ "./src/store/action-types.js":
/*!***********************************!*\
  !*** ./src/store/action-types.js ***!
  \***********************************/
/*! exports provided: INCREMENT, SET_HOME_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INCREMENT\", function() { return INCREMENT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_HOME_LIST\", function() { return SET_HOME_LIST; });\nvar INCREMENT = 'INCREMENT';\nvar SET_HOME_LIST = 'SET_HOME_LIST';\n\n//# sourceURL=webpack:///./src/store/action-types.js?");

/***/ }),

/***/ "./src/store/actions/counter.js":
/*!**************************************!*\
  !*** ./src/store/actions/counter.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action-types */ \"./src/store/action-types.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  increment: function increment() {\n    return {\n      type: _action_types__WEBPACK_IMPORTED_MODULE_0__[\"INCREMENT\"]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/store/actions/counter.js?");

/***/ }),

/***/ "./src/store/actions/home.js":
/*!***********************************!*\
  !*** ./src/store/actions/home.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action-types */ \"./src/store/action-types.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  getHomeList: function getHomeList() {\n    return function (dispatch, getState, request) {\n      return request.get('/api/users').then(function (res) {\n        var data = res.data;\n        dispatch({\n          type: _action_types__WEBPACK_IMPORTED_MODULE_0__[\"SET_HOME_LIST\"],\n          payload: data\n        });\n      });\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/store/actions/home.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: getServerStore, getClientStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getServerStore\", function() { return getServerStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getClientStore\", function() { return getClientStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ \"redux-logger\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducers */ \"./src/store/reducers/index.js\");\n/* harmony import */ var _client_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../client/request */ \"./src/client/request.js\");\n/* harmony import */ var _server_request__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../server/request */ \"./src/server/request.js\");\n // import saga from 'redux-saga'\n\n\n\n\n\n\nfunction getServerStore() {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_3__[\"default\"], Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a.withExtraArgument(_server_request__WEBPACK_IMPORTED_MODULE_5__[\"default\"]), redux_logger__WEBPACK_IMPORTED_MODULE_1___default.a));\n}\nfunction getClientStore() {\n  var initState = window.content.state;\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_3__[\"default\"], initState, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a.withExtraArgument(_client_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"]), redux_logger__WEBPACK_IMPORTED_MODULE_1___default.a));\n}\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/reducers/counter.js":
/*!***************************************!*\
  !*** ./src/store/reducers/counter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action-types */ \"./src/store/action-types.js\");\n\nvar initState = {\n  number: 0\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _action_types__WEBPACK_IMPORTED_MODULE_0__[\"INCREMENT\"]:\n      var number = state.number;\n      return {\n        number: ++number\n      };\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./src/store/reducers/counter.js?");

/***/ }),

/***/ "./src/store/reducers/home.js":
/*!************************************!*\
  !*** ./src/store/reducers/home.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action-types */ \"./src/store/action-types.js\");\n\nvar initState = {\n  list: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _action_types__WEBPACK_IMPORTED_MODULE_0__[\"SET_HOME_LIST\"]:\n      return {\n        list: action.payload\n      };\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./src/store/reducers/home.js?");

/***/ }),

/***/ "./src/store/reducers/index.js":
/*!*************************************!*\
  !*** ./src/store/reducers/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counter */ \"./src/store/reducers/counter.js\");\n/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home */ \"./src/store/reducers/home.js\");\n\n\n\nvar resucers = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  counter: _counter__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  home: _home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (resucers);\n\n//# sourceURL=webpack:///./src/store/reducers/index.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi babel-polyfill ./src/server/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server/index.js */\"./src/server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/server/index.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "http-proxy":
/*!*****************************!*\
  !*** external "http-proxy" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-proxy\");\n\n//# sourceURL=webpack:///external_%22http-proxy%22?");

/***/ }),

/***/ "is-glob":
/*!**************************!*\
  !*** external "is-glob" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-glob\");\n\n//# sourceURL=webpack:///external_%22is-glob%22?");

/***/ }),

/***/ "koa-route":
/*!****************************!*\
  !*** external "koa-route" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-route\");\n\n//# sourceURL=webpack:///external_%22koa-route%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "koa2":
/*!***********************!*\
  !*** external "koa2" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa2\");\n\n//# sourceURL=webpack:///external_%22koa2%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "micromatch":
/*!*****************************!*\
  !*** external "micromatch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"micromatch\");\n\n//# sourceURL=webpack:///external_%22micromatch%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-logger\");\n\n//# sourceURL=webpack:///external_%22redux-logger%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });