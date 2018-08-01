# TCP/IP学习(三)

> 这里写一个简单的聊天室，用来理解和使用net的api，方便自己理解，

### 聊天室设计

> 可以展示当前在线人数，在线用户，使用指定命令进行操作

- 默认情况下用户应该是匿名状态
- 通过关机命令改名：r: newName
-  支持显示在线用户列表 l
-  广播功能： b: xxx
-  私聊的功能： p:nickName: msg

### 创建服务器

```javascript
const net = require('net')
const clients = {} // 保存用户
// 保存所有的用户名
let nickNames = []

const server = net.createServer(function (scoket) {
  server.maxConnections = 20
  // 创建用户ID


  // 用户名
  scoket.setEncoding('utf8')
  scoket.on('data', chunk => {
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
```

### 设置默认参数

```javascript
// 默认情况下用户应该是匿名状态
// 通过关机命令改名：r: newName
// 支持显示在线用户列表 l
// 广播功能： b: xxx
// 私聊的功能： p:nickName: msg

const net = require('net')
const clients = {} // 保存用户
// 保存所有的用户名
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

```

### 完成设置（修改）昵称

```javascript
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
// 链接服务器：输入 r:new name 
// 服务器会返回给你结果
```



### 实现广播逻辑

```javascript
/**
 * @description 广播消息
 * @param {*} id 用户唯一标识
 * @param {*} msg 发送的消息
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

// 链接服务器以后输入： b:testMsg 
// 其他用户就能收到消息
```

### 实现展示用户列表

```javascript
/**
 * 展示用户列表
 * @param {string} id 用户位移表示
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
// 链接服务器，输入： l 回车
// 展示当前用户列表
```

### 实现私聊

```javascript
/**
 * @description 私聊
 * @param {string} nickname 私聊的目标用户
 * @param {string} msg 发送的消息
 */
function private(nickname, msg, id) {
  let users
  // 从连接列表拿到当前用的昵称
  let form = clients[id].nickName
  // 找到当前用户要@的人，这里默认用户名不能重复
  nickNames.forEach(name => {
    if(clients[name].nickName === nickname) {
      users = clients[name]
    }
  })
  // 发送消息给用户
  users.scoket.write(`${form}: ${msg}\r\n`)
}
// 测试
// 链接当前服务，输入： p:xxx:我们走私吧
```

### 这里是完整的代码

```javascript
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
 * @param {string} nickname 私聊的目标用户
 * @param {string} msg 发送的消息
 */
function private(nickname, msg, id) {
  let users
  // 从连接列表拿到当前用的昵称
  let form = clients[id].nickName
  // 找到当前用户要@的人，这里默认用户名不能重复
  nickNames.forEach(name => {
    if(clients[name].nickName === nickname) {
      users = clients[name]
    }
  })
  // 发送消息给用户
  users.scoket.write(`${form}: ${msg}\r\n`)
}

/**
 * 展示用户列表
 * @param {string} id 用户位移表示
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
 * @param {*} id 用户唯一标识
 * @param {*} msg 发送的消息
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

```

### 结束

> 通过上边几十行代码，实现了一个简单的tcp聊天室，聊天室支持私聊，修改昵称，群聊，查看在线用户，
>
> 通过上述的练习，对net的基本功能，流有了一定的认识
>
> tcp是没有状态的，所以需要我们自己定义规则，然后按照自己定义的规则做一定的处理，http作为应用层，就会有很多可以操作的地方，如cookie，缓存，分片等等