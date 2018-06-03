require('./p')
// 直接引入 是文件，先去查找文件
// 多个模块回组成一个包，报的表示方法就是有一个package.json
// 如果有这个文件夹，但是没有package.json， 就回去当前目录下查找index.js,如果在没有，就去找index.json

console.log(module.paths);//第三方夹在路径
//第三方模块不能加./



//exports和module.exports有什么区别
//module里存放这exports, exports == module.exports