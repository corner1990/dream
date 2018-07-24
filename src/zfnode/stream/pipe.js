// // 像读一点 写一点
// let fs = require('fs')
// let path = require('path')
// let rs = fs.createReadStream(path.join(__dirname, './1.txt'), {
//   highWaterMark: 4 //这里为了展示读多少，写多少，在这里设置highWaterMark为3字节
// })
// let ws = fs.createWriteStream(path.join(__dirname, './2.txt'), {
//   highWaterMark: 1
// })
// // 用来展示触发了几次data事件
// let index = 0
// // 如果写不完，会放入缓存中去
// rs.on('data', (chunk) => { //chunk 读到的内容
//   let flag = ws.write(chunk)
//   // 如果没有写完，暂停读取
//   if (!flag)rs.pause()
//   console.log(`第${++index}次读取`)
// })

// // 等到ws写完以后继续读取
// ws.on('drain', () => rs.resume())

// // 官方实现pipe方法，就是写读一点，写一点
// let fs = require('fs')
// let path = require('path')
// let rs = fs.createReadStream(path.join(__dirname, './1.txt'), {
//   highWaterMark: 4 //这里为了展示读多少，写多少，在这里设置highWaterMark为3字节
// })
// let ws = fs.createWriteStream(path.join(__dirname, './2.txt'), {
//   highWaterMark: 1
// })

// rs.pipe(ws)

// //这里自己手动实现pipe方法
// // 官方实现pipe方法，就是写读一点，写一点
// let fs = require('fs')
// let path = require('path')
// let ReadStream = require('./ReadStreamPipe')
// let WriteStream = require('./WriteStream')
// let rs = new ReadStream(path.join(__dirname, './1.txt'))
// let ws = new WriteStream(path.join(__dirname, './2.txt'))


// //这里我们调用自己实现的pipe方法
// rs.pipe(ws)

// radable 方法
// 当我们创建一个流，就会先把缓存去填满，等待你自己消费
// 如果当前的缓存区被清空后，回再次触发readable事件
// 当消费小于最高水平线，就会自动添加highWaterMark这么多的数据
let fs = require('fs')
let path = require('path')

let rs = fs.createReadStream(path.join(__dirname, './1.txt'), {
  highWaterMark: 3 //这里为了展示读多少，写多少，在这里设置highWaterMark为3字节
})
rs.on('readable', () => {
  let res = rs.read(1)
  // rs._readableState.length 缓存区的个数
  console.log(rs._readableState.length)
  res = rs.read(1)
  console.log(rs._readableState.length)
  // 展示每次自动填充数据至最高水位线
  setTimeout(() => {
    console.log(rs._readableState.length)
  }, 50);
})


