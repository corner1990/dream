//utils是一个工具方法
//继承  只继承公有方法
//util.inherits()

// 可以让console.log打印出对象的隐藏属性
//util.inspect()


// util.promisify()
let fs = require('fs')
let {promisify, inspect} = require('util')
let path = require('path')

let read = promisify(fs.readFile)

read(path.join(__dirname, './1.txt'), 'utf8')
.then(data => {
  console.log(data)
})


// console.dir(Array.prototype, {showHidden: true});
console.log(inspect(Array.prototype, {showHidden: true}));
