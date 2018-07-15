// let fs = require('fs')
// let path = require('path')

// let rs = fs.createReadStream(path.join(__dirname, './1.txt'), {
//   flags: 'r',
//   autoClose: true,
//   encoding: 'utf8',
//   start: 0,
//   end: 6,
//   highWaterMark: 3
// })
// // 监听readable事件
// rs.on('readable', () => {
//   // 默认先会读满缓存区
//   // 我们在这里不停的消费，等缓存区为空时会默认触发readable事件
//   let res = rs.read(2)
//   console.log('res', res)
//   // 这里消费玩以后缓存曲的length为1
//   console.log('res._readableState.length', rs._readableState.length)
//   // 我们在一秒后打印缓存区的长度，发现是4
//   setTimeout(() => {
//     console.log('res._readableState.length', rs._readableState.length)
//   }, 1000);
// })


let fs = require('fs')
let path = require('path')
let ReadStream = require('./ReadableReadStream')

let rs = new ReadStream(path.join(__dirname, './1.txt'), {
  flag: 'r',
  autoClose: true,
  encoding: 'utf8',
  start: 0,
  end: 6,
  highWaterMark: 3
})
// 监听readable事件
rs.on('readable', () => {
  // 默认先会读满缓存区
  // 我们在这里不停的消费，等缓存区为空时会默认触发readable事件
  let res = rs.read(2)
  console.log('res', res)
  // 这里消费玩以后缓存曲的length为1
  console.log('res.length', rs.length)
  // 我们在一秒后打印缓存区的长度，发现是4
  setTimeout(() => {
    console.log('res.length', rs.length)
  }, 1000);
})