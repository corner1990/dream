const net = require('net')
const clients = {} // 保存用户
// 
let nickNames = []
// 当客户端连接服务室 辉触发回调函数，默认提示输入用户名，就可以通信了
// 自己的说的话，不应该通知自己，应该通知别人呢
/**
 * @description 广播消息
 * @param {*} nickName 
 * @param {*} chunk 
 */
function broadcast(nickName, chunk) {
  nickNames.forEach(key => {
    if (key !== nickName) {
      clients[key].write(`${key}: ${chunk} \r\n`)
    }
  })
}

const server = net.createServer(function (scoket) {
  server.maxConnections = 3
  server.getConnections((err, count) => {
    scoket.write(`欢迎来到聊天室 当前用户数量：${count}个， 请输入用户名\r\n`);
  })
  // 用户名
  let nickName
  scoket.setEncoding('utf8')
  scoket.on('data', chunk => {
    // 处理换行回车的问题
    chunk = chunk.replace(/(\r\n)|(\r)/, '')
    // 判断是否有用户名，没有的话就把当前的值作为用户名
    if (nickName) {
      // 有用户名的时候直接发言 broadcast
      broadcast(nickName, chunk)
    } else {
      // 保存连接 昵称
      nickName = chunk
      clients[nickName] = scoket
      nickNames.push(nickName)
      scoket.write(`您的新用户名是：${nickName}`)
    }
  })
})
let port = 3000
server.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})

// 当服务端发生错误时，会调用监听函数
server.on('error', err => {
  if (err.code == 'EADDRINUSE') server.listen(++port)
  if (err) console.log(err)
})

// 当服务器错误时
server.on('close', () => {
  console.log('服务端关闭')
})
