/**
 * @param {  } source 文件的源内容
 */
// module.exports = function (source) {
//     // 同步写法
//     console.log('laogding')
//     return source
//     // this.callback(source)
// }
const path = require('path')
const loaderUtils = require('loader-utils')
const schemaUtils = require('schema-utils')

let json = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    }
}

module.exports = function (source) {
    // 从this上获取我们配置插件时候的传入的参数
    let opts = loaderUtils.getOptions(this)
    console.log('opts', opts)
    
    // 效验参数合法性
    schemaUtils(json, opts, 'loader-logger')
    // 同步写法
    let cb = this.async()
    setTimeout(() => {
        cb(null, source)
    }, 2000)
    // console.log('laogding', Object.keys(this))
}
  /* 
     [ 'version',
  'emitWarning',
  'emitError',
  'exec',
  'resolve',
  'getResolve',
  'emitFile',
  'rootContext',
  'webpack',
  'sourceMap',
  '_module',
  '_compilation',
  '_compiler',
  'fs',
  'target',
  'loadModule',
  'context',
  'loaderIndex',
  'loaders',
  'resourcePath',
  'resourceQuery',
  'async',
  'callback',
  'cacheable',
  'addDependency',
  'dependency',
  'addContextDependency',
  'getDependencies',
  'getContextDependencies',
  'clearDependencies',
  'resource',
  'request',
  'remainingRequest',
  'currentRequest',
  'previousRequest',
  'query',
  'data' ]
laogding [ 'version',
  'emitWarning',
  'emitError',
  'exec',
  'resolve',
  'getResolve',
  'emitFile',
  'rootContext',
  'webpack',
  'sourceMap',
  '_module',
  '_compilation',
  '_compiler',
  'fs',
  'target',
  'loadModule',
  'context',
  'loaderIndex',
  'loaders',
  'resourcePath',
  'resourceQuery',
  'async',
  'callback',
  'cacheable',
  'addDependency',
  'dependency',
  'addContextDependency',
  'getDependencies',
  'getContextDependencies',
  'clearDependencies',
  'resource',
  'request',
  'remainingRequest',
  'currentRequest',
  'previousRequest',
  'query',
  'data' ]
    */