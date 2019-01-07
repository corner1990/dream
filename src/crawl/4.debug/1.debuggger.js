// let debug = require('debug')
let debug = require('./debuger')

// 此模块是用来写日志的
let loagerA = debug('juejin:a')
console.log('test')
// console.log语句的输出不管任何时候都会输出，
// 某些语句，我们需要开发的时候输出，上线的时候不输出
loagerA('a')