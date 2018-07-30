const net = require('net')
let path = require('path')
let rs = require('fs').createReadStream(path.join(__dirname, './2.txt'))
let server = net.createServer(scoket => {
  rs.on('data', chunk => {
    let flag = scoket.write(chunk)
    console.log(flag)
    console.log(`当前缓存区大小:${scoket.bufferSize}`)
  })
  scoket.on('drain', () => {
    console.log('抽干')
  })
})

// 如果端口号被占用了怎么办
let port = 3000
server.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})

// // telnet IP地址 端口号 ： 可以连接服务器
//这里只是创建文件
// let fs = require('fs')
// let path = require('path')
// fs.writeFileSync(path.join(__dirname, './2.txt'), Buffer.alloc(1024*1024*10))
