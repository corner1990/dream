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

/***/ "../node_modules/cache-content-type/index.js":
/*!***************************************************!*\
  !*** ../node_modules/cache-content-type/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mimeTypes = __webpack_require__(/*! mime-types */ \"mime-types\");\nconst LRU = __webpack_require__(/*! ylru */ \"../node_modules/ylru/index.js\");\n\nconst typeLRUCache = new LRU(100);\n\nmodule.exports = type => {\n  let mimeType = typeLRUCache.get(type);\n  if (!mimeType) {\n    mimeType = mimeTypes.contentType(type);\n    typeLRUCache.set(type, mimeType);\n  }\n  return mimeType;\n};\n\n\n//# sourceURL=webpack:///../node_modules/cache-content-type/index.js?");

/***/ }),

/***/ "../node_modules/koa/lib/application.js":
/*!**********************************************!*\
  !*** ../node_modules/koa/lib/application.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\n/**\n * Module dependencies.\n */\n\nconst isGeneratorFunction = __webpack_require__(/*! is-generator-function */ \"is-generator-function\");\nconst debug = __webpack_require__(/*! debug */ \"debug\")('koa:application');\nconst onFinished = __webpack_require__(/*! on-finished */ \"on-finished\");\nconst response = __webpack_require__(/*! ./response */ \"../node_modules/koa/lib/response.js\");\nconst compose = __webpack_require__(/*! koa-compose */ \"koa-compose\");\nconst isJSON = __webpack_require__(/*! koa-is-json */ \"koa-is-json\");\nconst context = __webpack_require__(/*! ./context */ \"../node_modules/koa/lib/context.js\");\nconst request = __webpack_require__(/*! ./request */ \"../node_modules/koa/lib/request.js\");\nconst statuses = __webpack_require__(/*! statuses */ \"statuses\");\nconst Emitter = __webpack_require__(/*! events */ \"events\");\nconst util = __webpack_require__(/*! util */ \"util\");\nconst Stream = __webpack_require__(/*! stream */ \"stream\");\nconst http = __webpack_require__(/*! http */ \"http\");\nconst only = __webpack_require__(/*! only */ \"only\");\nconst convert = __webpack_require__(/*! koa-convert */ \"koa-convert\");\nconst deprecate = __webpack_require__(/*! depd */ \"depd\")('koa');\n\n/**\n * Expose `Application` class.\n * Inherits from `Emitter.prototype`.\n */\n\nmodule.exports = class Application extends Emitter {\n  /**\n   * Initialize a new `Application`.\n   *\n   * @api public\n   */\n\n  constructor() {\n    super();\n\n    this.proxy = false;\n    this.middleware = [];\n    this.subdomainOffset = 2;\n    this.env = \"development\" || false;\n    this.context = Object.create(context);\n    this.request = Object.create(request);\n    this.response = Object.create(response);\n    if (util.inspect.custom) {\n      this[util.inspect.custom] = this.inspect;\n    }\n  }\n\n  /**\n   * Shorthand for:\n   *\n   *    http.createServer(app.callback()).listen(...)\n   *\n   * @param {Mixed} ...\n   * @return {Server}\n   * @api public\n   */\n\n  listen(...args) {\n    debug('listen');\n    const server = http.createServer(this.callback());\n    return server.listen(...args);\n  }\n\n  /**\n   * Return JSON representation.\n   * We only bother showing settings.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  toJSON() {\n    return only(this, [\n      'subdomainOffset',\n      'proxy',\n      'env'\n    ]);\n  }\n\n  /**\n   * Inspect implementation.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  inspect() {\n    return this.toJSON();\n  }\n\n  /**\n   * Use the given middleware `fn`.\n   *\n   * Old-style middleware will be converted.\n   *\n   * @param {Function} fn\n   * @return {Application} self\n   * @api public\n   */\n\n  use(fn) {\n    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');\n    if (isGeneratorFunction(fn)) {\n      deprecate('Support for generators will be removed in v3. ' +\n                'See the documentation for examples of how to convert old middleware ' +\n                'https://github.com/koajs/koa/blob/master/docs/migration.md');\n      fn = convert(fn);\n    }\n    debug('use %s', fn._name || fn.name || '-');\n    this.middleware.push(fn);\n    return this;\n  }\n\n  /**\n   * Return a request handler callback\n   * for node's native http server.\n   *\n   * @return {Function}\n   * @api public\n   */\n\n  callback() {\n    const fn = compose(this.middleware);\n\n    if (!this.listenerCount('error')) this.on('error', this.onerror);\n\n    const handleRequest = (req, res) => {\n      const ctx = this.createContext(req, res);\n      return this.handleRequest(ctx, fn);\n    };\n\n    return handleRequest;\n  }\n\n  /**\n   * Handle request in callback.\n   *\n   * @api private\n   */\n\n  handleRequest(ctx, fnMiddleware) {\n    const res = ctx.res;\n    res.statusCode = 404;\n    const onerror = err => ctx.onerror(err);\n    const handleResponse = () => respond(ctx);\n    onFinished(res, onerror);\n    return fnMiddleware(ctx).then(handleResponse).catch(onerror);\n  }\n\n  /**\n   * Initialize a new context.\n   *\n   * @api private\n   */\n\n  createContext(req, res) {\n    const context = Object.create(this.context);\n    const request = context.request = Object.create(this.request);\n    const response = context.response = Object.create(this.response);\n    context.app = request.app = response.app = this;\n    context.req = request.req = response.req = req;\n    context.res = request.res = response.res = res;\n    request.ctx = response.ctx = context;\n    request.response = response;\n    response.request = request;\n    context.originalUrl = request.originalUrl = req.url;\n    context.state = {};\n    return context;\n  }\n\n  /**\n   * Default error handler.\n   *\n   * @param {Error} err\n   * @api private\n   */\n\n  onerror(err) {\n    if (!(err instanceof Error)) throw new TypeError(util.format('non-error thrown: %j', err));\n\n    if (404 == err.status || err.expose) return;\n    if (this.silent) return;\n\n    const msg = err.stack || err.toString();\n    console.error();\n    console.error(msg.replace(/^/gm, '  '));\n    console.error();\n  }\n};\n\n/**\n * Response helper.\n */\n\nfunction respond(ctx) {\n  // allow bypassing koa\n  if (false === ctx.respond) return;\n\n  if (!ctx.writable) return;\n\n  const res = ctx.res;\n  let body = ctx.body;\n  const code = ctx.status;\n\n  // ignore body\n  if (statuses.empty[code]) {\n    // strip headers\n    ctx.body = null;\n    return res.end();\n  }\n\n  if ('HEAD' == ctx.method) {\n    if (!res.headersSent && isJSON(body)) {\n      ctx.length = Buffer.byteLength(JSON.stringify(body));\n    }\n    return res.end();\n  }\n\n  // status body\n  if (null == body) {\n    if (ctx.req.httpVersionMajor >= 2) {\n      body = String(code);\n    } else {\n      body = ctx.message || String(code);\n    }\n    if (!res.headersSent) {\n      ctx.type = 'text';\n      ctx.length = Buffer.byteLength(body);\n    }\n    return res.end(body);\n  }\n\n  // responses\n  if (Buffer.isBuffer(body)) return res.end(body);\n  if ('string' == typeof body) return res.end(body);\n  if (body instanceof Stream) return body.pipe(res);\n\n  // body: json\n  body = JSON.stringify(body);\n  if (!res.headersSent) {\n    ctx.length = Buffer.byteLength(body);\n  }\n  res.end(body);\n}\n\n\n//# sourceURL=webpack:///../node_modules/koa/lib/application.js?");

/***/ }),

/***/ "../node_modules/koa/lib/context.js":
/*!******************************************!*\
  !*** ../node_modules/koa/lib/context.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\n/**\n * Module dependencies.\n */\n\nconst util = __webpack_require__(/*! util */ \"util\");\nconst createError = __webpack_require__(/*! http-errors */ \"http-errors\");\nconst httpAssert = __webpack_require__(/*! http-assert */ \"http-assert\");\nconst delegate = __webpack_require__(/*! delegates */ \"delegates\");\nconst statuses = __webpack_require__(/*! statuses */ \"statuses\");\nconst Cookies = __webpack_require__(/*! cookies */ \"cookies\");\n\nconst COOKIES = Symbol('context#cookies');\n\n/**\n * Context prototype.\n */\n\nconst proto = module.exports = {\n\n  /**\n   * util.inspect() implementation, which\n   * just returns the JSON output.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  inspect() {\n    if (this === proto) return this;\n    return this.toJSON();\n  },\n\n  /**\n   * Return JSON representation.\n   *\n   * Here we explicitly invoke .toJSON() on each\n   * object, as iteration will otherwise fail due\n   * to the getters and cause utilities such as\n   * clone() to fail.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  toJSON() {\n    return {\n      request: this.request.toJSON(),\n      response: this.response.toJSON(),\n      app: this.app.toJSON(),\n      originalUrl: this.originalUrl,\n      req: '<original node req>',\n      res: '<original node res>',\n      socket: '<original node socket>'\n    };\n  },\n\n  /**\n   * Similar to .throw(), adds assertion.\n   *\n   *    this.assert(this.user, 401, 'Please login!');\n   *\n   * See: https://github.com/jshttp/http-assert\n   *\n   * @param {Mixed} test\n   * @param {Number} status\n   * @param {String} message\n   * @api public\n   */\n\n  assert: httpAssert,\n\n  /**\n   * Throw an error with `status` (default 500) and\n   * `msg`. Note that these are user-level\n   * errors, and the message may be exposed to the client.\n   *\n   *    this.throw(403)\n   *    this.throw(400, 'name required')\n   *    this.throw('something exploded')\n   *    this.throw(new Error('invalid'))\n   *    this.throw(400, new Error('invalid'))\n   *\n   * See: https://github.com/jshttp/http-errors\n   *\n   * Note: `status` should only be passed as the first parameter.\n   *\n   * @param {String|Number|Error} err, msg or status\n   * @param {String|Number|Error} [err, msg or status]\n   * @param {Object} [props]\n   * @api public\n   */\n\n  throw(...args) {\n    throw createError(...args);\n  },\n\n  /**\n   * Default error handling.\n   *\n   * @param {Error} err\n   * @api private\n   */\n\n  onerror(err) {\n    // don't do anything if there is no error.\n    // this allows you to pass `this.onerror`\n    // to node-style callbacks.\n    if (null == err) return;\n\n    if (!(err instanceof Error)) err = new Error(util.format('non-error thrown: %j', err));\n\n    let headerSent = false;\n    if (this.headerSent || !this.writable) {\n      headerSent = err.headerSent = true;\n    }\n\n    // delegate\n    this.app.emit('error', err, this);\n\n    // nothing we can do here other\n    // than delegate to the app-level\n    // handler and log.\n    if (headerSent) {\n      return;\n    }\n\n    const { res } = this;\n\n    // first unset all headers\n    /* istanbul ignore else */\n    if (typeof res.getHeaderNames === 'function') {\n      res.getHeaderNames().forEach(name => res.removeHeader(name));\n    } else {\n      res._headers = {}; // Node < 7.7\n    }\n\n    // then set those specified\n    this.set(err.headers);\n\n    // force text/plain\n    this.type = 'text';\n\n    // ENOENT support\n    if ('ENOENT' == err.code) err.status = 404;\n\n    // default to 500\n    if ('number' != typeof err.status || !statuses[err.status]) err.status = 500;\n\n    // respond\n    const code = statuses[err.status];\n    const msg = err.expose ? err.message : code;\n    this.status = err.status;\n    this.length = Buffer.byteLength(msg);\n    res.end(msg);\n  },\n\n  get cookies() {\n    if (!this[COOKIES]) {\n      this[COOKIES] = new Cookies(this.req, this.res, {\n        keys: this.app.keys,\n        secure: this.request.secure\n      });\n    }\n    return this[COOKIES];\n  },\n\n  set cookies(_cookies) {\n    this[COOKIES] = _cookies;\n  }\n};\n\n/**\n * Custom inspection implementation for newer Node.js versions.\n *\n * @return {Object}\n * @api public\n */\n\n/* istanbul ignore else */\nif (util.inspect.custom) {\n  module.exports[util.inspect.custom] = module.exports.inspect;\n}\n\n/**\n * Response delegation.\n */\n\ndelegate(proto, 'response')\n  .method('attachment')\n  .method('redirect')\n  .method('remove')\n  .method('vary')\n  .method('set')\n  .method('append')\n  .method('flushHeaders')\n  .access('status')\n  .access('message')\n  .access('body')\n  .access('length')\n  .access('type')\n  .access('lastModified')\n  .access('etag')\n  .getter('headerSent')\n  .getter('writable');\n\n/**\n * Request delegation.\n */\n\ndelegate(proto, 'request')\n  .method('acceptsLanguages')\n  .method('acceptsEncodings')\n  .method('acceptsCharsets')\n  .method('accepts')\n  .method('get')\n  .method('is')\n  .access('querystring')\n  .access('idempotent')\n  .access('socket')\n  .access('search')\n  .access('method')\n  .access('query')\n  .access('path')\n  .access('url')\n  .access('accept')\n  .getter('origin')\n  .getter('href')\n  .getter('subdomains')\n  .getter('protocol')\n  .getter('host')\n  .getter('hostname')\n  .getter('URL')\n  .getter('header')\n  .getter('headers')\n  .getter('secure')\n  .getter('stale')\n  .getter('fresh')\n  .getter('ips')\n  .getter('ip');\n\n\n//# sourceURL=webpack:///../node_modules/koa/lib/context.js?");

/***/ }),

/***/ "../node_modules/koa/lib/request.js":
/*!******************************************!*\
  !*** ../node_modules/koa/lib/request.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\n/**\n * Module dependencies.\n */\n\nconst URL = __webpack_require__(/*! url */ \"url\").URL;\nconst net = __webpack_require__(/*! net */ \"net\");\nconst accepts = __webpack_require__(/*! accepts */ \"accepts\");\nconst contentType = __webpack_require__(/*! content-type */ \"content-type\");\nconst stringify = __webpack_require__(/*! url */ \"url\").format;\nconst parse = __webpack_require__(/*! parseurl */ \"parseurl\");\nconst qs = __webpack_require__(/*! querystring */ \"querystring\");\nconst typeis = __webpack_require__(/*! type-is */ \"type-is\");\nconst fresh = __webpack_require__(/*! fresh */ \"fresh\");\nconst only = __webpack_require__(/*! only */ \"only\");\nconst util = __webpack_require__(/*! util */ \"util\");\n\nconst IP = Symbol('context#ip');\n\n/**\n * Prototype.\n */\n\nmodule.exports = {\n\n  /**\n   * Return request header.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  get header() {\n    return this.req.headers;\n  },\n\n  /**\n   * Set request header.\n   *\n   * @api public\n   */\n\n  set header(val) {\n    this.req.headers = val;\n  },\n\n  /**\n   * Return request header, alias as request.header\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  get headers() {\n    return this.req.headers;\n  },\n\n  /**\n   * Set request header, alias as request.header\n   *\n   * @api public\n   */\n\n  set headers(val) {\n    this.req.headers = val;\n  },\n\n  /**\n   * Get request URL.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get url() {\n    return this.req.url;\n  },\n\n  /**\n   * Set request URL.\n   *\n   * @api public\n   */\n\n  set url(val) {\n    this.req.url = val;\n  },\n\n  /**\n   * Get origin of URL.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get origin() {\n    return `${this.protocol}://${this.host}`;\n  },\n\n  /**\n   * Get full request URL.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get href() {\n    // support: `GET http://example.com/foo`\n    if (/^https?:\\/\\//i.test(this.originalUrl)) return this.originalUrl;\n    return this.origin + this.originalUrl;\n  },\n\n  /**\n   * Get request method.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get method() {\n    return this.req.method;\n  },\n\n  /**\n   * Set request method.\n   *\n   * @param {String} val\n   * @api public\n   */\n\n  set method(val) {\n    this.req.method = val;\n  },\n\n  /**\n   * Get request pathname.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get path() {\n    return parse(this.req).pathname;\n  },\n\n  /**\n   * Set pathname, retaining the query-string when present.\n   *\n   * @param {String} path\n   * @api public\n   */\n\n  set path(path) {\n    const url = parse(this.req);\n    if (url.pathname === path) return;\n\n    url.pathname = path;\n    url.path = null;\n\n    this.url = stringify(url);\n  },\n\n  /**\n   * Get parsed query-string.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  get query() {\n    const str = this.querystring;\n    const c = this._querycache = this._querycache || {};\n    return c[str] || (c[str] = qs.parse(str));\n  },\n\n  /**\n   * Set query-string as an object.\n   *\n   * @param {Object} obj\n   * @api public\n   */\n\n  set query(obj) {\n    this.querystring = qs.stringify(obj);\n  },\n\n  /**\n   * Get query string.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get querystring() {\n    if (!this.req) return '';\n    return parse(this.req).query || '';\n  },\n\n  /**\n   * Set querystring.\n   *\n   * @param {String} str\n   * @api public\n   */\n\n  set querystring(str) {\n    const url = parse(this.req);\n    if (url.search === `?${str}`) return;\n\n    url.search = str;\n    url.path = null;\n\n    this.url = stringify(url);\n  },\n\n  /**\n   * Get the search string. Same as the querystring\n   * except it includes the leading ?.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get search() {\n    if (!this.querystring) return '';\n    return `?${this.querystring}`;\n  },\n\n  /**\n   * Set the search string. Same as\n   * request.querystring= but included for ubiquity.\n   *\n   * @param {String} str\n   * @api public\n   */\n\n  set search(str) {\n    this.querystring = str;\n  },\n\n  /**\n   * Parse the \"Host\" header field host\n   * and support X-Forwarded-Host when a\n   * proxy is enabled.\n   *\n   * @return {String} hostname:port\n   * @api public\n   */\n\n  get host() {\n    const proxy = this.app.proxy;\n    let host = proxy && this.get('X-Forwarded-Host');\n    if (!host) {\n      if (this.req.httpVersionMajor >= 2) host = this.get(':authority');\n      if (!host) host = this.get('Host');\n    }\n    if (!host) return '';\n    return host.split(/\\s*,\\s*/, 1)[0];\n  },\n\n  /**\n   * Parse the \"Host\" header field hostname\n   * and support X-Forwarded-Host when a\n   * proxy is enabled.\n   *\n   * @return {String} hostname\n   * @api public\n   */\n\n  get hostname() {\n    const host = this.host;\n    if (!host) return '';\n    if ('[' == host[0]) return this.URL.hostname || ''; // IPv6\n    return host.split(':', 1)[0];\n  },\n\n  /**\n   * Get WHATWG parsed URL.\n   * Lazily memoized.\n   *\n   * @return {URL|Object}\n   * @api public\n   */\n\n  get URL() {\n    /* istanbul ignore else */\n    if (!this.memoizedURL) {\n      const protocol = this.protocol;\n      const host = this.host;\n      const originalUrl = this.originalUrl || ''; // avoid undefined in template string\n      try {\n        this.memoizedURL = new URL(`${protocol}://${host}${originalUrl}`);\n      } catch (err) {\n        this.memoizedURL = Object.create(null);\n      }\n    }\n    return this.memoizedURL;\n  },\n\n  /**\n   * Check if the request is fresh, aka\n   * Last-Modified and/or the ETag\n   * still match.\n   *\n   * @return {Boolean}\n   * @api public\n   */\n\n  get fresh() {\n    const method = this.method;\n    const s = this.ctx.status;\n\n    // GET or HEAD for weak freshness validation only\n    if ('GET' != method && 'HEAD' != method) return false;\n\n    // 2xx or 304 as per rfc2616 14.26\n    if ((s >= 200 && s < 300) || 304 == s) {\n      return fresh(this.header, this.response.header);\n    }\n\n    return false;\n  },\n\n  /**\n   * Check if the request is stale, aka\n   * \"Last-Modified\" and / or the \"ETag\" for the\n   * resource has changed.\n   *\n   * @return {Boolean}\n   * @api public\n   */\n\n  get stale() {\n    return !this.fresh;\n  },\n\n  /**\n   * Check if the request is idempotent.\n   *\n   * @return {Boolean}\n   * @api public\n   */\n\n  get idempotent() {\n    const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];\n    return !!~methods.indexOf(this.method);\n  },\n\n  /**\n   * Return the request socket.\n   *\n   * @return {Connection}\n   * @api public\n   */\n\n  get socket() {\n    return this.req.socket;\n  },\n\n  /**\n   * Get the charset when present or undefined.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get charset() {\n    try {\n      const { parameters } = contentType.parse(this.req);\n      return parameters.charset || '';\n    } catch (e) {\n      return '';\n    }\n  },\n\n  /**\n   * Return parsed Content-Length when present.\n   *\n   * @return {Number}\n   * @api public\n   */\n\n  get length() {\n    const len = this.get('Content-Length');\n    if (len == '') return;\n    return ~~len;\n  },\n\n  /**\n   * Return the protocol string \"http\" or \"https\"\n   * when requested with TLS. When the proxy setting\n   * is enabled the \"X-Forwarded-Proto\" header\n   * field will be trusted. If you're running behind\n   * a reverse proxy that supplies https for you this\n   * may be enabled.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get protocol() {\n    if (this.socket.encrypted) return 'https';\n    if (!this.app.proxy) return 'http';\n    const proto = this.get('X-Forwarded-Proto');\n    return proto ? proto.split(/\\s*,\\s*/, 1)[0] : 'http';\n  },\n\n  /**\n   * Short-hand for:\n   *\n   *    this.protocol == 'https'\n   *\n   * @return {Boolean}\n   * @api public\n   */\n\n  get secure() {\n    return 'https' == this.protocol;\n  },\n\n  /**\n   * When `app.proxy` is `true`, parse\n   * the \"X-Forwarded-For\" ip address list.\n   *\n   * For example if the value were \"client, proxy1, proxy2\"\n   * you would receive the array `[\"client\", \"proxy1\", \"proxy2\"]`\n   * where \"proxy2\" is the furthest down-stream.\n   *\n   * @return {Array}\n   * @api public\n   */\n\n  get ips() {\n    const proxy = this.app.proxy;\n    const val = this.get('X-Forwarded-For');\n    return proxy && val\n      ? val.split(/\\s*,\\s*/)\n      : [];\n  },\n\n  /**\n   * Return request's remote address\n   * When `app.proxy` is `true`, parse\n   * the \"X-Forwarded-For\" ip address list and return the first one\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get ip() {\n    if (!this[IP]) {\n      this[IP] = this.ips[0] || this.socket.remoteAddress || '';\n    }\n    return this[IP];\n  },\n\n  set ip(_ip) {\n    this[IP] = _ip;\n  },\n\n  /**\n   * Return subdomains as an array.\n   *\n   * Subdomains are the dot-separated parts of the host before the main domain\n   * of the app. By default, the domain of the app is assumed to be the last two\n   * parts of the host. This can be changed by setting `app.subdomainOffset`.\n   *\n   * For example, if the domain is \"tobi.ferrets.example.com\":\n   * If `app.subdomainOffset` is not set, this.subdomains is\n   * `[\"ferrets\", \"tobi\"]`.\n   * If `app.subdomainOffset` is 3, this.subdomains is `[\"tobi\"]`.\n   *\n   * @return {Array}\n   * @api public\n   */\n\n  get subdomains() {\n    const offset = this.app.subdomainOffset;\n    const hostname = this.hostname;\n    if (net.isIP(hostname)) return [];\n    return hostname\n      .split('.')\n      .reverse()\n      .slice(offset);\n  },\n\n  /**\n   * Get accept object.\n   * Lazily memoized.\n   *\n   * @return {Object}\n   * @api private\n   */\n  get accept() {\n    return this._accept || (this._accept = accepts(this.req));\n  },\n\n  /**\n   * Set accept object.\n   *\n   * @param {Object}\n   * @api private\n   */\n  set accept(obj) {\n    return this._accept = obj;\n  },\n\n  /**\n   * Check if the given `type(s)` is acceptable, returning\n   * the best match when true, otherwise `false`, in which\n   * case you should respond with 406 \"Not Acceptable\".\n   *\n   * The `type` value may be a single mime type string\n   * such as \"application/json\", the extension name\n   * such as \"json\" or an array `[\"json\", \"html\", \"text/plain\"]`. When a list\n   * or array is given the _best_ match, if any is returned.\n   *\n   * Examples:\n   *\n   *     // Accept: text/html\n   *     this.accepts('html');\n   *     // => \"html\"\n   *\n   *     // Accept: text/*, application/json\n   *     this.accepts('html');\n   *     // => \"html\"\n   *     this.accepts('text/html');\n   *     // => \"text/html\"\n   *     this.accepts('json', 'text');\n   *     // => \"json\"\n   *     this.accepts('application/json');\n   *     // => \"application/json\"\n   *\n   *     // Accept: text/*, application/json\n   *     this.accepts('image/png');\n   *     this.accepts('png');\n   *     // => false\n   *\n   *     // Accept: text/*;q=.5, application/json\n   *     this.accepts(['html', 'json']);\n   *     this.accepts('html', 'json');\n   *     // => \"json\"\n   *\n   * @param {String|Array} type(s)...\n   * @return {String|Array|false}\n   * @api public\n   */\n\n  accepts(...args) {\n    return this.accept.types(...args);\n  },\n\n  /**\n   * Return accepted encodings or best fit based on `encodings`.\n   *\n   * Given `Accept-Encoding: gzip, deflate`\n   * an array sorted by quality is returned:\n   *\n   *     ['gzip', 'deflate']\n   *\n   * @param {String|Array} encoding(s)...\n   * @return {String|Array}\n   * @api public\n   */\n\n  acceptsEncodings(...args) {\n    return this.accept.encodings(...args);\n  },\n\n  /**\n   * Return accepted charsets or best fit based on `charsets`.\n   *\n   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`\n   * an array sorted by quality is returned:\n   *\n   *     ['utf-8', 'utf-7', 'iso-8859-1']\n   *\n   * @param {String|Array} charset(s)...\n   * @return {String|Array}\n   * @api public\n   */\n\n  acceptsCharsets(...args) {\n    return this.accept.charsets(...args);\n  },\n\n  /**\n   * Return accepted languages or best fit based on `langs`.\n   *\n   * Given `Accept-Language: en;q=0.8, es, pt`\n   * an array sorted by quality is returned:\n   *\n   *     ['es', 'pt', 'en']\n   *\n   * @param {String|Array} lang(s)...\n   * @return {Array|String}\n   * @api public\n   */\n\n  acceptsLanguages(...args) {\n    return this.accept.languages(...args);\n  },\n\n  /**\n   * Check if the incoming request contains the \"Content-Type\"\n   * header field, and it contains any of the give mime `type`s.\n   * If there is no request body, `null` is returned.\n   * If there is no content type, `false` is returned.\n   * Otherwise, it returns the first `type` that matches.\n   *\n   * Examples:\n   *\n   *     // With Content-Type: text/html; charset=utf-8\n   *     this.is('html'); // => 'html'\n   *     this.is('text/html'); // => 'text/html'\n   *     this.is('text/*', 'application/json'); // => 'text/html'\n   *\n   *     // When Content-Type is application/json\n   *     this.is('json', 'urlencoded'); // => 'json'\n   *     this.is('application/json'); // => 'application/json'\n   *     this.is('html', 'application/*'); // => 'application/json'\n   *\n   *     this.is('html'); // => false\n   *\n   * @param {String|Array} types...\n   * @return {String|false|null}\n   * @api public\n   */\n\n  is(types) {\n    if (!types) return typeis(this.req);\n    if (!Array.isArray(types)) types = [].slice.call(arguments);\n    return typeis(this.req, types);\n  },\n\n  /**\n   * Return the request mime type void of\n   * parameters such as \"charset\".\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get type() {\n    const type = this.get('Content-Type');\n    if (!type) return '';\n    return type.split(';')[0];\n  },\n\n  /**\n   * Return request header.\n   *\n   * The `Referrer` header field is special-cased,\n   * both `Referrer` and `Referer` are interchangeable.\n   *\n   * Examples:\n   *\n   *     this.get('Content-Type');\n   *     // => \"text/plain\"\n   *\n   *     this.get('content-type');\n   *     // => \"text/plain\"\n   *\n   *     this.get('Something');\n   *     // => ''\n   *\n   * @param {String} field\n   * @return {String}\n   * @api public\n   */\n\n  get(field) {\n    const req = this.req;\n    switch (field = field.toLowerCase()) {\n      case 'referer':\n      case 'referrer':\n        return req.headers.referrer || req.headers.referer || '';\n      default:\n        return req.headers[field] || '';\n    }\n  },\n\n  /**\n   * Inspect implementation.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  inspect() {\n    if (!this.req) return;\n    return this.toJSON();\n  },\n\n  /**\n   * Return JSON representation.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  toJSON() {\n    return only(this, [\n      'method',\n      'url',\n      'header'\n    ]);\n  }\n};\n\n/**\n * Custom inspection implementation for newer Node.js versions.\n *\n * @return {Object}\n * @api public\n */\n\n/* istanbul ignore else */\nif (util.inspect.custom) {\n  module.exports[util.inspect.custom] = module.exports.inspect;\n}\n\n\n//# sourceURL=webpack:///../node_modules/koa/lib/request.js?");

/***/ }),

/***/ "../node_modules/koa/lib/response.js":
/*!*******************************************!*\
  !*** ../node_modules/koa/lib/response.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\n/**\n * Module dependencies.\n */\n\nconst contentDisposition = __webpack_require__(/*! content-disposition */ \"content-disposition\");\nconst ensureErrorHandler = __webpack_require__(/*! error-inject */ \"error-inject\");\nconst getType = __webpack_require__(/*! cache-content-type */ \"../node_modules/cache-content-type/index.js\");\nconst onFinish = __webpack_require__(/*! on-finished */ \"on-finished\");\nconst isJSON = __webpack_require__(/*! koa-is-json */ \"koa-is-json\");\nconst escape = __webpack_require__(/*! escape-html */ \"escape-html\");\nconst typeis = __webpack_require__(/*! type-is */ \"type-is\").is;\nconst statuses = __webpack_require__(/*! statuses */ \"statuses\");\nconst destroy = __webpack_require__(/*! destroy */ \"destroy\");\nconst assert = __webpack_require__(/*! assert */ \"assert\");\nconst extname = __webpack_require__(/*! path */ \"path\").extname;\nconst vary = __webpack_require__(/*! vary */ \"vary\");\nconst only = __webpack_require__(/*! only */ \"only\");\nconst util = __webpack_require__(/*! util */ \"util\");\n\n/**\n * Prototype.\n */\n\nmodule.exports = {\n\n  /**\n   * Return the request socket.\n   *\n   * @return {Connection}\n   * @api public\n   */\n\n  get socket() {\n    return this.res.socket;\n  },\n\n  /**\n   * Return response header.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  get header() {\n    const { res } = this;\n    return typeof res.getHeaders === 'function'\n      ? res.getHeaders()\n      : res._headers || {};  // Node < 7.7\n  },\n\n  /**\n   * Return response header, alias as response.header\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  get headers() {\n    return this.header;\n  },\n\n  /**\n   * Get response status code.\n   *\n   * @return {Number}\n   * @api public\n   */\n\n  get status() {\n    return this.res.statusCode;\n  },\n\n  /**\n   * Set response status code.\n   *\n   * @param {Number} code\n   * @api public\n   */\n\n  set status(code) {\n    if (this.headerSent) return;\n\n    assert(Number.isInteger(code), 'status code must be a number');\n    assert(code >= 100 && code <= 999, `invalid status code: ${code}`);\n    this._explicitStatus = true;\n    this.res.statusCode = code;\n    if (this.req.httpVersionMajor < 2) this.res.statusMessage = statuses[code];\n    if (this.body && statuses.empty[code]) this.body = null;\n  },\n\n  /**\n   * Get response status message\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get message() {\n    return this.res.statusMessage || statuses[this.status];\n  },\n\n  /**\n   * Set response status message\n   *\n   * @param {String} msg\n   * @api public\n   */\n\n  set message(msg) {\n    this.res.statusMessage = msg;\n  },\n\n  /**\n   * Get response body.\n   *\n   * @return {Mixed}\n   * @api public\n   */\n\n  get body() {\n    return this._body;\n  },\n\n  /**\n   * Set response body.\n   *\n   * @param {String|Buffer|Object|Stream} val\n   * @api public\n   */\n\n  set body(val) {\n    const original = this._body;\n    this._body = val;\n\n    // no content\n    if (null == val) {\n      if (!statuses.empty[this.status]) this.status = 204;\n      this.remove('Content-Type');\n      this.remove('Content-Length');\n      this.remove('Transfer-Encoding');\n      return;\n    }\n\n    // set the status\n    if (!this._explicitStatus) this.status = 200;\n\n    // set the content-type only if not yet set\n    const setType = !this.header['content-type'];\n\n    // string\n    if ('string' == typeof val) {\n      if (setType) this.type = /^\\s*</.test(val) ? 'html' : 'text';\n      this.length = Buffer.byteLength(val);\n      return;\n    }\n\n    // buffer\n    if (Buffer.isBuffer(val)) {\n      if (setType) this.type = 'bin';\n      this.length = val.length;\n      return;\n    }\n\n    // stream\n    if ('function' == typeof val.pipe) {\n      onFinish(this.res, destroy.bind(null, val));\n      ensureErrorHandler(val, err => this.ctx.onerror(err));\n\n      // overwriting\n      if (null != original && original != val) this.remove('Content-Length');\n\n      if (setType) this.type = 'bin';\n      return;\n    }\n\n    // json\n    this.remove('Content-Length');\n    this.type = 'json';\n  },\n\n  /**\n   * Set Content-Length field to `n`.\n   *\n   * @param {Number} n\n   * @api public\n   */\n\n  set length(n) {\n    this.set('Content-Length', n);\n  },\n\n  /**\n   * Return parsed response Content-Length when present.\n   *\n   * @return {Number}\n   * @api public\n   */\n\n  get length() {\n    const len = this.header['content-length'];\n    const body = this.body;\n\n    if (null == len) {\n      if (!body) return;\n      if ('string' == typeof body) return Buffer.byteLength(body);\n      if (Buffer.isBuffer(body)) return body.length;\n      if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body));\n      return;\n    }\n\n    return Math.trunc(len) || 0;\n  },\n\n  /**\n   * Check if a header has been written to the socket.\n   *\n   * @return {Boolean}\n   * @api public\n   */\n\n  get headerSent() {\n    return this.res.headersSent;\n  },\n\n  /**\n   * Vary on `field`.\n   *\n   * @param {String} field\n   * @api public\n   */\n\n  vary(field) {\n    if (this.headerSent) return;\n\n    vary(this.res, field);\n  },\n\n  /**\n   * Perform a 302 redirect to `url`.\n   *\n   * The string \"back\" is special-cased\n   * to provide Referrer support, when Referrer\n   * is not present `alt` or \"/\" is used.\n   *\n   * Examples:\n   *\n   *    this.redirect('back');\n   *    this.redirect('back', '/index.html');\n   *    this.redirect('/login');\n   *    this.redirect('http://google.com');\n   *\n   * @param {String} url\n   * @param {String} [alt]\n   * @api public\n   */\n\n  redirect(url, alt) {\n    // location\n    if ('back' == url) url = this.ctx.get('Referrer') || alt || '/';\n    this.set('Location', url);\n\n    // status\n    if (!statuses.redirect[this.status]) this.status = 302;\n\n    // html\n    if (this.ctx.accepts('html')) {\n      url = escape(url);\n      this.type = 'text/html; charset=utf-8';\n      this.body = `Redirecting to <a href=\"${url}\">${url}</a>.`;\n      return;\n    }\n\n    // text\n    this.type = 'text/plain; charset=utf-8';\n    this.body = `Redirecting to ${url}.`;\n  },\n\n  /**\n   * Set Content-Disposition header to \"attachment\" with optional `filename`.\n   *\n   * @param {String} filename\n   * @api public\n   */\n\n  attachment(filename, options) {\n    if (filename) this.type = extname(filename);\n    this.set('Content-Disposition', contentDisposition(filename, options));\n  },\n\n  /**\n   * Set Content-Type response header with `type` through `mime.lookup()`\n   * when it does not contain a charset.\n   *\n   * Examples:\n   *\n   *     this.type = '.html';\n   *     this.type = 'html';\n   *     this.type = 'json';\n   *     this.type = 'application/json';\n   *     this.type = 'png';\n   *\n   * @param {String} type\n   * @api public\n   */\n\n  set type(type) {\n    type = getType(type);\n    if (type) {\n      this.set('Content-Type', type);\n    } else {\n      this.remove('Content-Type');\n    }\n  },\n\n  /**\n   * Set the Last-Modified date using a string or a Date.\n   *\n   *     this.response.lastModified = new Date();\n   *     this.response.lastModified = '2013-09-13';\n   *\n   * @param {String|Date} type\n   * @api public\n   */\n\n  set lastModified(val) {\n    if ('string' == typeof val) val = new Date(val);\n    this.set('Last-Modified', val.toUTCString());\n  },\n\n  /**\n   * Get the Last-Modified date in Date form, if it exists.\n   *\n   * @return {Date}\n   * @api public\n   */\n\n  get lastModified() {\n    const date = this.get('last-modified');\n    if (date) return new Date(date);\n  },\n\n  /**\n   * Set the ETag of a response.\n   * This will normalize the quotes if necessary.\n   *\n   *     this.response.etag = 'md5hashsum';\n   *     this.response.etag = '\"md5hashsum\"';\n   *     this.response.etag = 'W/\"123456789\"';\n   *\n   * @param {String} etag\n   * @api public\n   */\n\n  set etag(val) {\n    if (!/^(W\\/)?\"/.test(val)) val = `\"${val}\"`;\n    this.set('ETag', val);\n  },\n\n  /**\n   * Get the ETag of a response.\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get etag() {\n    return this.get('ETag');\n  },\n\n  /**\n   * Return the response mime type void of\n   * parameters such as \"charset\".\n   *\n   * @return {String}\n   * @api public\n   */\n\n  get type() {\n    const type = this.get('Content-Type');\n    if (!type) return '';\n    return type.split(';', 1)[0];\n  },\n\n  /**\n   * Check whether the response is one of the listed types.\n   * Pretty much the same as `this.request.is()`.\n   *\n   * @param {String|Array} types...\n   * @return {String|false}\n   * @api public\n   */\n\n  is(types) {\n    const type = this.type;\n    if (!types) return type || false;\n    if (!Array.isArray(types)) types = [].slice.call(arguments);\n    return typeis(type, types);\n  },\n\n  /**\n   * Return response header.\n   *\n   * Examples:\n   *\n   *     this.get('Content-Type');\n   *     // => \"text/plain\"\n   *\n   *     this.get('content-type');\n   *     // => \"text/plain\"\n   *\n   * @param {String} field\n   * @return {String}\n   * @api public\n   */\n\n  get(field) {\n    return this.header[field.toLowerCase()] || '';\n  },\n\n  /**\n   * Set header `field` to `val`, or pass\n   * an object of header fields.\n   *\n   * Examples:\n   *\n   *    this.set('Foo', ['bar', 'baz']);\n   *    this.set('Accept', 'application/json');\n   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });\n   *\n   * @param {String|Object|Array} field\n   * @param {String} val\n   * @api public\n   */\n\n  set(field, val) {\n    if (this.headerSent) return;\n\n    if (2 == arguments.length) {\n      if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v));\n      else if (typeof val !== 'string') val = String(val);\n      this.res.setHeader(field, val);\n    } else {\n      for (const key in field) {\n        this.set(key, field[key]);\n      }\n    }\n  },\n\n  /**\n   * Append additional header `field` with value `val`.\n   *\n   * Examples:\n   *\n   * ```\n   * this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);\n   * this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');\n   * this.append('Warning', '199 Miscellaneous warning');\n   * ```\n   *\n   * @param {String} field\n   * @param {String|Array} val\n   * @api public\n   */\n\n  append(field, val) {\n    const prev = this.get(field);\n\n    if (prev) {\n      val = Array.isArray(prev)\n        ? prev.concat(val)\n        : [prev].concat(val);\n    }\n\n    return this.set(field, val);\n  },\n\n  /**\n   * Remove header `field`.\n   *\n   * @param {String} name\n   * @api public\n   */\n\n  remove(field) {\n    if (this.headerSent) return;\n\n    this.res.removeHeader(field);\n  },\n\n  /**\n   * Checks if the request is writable.\n   * Tests for the existence of the socket\n   * as node sometimes does not set it.\n   *\n   * @return {Boolean}\n   * @api private\n   */\n\n  get writable() {\n    // can't write any more after response finished\n    if (this.res.finished) return false;\n\n    const socket = this.res.socket;\n    // There are already pending outgoing res, but still writable\n    // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486\n    if (!socket) return true;\n    return socket.writable;\n  },\n\n  /**\n   * Inspect implementation.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  inspect() {\n    if (!this.res) return;\n    const o = this.toJSON();\n    o.body = this.body;\n    return o;\n  },\n\n  /**\n   * Return JSON representation.\n   *\n   * @return {Object}\n   * @api public\n   */\n\n  toJSON() {\n    return only(this, [\n      'status',\n      'message',\n      'header'\n    ]);\n  },\n\n  /**\n   * Flush any set headers, and begin the body\n   */\n  flushHeaders() {\n    this.res.flushHeaders();\n  }\n};\n\n/**\n * Custom inspection implementation for newer Node.js versions.\n *\n * @return {Object}\n * @api public\n */\nif (util.inspect.custom) {\n  module.exports[util.inspect.custom] = module.exports.inspect;\n}\n\n\n//# sourceURL=webpack:///../node_modules/koa/lib/response.js?");

/***/ }),

/***/ "../node_modules/ylru/index.js":
/*!*************************************!*\
  !*** ../node_modules/ylru/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nclass LRU {\n  constructor(max) {\n    this.max = max;\n    this.size = 0;\n    this.cache = new Map();\n    this._cache = new Map();\n  }\n\n  get(key, options) {\n    let item = this.cache.get(key);\n    const maxAge = options && options.maxAge;\n    // only call Date.now() when necessary\n    let now;\n    function getNow() {\n      now = now || Date.now();\n      return now;\n    }\n    if (item) {\n      // check expired\n      if (item.expired && getNow() > item.expired) {\n        item.expired = 0;\n        item.value = undefined;\n      } else {\n        // update expired in get\n        if (maxAge !== undefined) {\n          const expired = maxAge ? getNow() + maxAge : 0;\n          item.expired = expired;\n        }\n      }\n      return item.value;\n    }\n\n    // try to read from _cache\n    item = this._cache.get(key);\n    if (item) {\n      // check expired\n      if (item.expired && getNow() > item.expired) {\n        item.expired = 0;\n        item.value = undefined;\n      } else {\n        // not expired, save to cache\n        this._update(key, item);\n        // update expired in get\n        if (maxAge !== undefined) {\n          const expired = maxAge ? getNow() + maxAge : 0;\n          item.expired = expired;\n        }\n      }\n      return item.value;\n    }\n  }\n\n  set(key, value, options) {\n    const maxAge = options && options.maxAge;\n    const expired = maxAge ? Date.now() + maxAge : 0;\n    let item = this.cache.get(key);\n    if (item) {\n      item.expired = expired;\n      item.value = value;\n    } else {\n      item = {\n        value,\n        expired,\n      };\n      this._update(key, item);\n    }\n  }\n\n  keys() {\n    const cacheKeys = new Set();\n    const now = Date.now();\n\n    for (const entry of this.cache.entries()) {\n      checkEntry(entry);\n    }\n\n    for (const entry of this._cache.entries()) {\n      checkEntry(entry);\n    }\n\n    function checkEntry(entry) {\n      const key = entry[0];\n      const item = entry[1];\n      if (entry[1].value && (!entry[1].expired) || item.expired >= now) {\n        cacheKeys.add(key);\n      }\n    }\n\n    return Array.from(cacheKeys.keys());\n  }\n\n  _update(key, item) {\n    this.cache.set(key, item);\n    this.size++;\n    if (this.size >= this.max) {\n      this.size = 0;\n      this._cache = this.cache;\n      this.cache = new Map();\n    }\n  }\n}\n\nmodule.exports = LRU;\n\n\n\n//# sourceURL=webpack:///../node_modules/ylru/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Home() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Home\");\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./src/containers/Home/index.js?");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _containers_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/Home */ \"./src/containers/Home/index.js\");\n/* harmony import */ var _containers_Counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/Counter */ \"./src/containers/Counter/index.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n  path: \"/\",\n  exact: true,\n  component: _containers_Home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n  path: \"/counter\",\n  exact: true,\n  component: _containers_Counter__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n})));\n\n//# sourceURL=webpack:///./src/routes.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/server/render.js\");\nvar Koa = __webpack_require__(/*! koa */ \"../node_modules/koa/lib/application.js\");\n\nvar _ = __webpack_require__(/*! koa-route */ \"koa-route\");\n\n\nvar app = new Koa(); // 设置服务端静态目录\n\napp.use(__webpack_require__(/*! koa-static */ \"koa-static\")('public')); // 这里路径改为*， 不管哪个路径，都组走这里\n\napp.use(_.get('*', _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\napp.listen(3000, function () {\n  console.log('server start at 3000');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/render.js":
/*!******************************!*\
  !*** ./src/server/render.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Header */ \"./src/components/Header/index.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes */ \"./src/routes.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store */ \"./src/store/index.js\");\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (ctx, next) {\n  var context = {};\n  var store = Object(_store__WEBPACK_IMPORTED_MODULE_6__[\"getServerStore\"])();\n  var html = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_4__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__[\"Provider\"], {\n    store: store\n  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_0__[\"StaticRouter\"], {\n    context: {},\n    location: ctx.req.url\n  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__[\"Fragment\"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    className: \"container\",\n    style: {\n      marginTop: 70\n    }\n  }, _routes__WEBPACK_IMPORTED_MODULE_2__[\"default\"])))));\n  ctx.body = \"\\n    <!DOCTYPE html>\\n    <html lang=\\\"en\\\">\\n    <head>\\n        <meta charset=\\\"UTF-8\\\">\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n        <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"ie=edge\\\">\\n        <title>Document</title>\\n        <!-- \\u6700\\u65B0\\u7248\\u672C\\u7684 Bootstrap \\u6838\\u5FC3 CSS \\u6587\\u4EF6 -->\\n        <link rel=\\\"stylesheet\\\" href=\\\"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css\\\">\\n    </head>\\n    <body>\\n        <div id=\\\"root\\\">\".concat(html, \"</div>\\n        <script src=\\\"/client.js\\\"></script>\\n    </body>\\n    </html>\\n    \");\n});\n\n//# sourceURL=webpack:///./src/server/render.js?");

/***/ }),

/***/ "./src/store/action-types.js":
/*!***********************************!*\
  !*** ./src/store/action-types.js ***!
  \***********************************/
/*! exports provided: INCREMENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INCREMENT\", function() { return INCREMENT; });\nvar INCREMENT = 'INCREMENT';\n\n//# sourceURL=webpack:///./src/store/action-types.js?");

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

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: getServerStore, getClientStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getServerStore\", function() { return getServerStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getClientStore\", function() { return getClientStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ \"redux-logger\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ \"./src/store/reducers/index.js\");\n // import saga from 'redux-saga'\n\n\n\nfunction getServerStore() {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_2__[\"default\"], Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_logger__WEBPACK_IMPORTED_MODULE_1___default.a));\n}\nfunction getClientStore() {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_2__[\"default\"], Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_logger__WEBPACK_IMPORTED_MODULE_1___default.a));\n}\n\n//# sourceURL=webpack:///./src/store/index.js?");

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

/***/ "./src/store/reducers/index.js":
/*!*************************************!*\
  !*** ./src/store/reducers/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counter */ \"./src/store/reducers/counter.js\");\n\n\nvar resucers = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  counter: _counter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (resucers);\n\n//# sourceURL=webpack:///./src/store/reducers/index.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi babel-polyfill ./src/server/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server/index.js */\"./src/server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/server/index.js?");

/***/ }),

/***/ "accepts":
/*!**************************!*\
  !*** external "accepts" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"accepts\");\n\n//# sourceURL=webpack:///external_%22accepts%22?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "content-disposition":
/*!**************************************!*\
  !*** external "content-disposition" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"content-disposition\");\n\n//# sourceURL=webpack:///external_%22content-disposition%22?");

/***/ }),

/***/ "content-type":
/*!*******************************!*\
  !*** external "content-type" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"content-type\");\n\n//# sourceURL=webpack:///external_%22content-type%22?");

/***/ }),

/***/ "cookies":
/*!**************************!*\
  !*** external "cookies" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookies\");\n\n//# sourceURL=webpack:///external_%22cookies%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "delegates":
/*!****************************!*\
  !*** external "delegates" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"delegates\");\n\n//# sourceURL=webpack:///external_%22delegates%22?");

/***/ }),

/***/ "depd":
/*!***********************!*\
  !*** external "depd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"depd\");\n\n//# sourceURL=webpack:///external_%22depd%22?");

/***/ }),

/***/ "destroy":
/*!**************************!*\
  !*** external "destroy" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"destroy\");\n\n//# sourceURL=webpack:///external_%22destroy%22?");

/***/ }),

/***/ "error-inject":
/*!*******************************!*\
  !*** external "error-inject" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"error-inject\");\n\n//# sourceURL=webpack:///external_%22error-inject%22?");

/***/ }),

/***/ "escape-html":
/*!******************************!*\
  !*** external "escape-html" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"escape-html\");\n\n//# sourceURL=webpack:///external_%22escape-html%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "fresh":
/*!************************!*\
  !*** external "fresh" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fresh\");\n\n//# sourceURL=webpack:///external_%22fresh%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "http-assert":
/*!******************************!*\
  !*** external "http-assert" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-assert\");\n\n//# sourceURL=webpack:///external_%22http-assert%22?");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-errors\");\n\n//# sourceURL=webpack:///external_%22http-errors%22?");

/***/ }),

/***/ "is-generator-function":
/*!****************************************!*\
  !*** external "is-generator-function" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-generator-function\");\n\n//# sourceURL=webpack:///external_%22is-generator-function%22?");

/***/ }),

/***/ "koa-compose":
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compose\");\n\n//# sourceURL=webpack:///external_%22koa-compose%22?");

/***/ }),

/***/ "koa-convert":
/*!******************************!*\
  !*** external "koa-convert" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-convert\");\n\n//# sourceURL=webpack:///external_%22koa-convert%22?");

/***/ }),

/***/ "koa-is-json":
/*!******************************!*\
  !*** external "koa-is-json" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-is-json\");\n\n//# sourceURL=webpack:///external_%22koa-is-json%22?");

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

/***/ "mime-types":
/*!*****************************!*\
  !*** external "mime-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mime-types\");\n\n//# sourceURL=webpack:///external_%22mime-types%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ }),

/***/ "on-finished":
/*!******************************!*\
  !*** external "on-finished" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"on-finished\");\n\n//# sourceURL=webpack:///external_%22on-finished%22?");

/***/ }),

/***/ "only":
/*!***********************!*\
  !*** external "only" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"only\");\n\n//# sourceURL=webpack:///external_%22only%22?");

/***/ }),

/***/ "parseurl":
/*!***************************!*\
  !*** external "parseurl" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"parseurl\");\n\n//# sourceURL=webpack:///external_%22parseurl%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"querystring\");\n\n//# sourceURL=webpack:///external_%22querystring%22?");

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

/***/ "statuses":
/*!***************************!*\
  !*** external "statuses" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"statuses\");\n\n//# sourceURL=webpack:///external_%22statuses%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ }),

/***/ "type-is":
/*!**************************!*\
  !*** external "type-is" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"type-is\");\n\n//# sourceURL=webpack:///external_%22type-is%22?");

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

/***/ }),

/***/ "vary":
/*!***********************!*\
  !*** external "vary" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vary\");\n\n//# sourceURL=webpack:///external_%22vary%22?");

/***/ })

/******/ });