# socket.io

> Socket.IO是一个WebSocket库，包括了客户端的js和服务器端的nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的实时应用

### socket.io的特点

- 易用性：socket.io封装了服务端和客户端，使用起来非常简单方便。
- 跨平台：socket.io支持跨平台，这就意味着你有了更多的选择，可以在自己喜欢的平台下开发实时应用。
- 自适应：它会自动根据浏览器从WebSocket、AJAX长轮询、Iframe流等等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化，而且支持的浏览器最低达IE5.5。

### 安装

> 使用npm安装socket.io

```
npm install socket.io
```

### 启动一个简单的服务

- 新建目录，新建app.js, index.html

- app.js 服务端

  ```javascript
  var express = require('express');
  var path = require('path');
  var app = express();
  
  app.get('/', function (req, res) {
      res.sendFile(path.resolve('index.html'));
  });
  
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  
  io.on('connection', function (socket) {
      console.log('客户端已经连接');
      socket.on('message', function (msg) {
          console.log(msg);
          socket.send('sever:' + msg);
      });
  });
  server.listen(80);
  ```

- index.html 客户端

  > 服务端运行后会在根目录动态生成socket.io的客户端js文件 客户端可以通过固定路径`/socket.io/socket.io.js`添加引用 客户端加载socket.io文件后会得到一个全局的对象io `connect`函数可以接受一个`url`参数，url可以socket服务的http完整地址，也可以是相对路径，如果省略则表示默认连接当前路径 创建index.html文件

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
  	<script src="/socket.io/socket.io.js"></script> // 引用脚本，固定写法
   		window.onload = function(){
      		var socket = io.connect('/');
      		//监听与服务器端的连接成功事件
      		socket.on('connect',function(){
                  console.log('连接成功');
              });
              //监听与服务器端断开连接事件
              socket.on('disconnect',function(){
                 console.log('断开连接');
              });
           };
  </body>
  </html>
  ```

### 发送消息

> 成功建立连接后，我们可以通过`socket`对象的`send`函数来互相发送消息 
>

- 修改index.html 如下：

```javascript

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
	<script src="/socket.io/socket.io.js"></script> // 引用脚本，固定写法
 		window.onload = function(){
    		var socket = io.connect('/');
    		//监听与服务器端的连接成功事件
    		socket.on('connect',function(){
                console.log('连接成功');
                 //客户端连接成功后发送消息'welcome'
                   socket.send('welcome');
            });
            //客户端收到服务器发过来的消息后触发
            socket.on('message',function(message){
               console.log(message);
            });
            //监听与服务器端断开连接事件
            socket.on('disconnect',function(){
               console.log('断开连接');
            });
         };
</body>
</html>
```

- app.js 修改如下

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

### 分析

> `send`函数只是`emit`的封装

```javascript
function send(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
}
```

- `emit`函数有两个参数
  - 第一个参数是自定义的事件名称,发送方发送什么类型的事件名称,接收方就可以通过对应的事件名称来监听接收
  - 第二个参数是要发送的数据



### 服务端事件

| 事件名称   | 含义                   |
| ---------- | ---------------------- |
| connection | 客户端成功连接到服务器 |
| message    | 接收到客户端发送的消息 |
| disconnect | 客户端断开连接         |
| error      | 监听错误               |

### 客户端事件

| 事件名称   | 含义                   |
| ---------- | ---------------------- |
| connect    | 成功连接到服务器       |
| message    | 接收到服务器发送的消息 |
| disconnect | 客户端断开连接         |
| error      | 监听错误               |

### 划分命名空间

> 可以把服务划分成多个命名空间，默认`/`不同空间不能通信

- 可以把服务分成多个命名空间，默认/,不同空间内不能通信

  ```javascript
  io.on('connection', socket => {});
  io.of('/news').on('connection', socket => {});
  ```

- 客户端链接命名空间

  ```javascript
  let socket = io('http://localhost/');
  let socket = io('http://localhost/news');
  ```

### 房间

- 可以把一个命名空间分成多个房间，一个客户端可以同时进入多个房间。

- 如果大大厅里广播 ，那么所有在大厅里的客户端和任何房间内的客户端都能收到消息。

- 所有在房间里的广播和通信都不会影响到房间以外的客户端

- 进入房间

  ```javascript
  socket.join('chat');//进入chat房间
  ```

- 离开房间

  ```
  socket.leave('chat');//离开chat房间
  ```


### 全局广播

> 广播就是把消息发送给多个客户端

- 向大厅和房间广播

  ```javascript
  io.emit('message','全局广播');
  ```

- 像除了自己之外的其它客户端广播

  ```javascript
  socket.broadcast.emit('message', msg);
  ```

### 房间内广播

- 向房间内广播， 从服务器的角度来提交事件,提交者会包含在内

  ```javascript
  向myRoom广播一个事件，在此房间内除了自己外的所有客户端都会收到消息
  io.in('myRoom').emit('message', msg);
  io.of('/news').in('myRoom').emit('message',msg);
  ```

- 向房间内广播， 从客户端的角度来提交事件,提交者会排除在外

  ```javascript
  //向myRoom广播一个事件，在此房间内除了自己外的所有客户端都会收到消息
  socket.broadcast.to('myroom').emit('message', msg);
  ```

### 总结

> 以上就是简单的socket常用的api和思想，恩么么，到此为止，还差一个demo，趁热打铁，赶紧写一个。。。。



























