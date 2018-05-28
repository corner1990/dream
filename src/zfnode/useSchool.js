//common.js规范 规定了没一个文件都是一个模块，模块之间是相互独立的
//规范规定了 导出的时候使用module.exports
//定义了如何引用一个模块require

//一个模块外边给你加了一个闭包(function (exports, require, module, __dirname, __filename) {})
//模块可以省略后缀 如果是js或者json或者node文件可以省略后缀
console.time('school');
// let res = require('./school')
// 同步读取，并且为了节约性能，还有缓存，将 module.exports 后边的结果进行缓存， 如果又缓存，直接返回结果

let path = require('path')
let fs = require('fs')
let vm = require('vm')
function Module (filename) {
  this.filename = filename
  this.exports = {}
}

Module._extentions = ['.js', '.json', 'node']
Module._cache = {}
Module.resolvePathName = filename => {
  let p = path.resolve(__dirname, filename)
  
  if(!path.extname(p)) {

    for(var i =0, arr = Module._extentions, len = arr.length; i < len; i++) {
      let newPath = `${p}${arr[i]}`
      //如果访问的文件不存在， 就会发生异常
      try {
        fs.accessSync(newPath)
        return newPath
      } catch(e) {}
    }
  } else {
    try {
        fs.accessSync(p)
        return p
      } catch(e) {}
  }
}

Module._extentions['js'] = module => {

  let script = fs.readFileSync(module.filename, {charset:'utf-8'});
  let fnStr = Module.wrap(script)
  
  //在这里拿到函数执行后的结果通过
  vm.runInThisContext(fnStr).call(module.exports, module.exports,req, module)

}
Module._extentions['json'] = module => {
  let script = fs.readFileSync(module.filename);
  module.exports = JSON.parse(script)
  return module.exports
}
//函数执行字符串拼接
Module.wrapper = [
  '(function (exports, require, module, __dirname, __filename) {', '})'
]

Module.wrap = script => {
  return `${Module.wrapper[0]}${script}${Module.wrapper[1]}`
}
Module.prototype.load = function (filename) {
  //模块可能是json 也有可能是js
  let ext = path.extname(filename).slice(1) //去掉拿到文件后缀名上多余的. .js || .json
  //这里的this是Module的实例对象
  Module._extentions[ext](this)
}

function req (filename) {//filename是文件名，文件名可能没有后缀
  //我们需要一个绝对路径来，缓存是根据绝对路径的来的
 filename =  Module.resolvePathName(filename)
 if(!filename) return new Error('not find file')
 let cacheModule = Module._cache[filename]
 if(cacheModule) return cacheModule

  // 没有模块 创建模块
  let module = new Module(filename) //创建模块
  
  module.load(filename) //夹在这个模块{filename: 'c:xx', exports: 'hello world'}
  //把夹在好的模块加入缓存
  Module._cache[filename] = module
  return module.exports

}

// let str = req('./school')
let json = req('./school.json')
console.log(json);
console.time('school');



