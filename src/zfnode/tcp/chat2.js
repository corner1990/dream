// 默认情况下用户应该是匿名状态
// 通过关机命令改名：r: newName
// 支持显示在线用户列表 l
// 广播功能： b: xxx
// 私聊的功能： p:nickName: msg

const net = require('net')
const clients = {} // 保存用户
// 保存所有的用户名
let nickNames = []
// 当客户端连接服务室 辉触发回调函数，默认提示输入用户名，就可以通信了
// 自己的说的话，不应该通知自己，应该通知别人呢
/**
 * @description 重命名
 * @param {string} id 
 * @param {string} name 
 */
function rename (id, name) {
  // 如果存在这个用户，就赋值
  let res 
  // 判断是否又当前用户名
  nickNames.forEach(key => {
    if (clients[key].nickName === name) res = true
  })
  // 如果当前用户名已经存在，提示用户重新填写用户名
  // 如果目前没有存在该用户名，则让用户修改
  if (res) return clients[id].scoket.write('当前用户名已经存在，请重新输入\r\n')
  else clients[id].nickName = name
  clients[id].scoket.write(`您修改昵称成功，当前昵称${name}\r\n`)
}
/**
 * @description 私聊
 * @param {*} nickname 
 * @param {*} msg 
 */
function private(nickname, msg, id) {
  let users
  let form = clients[id].nickName
  nickNames.forEach(name => {
    if(clients[name].nickName === nickname) {
      users = clients[name]
    }
  })

  users.scoket.write(`${form}: ${msg}\r\n`)
}

/**
 * 展示用户列表
 * @param {string} id 
 */
function  showUsers(id, scoket) {
  let str = '当前在线用户：\r\n'
  let nameList = ''
  // 遍历 拿到所有的
  nickNames.forEach(key => {
    if (key !== id) {
      nameList += `${clients[key].nickName}\r\n`
    }
  })
  // 返回用户列表
  scoket.write(str + nameList)
}

/**
 * @description 广播消息
 * @param {*} id 
 * @param {*} msg 
 */
function broadcast(id, msg) {
  // 广播消息的用户昵称
  let name = clients[id].nickName
  nickNames.forEach(key => {
    if (key !== id) {
      clients[key].scoket.write(`${name}: ${msg} \r\n`)
    }
  })
}

const server = net.createServer(function (scoket) {
  server.maxConnections = 20
  // 创建用户ID
  let key = scoket.remoteAddress + scoket.remotePort
  clients[key] = {nickName: '匿名', scoket}
  nickNames.push(key)

  server.getConnections((err, count) => {
    scoket.write(`欢迎来到聊天室 当前用户数量：${count}个， 请输入用户名\r\n`);
  })

  // 用户名
  scoket.setEncoding('utf8')
  scoket.on('data', chunk => {
    // 处理换行回车的问题
    chunk = chunk.replace(/(\r\n)|(\r)/, '')
    let chars = chunk.split(':')

    switch (chars[0]) {
      case 'r':
        //改名
        rename(key, chars[1])
        break;
      case 'l':
        //展示用户列表
        showUsers(key, scoket)
        break;
      case 'b':
        //广播
        broadcast(key, chars[1])
        break;
      case 'p':
        //私聊
        private(chars[1], chars[2], key)
        break;
      default:
        scoket.write('您输入的问题无法解毒，请重新输入\r\n')
        break;
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
