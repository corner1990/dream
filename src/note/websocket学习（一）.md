# websocket学习（一）

> [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) 规范定义了一个网页浏览器和服务器建立一个socket链接。在客户端和服务器保持有一个持久链接，两边可以在任意时间发送数据
>
> HTML5开始提供了一种了iu蓝旗与服务器进行全双工通讯的网络技术
>
> 基于应用层协议，他基于TCP传输协议，并复用HTTP的握手通道

### websocket的特点

- 支持双向通信，实时性强
- 更好的二进制技术
- 较少的控制开销，链接创建后，ws客户端，服务端数据交换是，协议的控制数据包头部较少

### 手写一个简单的websockt栗子

- 准备

  > 新建一个目录，使用npm初始化，新增index.html, server.js文件

- 服务端 `server.js`

  ```javascript
  let express = require('express')
  let app = express()
  app.use(express.static(__dirname))
  app.listen(8080)
  
  
  // =============================  //
  // websocket 服务器分为两个部分，分别是服务端和客户端
  let Server = require('ws').Server
  // 创建一个websocket服务器示例， 监听的端口是7777
  let server = new Server({port: 7777})
  
  // 监听客户端的链接和发送过来的消息, socket 代表客户端的链接
  // 例如a给b拨打电话，如果b接通了，则相当于他们之间建立的链接，connection
  // 接通之后开始说话
  server.on('connection', (socket) => {
      // 监听客户端发送过来的消息，相当于a的耳朵听到了b说的话
      socket.on('message', (message) => {
          console.log(message)
          socket.send(`服务器对你说：${message}`)
      })
  })
  ```

- 客户端`index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      <div>hello webscoket</div>
      <script>
          // 创建一个socket对象，相当于买了一部手机
          // socket 插座
          let socket = new WebSocket('ws://localhost:7777')
          // 如果服务器链接成功，会触发此事件
          socket.onopen = function () {
              console.log('链接已经建立好了')
              socket.send(('你好'))
          }
          // 如果客户端接收到消息，会触发这个事件
          socket.onmessage = (e)  => {
              console.log(e.data)
          }
      </script>
  </body>
  </html>
  ```

### 如何建立链接

- 客户端申请协议升级

  > 客户端发起请求。

  ```
  GET ws://localhost:8888/ HTTP/1.1
  Host: localhost:8888
  Connection: Upgrade // 表示要升级协议
  Upgrade: websocket // 要升级的协议类型
  Sec-WebSocket-Version: 13 // 表示websocket的版本
  Sec-WebSocket-Key: IHfMdf8a0aQXbwQO1pkGdA== // 与后面服务端响应首部的Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
  ```

- 服务端相应协议升级

  > 服务端相应内容如下，状态吗101表示协议切换。完成协议升级，后续的数据交互都按照新的协议来

  ```
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: aWAY+V/uyz5ILZEoWuWdxjnlb7E=
  ```

- `Sec-Websocket-Accept`的计算

  > Sec-Websocket-Accept更具客户端请求首部的SecWebSocket-Key计算出来，计算公式如下：

  + 将Sec-WebSocket-Key跟258EAFA5-E914-47DA-95CA-C5AB0DC85B11拼接。
  + 通过sha1计算出来摘要，并转换成base64编码字符串

  ```javascript
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: aWAY+V/uyz5ILZEoWuWdxjnlb7E=
  ```

- Sec-WebSocket-Key/Accept的作用

  - 避免服务端接收到非法的websocket链接
  - 去报服务器链接websocket链接
  - 用浏览器发送Ajax请求，设置header时，Sec-Websocket-Accept是被禁止的
  - Sec-Websocket-Accept最主要目的并不是确保数据的安全性，因为Sec-Websocket-Accept， Sec-websocket-key的转换公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况(非恶意)

### 总结

> 以上是简单的websocket学习，下一节学习websocket的数据帧，并实现一个基于tcp的简单聊天室
>
> 嗯么么，附上[完成代码](https://github.com/corner1990/dream/tree/master/src/zfnode/websocket/01)