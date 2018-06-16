require('./p')
// 直接引入 是文件，先去查找文件
// 多个模块回组成一个包，报的表示方法就是有一个package.json
// 如果有这个文件夹，但是没有package.json， 就回去当前目录下查找index.js,如果在没有，就去找index.json

// console.log(module.paths);//第三方夹在路径
//第三方模块不能加./

//exports和module.exports有什么区别
//module里存放这exports, exports == module.exports


var event = require('./event')
let util = require('util')

function Girl () {}

util.inherits(Girl, event)

var girl = new Girl
function buy (str) {
  console.log('buy buy buy '+ str);
}

function eat () {
  console.log('eat eat eat!');
}

function read () {
  console.log('reading book at book city');
}

function walk () {
  console.log('walk at roald');
}
girl.on('shop', buy)
girl.on('shop', buy)
girl.on('shop', buy)
girl.on('met', eat)
girl.once('read', read)
// girl.prependOn('shop', walk)

girl.off('shop', buy)
girl.emit('shop', 'street')
console.log(girl.listeners())
// girl.emit('read')

// girl.emit('逛街')



