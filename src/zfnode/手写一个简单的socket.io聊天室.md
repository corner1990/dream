使用socket.io写一个聊天室

> 之前学习了常用的api，以及概念，这里为了简单的使用，写一个demo，为了方便查找api，这里给一个传送门[socket.io](https://github.com/socketio/socket.io/blob/master/docs/README.md)

### 准备

- 老规矩，新建一个目录，一个index.html, app.js
- index.html 为客户端
- app.js 为服务端

### 基础代码

> 首先使用最简单的代码，然后是实现客户管和服务端链接成功

- index.html

  - 使用html初始文档，然后引入socket.io脚本 `<script src="/socket.io/socket.io.js"></script>`, 这个是固定写法，不可以改变
  - 创建socket对象
  - 链接服务端，并监听链接事件`connect`, `message`事件

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>socket.io</title>
  </head>
  <body>
      <h2>socket.io</h2>
  
      <script src="/socket.io/socket.io.js"></script>
      <script>
          let socket = io() // 相当于new Websocket()
        	// 客户端和服务端链接成功的回调函数   
          socket.on('connect', function() {
              console.log('客户端链接成功')
              socket.send('hello')
          })
          // 客户端接收到消息后的回调函数
          socket.on('message', function (msg) {
              console.log(msg)
          })
      </script>
  </body>
  </html>
  ```

- app.js

  ```javascript
  let express = require('express')
  let http = require('http')
  
  let app = express()
  app.use(express.static(__dirname))
  app.get('/', function (res, req) {
      res.header('Content-Type', 'text/html;charset=utf8')
      res.sendFile(path.resolve('index.html'))
  })
  let server = http.createServer(app)
  
  // 因为websocket协议是要依赖http协议实现握手的，所以需要把httpServer的实例传递给socket.io
  let socketIo = require('socket.io')
  let io = socketIo(server)
  // 在服务器监听客户端的链接
  io.on('connection', socket => {
      console.log('客户端连接到服务器')
      // 监听接受客户端发过来的消息
      socket.on('message', msg => {
          console.log('客户端等候扫服务器的消息', msg)
          // 像客户端发送数据
          socket.send(`服务器说：${msg}`)
      })
      socket.on('disconect', function () {
          console.log('断开连接')
      })
      socket.on('error', () => {
          console.log('连接错误')
      })
  })
  
  server.listen(9999)
  ```

### 实现基本聊天

  > 为了美化一下样式，这里使用了bootstarp，

  - index.html 修改如下

      - 简单的布局，头部，消息体，消息输入框和发送消息按钮
      - 修改，我们这里把消息(msg：一个json字符串),解析出来，拿到对应的发送消息的用户名，消息内容，小时发送的时间，然后动态创建li，将内容加入li以后再动态加入到消息列表
      - 发送消息的时候检查消息是否为空，为空则警告用户，不为空则发送小洗，并将输入框清空

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossorigin="anonymous">
        <title>socket.io</title>
    </head>
    <body>
        <div class="container">
            <div class="row">
               <div class="row-md-12">
                   <div class="panel panel-default">
                       <!-- 头部 -->
                        <header class="panel-heading text-center">
                            <h4>welcome to talk room</h4>
                        </header>
                        <!-- 消息列表 -->
                       <div class="panel-body">
                            <ul class="list-group" id="msg-list" style="list-style: none;">
                            </ul>
                       </div>
                       <!-- 消息输入，发送按钮 -->
                        <div class="panel-footer">
                            <div class="row-md-10">
                                <input type="text" id="content" class="form-control">
                                <button id="btn" class="btn btn-primary">发送消息</button>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        </div>
        <script src="/socket.io/socket.io.js"></script>
        <script>
            let socket = io() // 相当于new Websocket()
    
            let ipt = document.querySelector('#content')
            let btn = document.querySelector('#btn')
            let msgList = document.querySelector('#msg-list')
            let LI = document.createElement('li')
    
    
            socket.on('connect', function () {
                console.log('客户端链接成功')
            })
            socket.on('message', function (msg) {
                let li = LI.cloneNode()
                msg = JSON.parse(msg)
                li.innerHTML = `<span style="color: orange">${msg.name}:&emsp;</span><span style="color: #06c;">${msg.msg}</span><span style="float: right;">${(new Date(msg.timer)).toLocaleString()}</span>`
                msgList.appendChild(li)
            })
            
            btn.addEventListener('click',function (params) {
                let msg = ipt.value
                if (msg) {
                    socket.emit('message', msg)
                    ipt.value = ''
                } else {
                    alert('发送的消息不能为空！')
                }
            }, false)
        </script>
    </body>
    </html>
    ```

  - app.js修改如下

      - 将用户第一次发送的消息作为用户的昵称
      - 接收到消息以后判断用户名是否存在，不存在就将当前消息作为用户名保存，并通知其他客户端，该用户(这个用户的第一个消息的名字)，加入了聊天
      - 正常组装发送消息
      - 消息的内容为：发送者的名称，消息内容，消息时间

    ```javascript
    let express = require('express')
    let http = require('http')
    
    let app = express()
    app.use(express.static(__dirname))
    app.get('/', function (res, req) {
        res.header('Content-Type', 'text/html;charset=utf8')
        res.sendFile(path.resolve('index.html'))
    })
    let server = http.createServer(app)
    
    // 因为websocket协议是要依赖http协议实现握手的，所以需要把httpServer的实例传递给socket.io
    let socketIo = require('socket.io')
    let io = socketIo(server)
    // 在服务器监听客户端的链接
    let sockets = {} // 保存用户
    let SYS = '系统提示'
    let t = new Date() // 用来处理消息发送时间
    io.on('connection', socket => {
        console.log('客户端连接到服务器', socket.name)
        let username;
        // 监听接受客户端发过来的消息
        socket.on('message', msg => {
            if (username) {
                username = msg
                // 消息内容
                let message = {
                    name: SYS,
                    timer: t.getTime(),
                    msg: `${msg} 进入聊天`
                }
                // 将对象保存，方便后期使用
                sockets[username] = socket
                // 像除了自己别的用户广播消息
                socket.broadcast.emit('message', JSON.stringify(message))
            } else {
                // 像客户端发送数据
                let message = {
                    name: username,
                    timer: t.getTime(),
                    msg: msg
                }
                io.emit('message', JSON.stringify(message))
            }
            
        })
        socket.on('disconect', function () {
            console.log('断开连接')
        })
        socket.on('error', () => {
            console.log('连接错误')
        })
    })
    
    server.listen(9999)
    ```

### 实现私聊

- index.html

  - 给li添加点击事件，拿到需要私聊的名称，然后赋值到输入框中

  ```javascript
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">
      <title>socket.io</title>
  </head>
  <body>
      <div class="container">
          <div class="row">
             <div class="row-md-12">
                 <div class="panel panel-default">
                      <header class="panel-heading text-center">
                          <h4>welcome to talk room</h4>
                      </header>
                     <div class="panel-body">
                          <ul class="list-group" id="msg-list" style="list-style: none;">
                          </ul>
                     </div>
                      <div class="panel-footer">
                          <div class="row-md-10">
                              <input type="text" id="content" class="form-control">
                              <button id="btn" class="btn btn-primary">发送消息</button>
                          </div>
                      </div>
                 </div>
             </div>
          </div>
      </div>
      <script src="/socket.io/socket.io.js"></script>
      <script>
          let socket = io() // 相当于new Websocket()
  
          let ipt = document.querySelector('#content')
          let btn = document.querySelector('#btn')
          let msgList = document.querySelector('#msg-list')
          let LI = document.createElement('li')
  
  
          socket.on('connect', function () {
              console.log('客户端链接成功')
          })
          socket.on('message', function (msg) {
              let li = LI.cloneNode()
              msg = JSON.parse(msg)
              li.innerHTML = `<span style="color: orange" onClick="sendPrive('${msg.name}')">${msg.name}:&emsp;<span style="color: #06c;">${msg.msg}</span></span><span style="float: right;">${(new Date(msg.timer)).toLocaleString()}</span>`
              msgList.appendChild(li)
          })
          /**
           * 设置需要私密通话的对象
           */
          function sendPrive(name) {
              let str = `@${name} `
              ipt.value = str
          }
          btn.addEventListener('click',function (params) {
              let msg = ipt.value
              if (msg) {
                  socket.emit('message', msg)
                  ipt.value = ''
              } else {
                  alert('发送的消息不能为空！')
              }
          }, false)
      </script>
  </body>
  </html>
  ```

- app.js

  - 拿到消息以后需要做一个解析，判断是否有私密聊天的name，如果有做类外的逻辑
  - `/^@([^ ]+) (\S)+/`获取消息的name和内容，如果只有消息，则不会有返回值
  - 如果有则从sockets中找到该对象，然后单独发送给该用户这条消息
  - 如果没有，则按照广播的形式正常发送

  ```javascript
  let express = require('express')
  let http = require('http')
  
  let app = express()
  app.use(express.static(__dirname))
  app.get('/', function (res, req) {
      res.header('Content-Type', 'text/html;charset=utf8')
      res.sendFile(path.resolve('index.html'))
  })
  let server = http.createServer(app)
  
  // 因为websocket协议是要依赖http协议实现握手的，所以需要把httpServer的实例传递给socket.io
  let socketIo = require('socket.io')
  let io = socketIo(server)
  // 在服务器监听客户端的链接
  let sockets = {} // 保存用户
  let SYS = '系统提示'
  let t = new Date()
  
  io.on('connection', socket => {
      console.log('客户端连接到服务器')
      // 监听接受客户端发过来的消息
      let username;
      socket.on('message', msg => {
          if (!username) {
              username = msg
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `${msg} 进入聊天`
              }
             sockets[username] = socket
              socket.broadcast.emit('message', JSON.stringify(message))
          } else {
              // 像客户端发送数据
              // 解析数据，看是否又私密聊天
              if (msg.match(/^@([^ ]+) (\S)+/)) {
                  let [, name, m] = msg.match(/^@([^ ]+) (\S)+/)
      
                  if (name) {
                      if (name === username) {
                          let message = {
                              name: SYS,
                              timer: t.getTime(),
                              msg: '您不可以@自己！'
                          }
                          socket.emit('message', JSON.stringify(message))
                      } else {
                          let message = {
                              name: socket.name,
                              timer: t.getTime(),
                              msg: m
                          }
                          sockets[username].emit('message', JSON.stringify(message))
                      }
                      
                  } else { // 如果不存在，则提示用户不存在
                      let message = {
                          name: SYS,
                          timer: t.getTime(),
                          msg: '你@的用户不存在！'
                      }
                      socket.emit('message', JSON.stringify(message))
                  }
              } else {
                  let message = {
                      name: socket.name,
                      timer: t.getTime(),
                      msg: msg
                  }
                  io.emit('message', JSON.stringify(message))
              }
          }
          
      })
      socket.on('disconect', function () {
          console.log('断开连接')
      })
      socket.on('error', () => {
          console.log('连接错误')
      })
  })
  
  server.listen(9999)
  ```



### 实现房间功能

- index.html修改

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">
      <title>socket.io</title>
  </head>
  <body>
      <div class="container">
          <div class="row">
             <div class="row-md-12">
                 <div class="panel panel-default">
                      <header class="panel-heading text-center">
                          <h4>welcome to talk room</h4>
                          <div>
                              <button class="btn btn-danger" onclick="joinRoom('red')">进入红房间</button>
                              <button class="btn btn-danger" onclick="leaveRoom('red')">离开红房间</button>
                              &emsp;
                              <button class="btn btn-success" onclick="joinRoom('blue')">进入绿房间</button>
                              <button class="btn btn-success" onclick="leaveRoom('blue')">离开绿房间</button>
                          </div>
                      </header>
                     <div class="panel-body">
                          <ul class="list-group" id="msg-list" style="list-style: none;">
                          </ul>
                     </div>
                      <div class="panel-footer">
                          <div class="row-md-10">
                              <input type="text" id="content" class="form-control">
                              <button id="btn" class="btn btn-primary">发送消息</button>
                          </div>
                      </div>
                 </div>
             </div>
          </div>
      </div>
      <script src="/socket.io/socket.io.js"></script>
      <script>
          let socket = io() // 相当于new Websocket()
  
          let ipt = document.querySelector('#content')
          let btn = document.querySelector('#btn')
          let msgList = document.querySelector('#msg-list')
          let LI = document.createElement('li')
  
  
          socket.on('connect', function () {
              console.log('客户端链接成功')
          })
          socket.on('message', function (msg) {
              let li = LI.cloneNode()
              msg = JSON.parse(msg)
              li.innerHTML = `<span style="color: orange" onClick="sendPrive('${msg.name}')">${msg.name}:&emsp;<span style="color: #06c;">${msg.msg}</span></span><span style="float: right;">${(new Date(msg.timer)).toLocaleString()}</span>`
              msgList.appendChild(li)
          })
          /**
           * 设置需要私密通话的对象
           */
          function sendPrive(name) {
              let str = `@${name} `
              ipt.value = str
          }
          /**
           * 进入放假
           */ 
          function joinRoom (room) {
              socket.emit('join', room);//进入chat房间
          }
          /**
           * 离开房间
           */ 
          function leaveRoom(room) {
              socket.emit('leave', room);//离开chat房间
          }
          btn.addEventListener('click',function (params) {
              let msg = ipt.value
              if (msg) {
                  socket.emit('message', msg)
                  ipt.value = ''
              } else {
                  alert('发送的消息不能为空！')
              }
          }, false)
      </script>
  </body>
  </html>
  ```

- app.js修改

  ```javascript
  let express = require('express')
  let http = require('http')
  
  let app = express()
  app.use(express.static(__dirname))
  app.get('/', function (res, req) {
      res.header('Content-Type', 'text/html;charset=utf8')
      res.sendFile(path.resolve('index.html'))
  })
  let server = http.createServer(app)
  
  // 因为websocket协议是要依赖http协议实现握手的，所以需要把httpServer的实例传递给socket.io
  let socketIo = require('socket.io')
  let io = socketIo(server)
  // 在服务器监听客户端的链接
  let SYS = '系统提示'
  let t = new Date()
  //命名是用来实现隔离的
  let sockets = {};
  
  io.on('connection', socket => {
      console.log('客户端连接到服务器')
      let rooms = []
      let username;
      // 监听接受客户端发过来的消息
      socket.on('message', msg => {
          if (!username) { // 第一次进入聊天
              username = msg
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `${msg} 进入聊天`
              }
              sockets[username] = socket
              socket.broadcast.emit('message', JSON.stringify(message))
          } else {
              // 像客户端发送数据
              if (rooms.length > 0) {
                  for (let i = 0; i < rooms.length; i++) {
                      
                      if (msg.match(/^@([^ ]+) (\S)+/)) {
                          let [, name, m] = msg.match(/^@([^ ]+) (\S+)/)
                          if (name && sockets[username]) {
                              if (username === name) {
                                  let message = {
                                      name: SYS,
                                      timer: t.getTime(),
                                      msg: '您不可以@自己！'
                                  }
                                  socket.emit('message', JSON.stringify(message))
                              } else {
                                  let message = {
                                      name: username,
                                      timer: t.getTime(),
                                      msg: m
                                  }
                                  sockets[name].emit('message', JSON.stringify(message))
                              }
  
                          } else { // 如果不存在，则提示用户不存在
                              let message = {
                                  name: SYS,
                                  timer: t.getTime(),
                                  msg: '你@的用户不存在！'
                              }
                              socket.emit('message', JSON.stringify(message))
                          }
                      } else {
                          let message = {
                              name: username,
                              timer: t.getTime(),
                              msg: msg
                          }
                          
                          io.in(rooms[i]).emit('message', JSON.stringify(message))
                      }
                  }
              } else {
                  // 解析数据，看是否又私密聊天
                  if (msg.match(/^@([^ ]+) (\S)+/)) {
                      let [, name, m] = msg.match(/^@([^ ]+) (\S+)/)
                      if (name && sockets[username]) {
                          if (username === name) {
                              let message = {
                                  name: SYS,
                                  timer: t.getTime(),
                                  msg: '您不可以@自己！'
                              }
                              socket.emit('message', JSON.stringify(message))
                          } else {
                              let message = {
                                  name: username,
                                  timer: t.getTime(),
                                  msg: m
                              }
                              sockets[name].emit('message', JSON.stringify(message))
                          }
  
                      } else { // 如果不存在，则提示用户不存在
                          let message = {
                              name: SYS,
                              timer: t.getTime(),
                              msg: '你@的用户不存在！'
                          }
                          socket.emit('message', JSON.stringify(message))
                      }
                  } else {
                      let message = {
                          name: username,
                          timer: t.getTime(),
                          msg: msg
                      }
                      io.emit('message', JSON.stringify(message))
                  }
              }
          }
          
      })
      socket.on('disconect', function () {
          console.log('断开连接')
      })
      socket.on('error', () => {
          console.log('连接错误')
      })
      socket.on('join', roomName => {
          
          let oldIndex = rooms.indexOf(roomName);
          if (oldIndex == -1) {
              socket.join(roomName);//相当于这个socket在服务器端进入了某个房间 
              rooms.push(roomName);
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `您成功进入${roomName}房间了`
              }
              socket.emit('message', JSON.stringify(message))
          } else{ 
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `您已经在${roomName}房间了`
              }
              socket.emit('message', JSON.stringify(message))
          }
          
         
          socket.on('joined', () => {
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `您进入了 ${roomName} 房间`
              }
              socket.emit('message', JSON.stringify(message))
              // io.in(room).emit('message', JSON.stringify(message2));
          })
         
      })
      socket.on('leave', roomName => {
          // 这里应该判断用户在不在该房间
          let oldIndex = rooms.indexOf(roomName);
          if (oldIndex !== -1) {
              socket.leave(roomName);//相当于这个socket在服务器端进入了某个房间 
              rooms.splice(oldIndex, 1);
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `您离开${roomName}房间了`
              }
              socket.emit('message', JSON.stringify(message))
          } else {
              let message = {
                  name: SYS,
                  timer: t.getTime(),
                  msg: `您已经不在${roomName}房间了`
              }
              socket.emit('message', JSON.stringify(message))
          }
          
          
      })
  })
  
  server.listen(9999)
  ```

### 总结

> 以上所以一个简单的聊天室的实现demo，当然还有很多遗留问题，不能@系统，不然会报错，聊天记录没有保存，你在进入聊天室名字会丢，消息没有做过滤，导致同时在多个聊天室的时候会收到多条消息，这些都会解决的，但不是现在。。。。

