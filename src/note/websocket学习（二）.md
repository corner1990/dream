# websocket学习（二）

> websocket客户端，服务端通信的最小单位是帧，由1个或者多个帧组成一个条完成的消息(message)

- 发送端，将消息切割成多个帧，并发送给接收端
- 接收端，接受消息帧，并将关联的症组装成完整的消息

### websocket数据帧格式

> 单位是比特，比如FIN，RSV1各占一个bit，opcode占据四个bit。

```
 0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
```

- FIN: 一个bit，如果是1，表这是message的最后一个分片（fragment），如果是0，表示不是message的最后一个分片。
- RSV1，RSV2，RSV3：各占一个bit，一般情况写全部为0.当客户端，服务端协商采用Websocket扩展是，这三个标志可以非0，且值的含义可以自由扩展进行定义。如果出现非0值，且并没有采用Websocket扩展，链接出错
- opcode：4个bit，操作码。opcode的值决定了应该如何解析后续的数据(data payload)。 如果操作代码是不认识的，那么接收端应该断开链接
  - %x0：表示一个延续帧。当Opcode为0时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片。
  - %x1：表示这是一个文本帧（frame）
  - %x2：表示这是一个二进制帧（frame）
  - %x3-7：保留的操作代码，用于后续定义的非控制帧。
  - %x8：表示连接断开。
  - %x9：表示这是一个ping操作。
  - %xA：表示这是一个pong操作。
  - %xB-F：保留的操作代码，用于后续定义的控制帧。
- Mask：一个bit，表示是否要对数据载荷进行掩码操作
  - 客户端像服务端发送数据时，需要对数据进行掩码操作，从服务端像客户端发送数据是，不需要对数据进行掩码操作，如果服务端接收到的数据没有进行掩码操作，服务器需要断开连接。
  - 如果Mask是1，那么在Masking-key中会顶一个一个掩码键(masking key)。并用这个掩码键来对数据进行反掩码。所有的客户端发送到服务端的数据正，mask都是1
- Payload length： 数据载荷的长度。单位是字节。为7为，或者7+16为，或7+64为。
  - Payload length=x为0~125：数据的长度为x字节。
  - Payload length=x为126：后续2个字节代表一个16位的无符号整数，该无符号整数的值为数据的长度。
  - Payload length=x为127：后续8个字节代表一个64位的无符号整数（最高位为0），该无符号整数的值为数据的长度。
  - 如果payload length占用了多个字节的话，payload length的二进制表达采用网络序（big endian，重要的位在前)
- Masking-key： 或4字节(32位) 所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask为1，且携带了4字节的Masking-key。如果Mask为0，则没有Masking-key。载荷数据的长度，不包括mask key的长度
- Payload data：(x+y) 字节
  - 载荷数据：包括了扩展数据、应用数据。其中，扩展数据x字节，应用数据y字节。
  - 扩展数据：如果没有协商使用扩展的话，扩展数据数据为0字节。所有的扩展都必须声明扩展数据的长度，或者可以如何计算出扩展数据的长度。此外，扩展如何使用必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内。
  - 应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度 减去 扩展数据长度，就得到应用数据的长度。

### 掩码算法

> 掩码键（Masking-key）是由客户端挑选出来的32位的随机数。掩码操作不会影响数据载荷的长度。掩码、反掩码操作都采用如下算法:

- 对索引i模以4得到j,因为掩码一共就是四个字节
- 对原来的索引进行异或对应的掩码字节
- 异或就是两个数的二进制形式，按位对比，相同取0，不同取1

```javascript
function unmask(buffer, mask) {
      const length = buffer.length;
      for (let i = 0; i < length; i++) {
          buffer[i] ^= mask[i & 3];
      }
  }
```



### 栗子

> 这里使用tcp实现聊天室功能

- 新建目录，新建index.html, server.js

- 客户端：index.html

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
          let socket = new WebSocket('ws://localhost:9999')
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

- 服务端：server.js

  ```javascript
  let net = require('net')
  let code = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  let crypto = require('crypto')
  
  let express = require('express')
  let app = express()
  app.use(express.static(__dirname))
  app.listen(8080)
  let server = net.createServer(( socket ) => {
      // 监听客户端发来的信息
      socket.once('data', data => {
          data = data.toString();
          // data 内容大概如下
          /*  请求头
              Request Method: GET
              Connection: Upgrade // 请求升级协议
              Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
              Sec-WebSocket-Key: BdHBU6Vo/0OMycVshRE3iQ== 
              Sec-WebSocket-Version: 13 // 升级的版本
              Upgrade: websocket // 升级的类型
  
              */
          let lines = data.split('\r\n')
          let headers = lines.slice(1, -2)
          // 处理字符串为一个对象 获取请求头
          headers = headers.reduce((headers, line) => {
              let [ key, val ] = line.split(': ')
              headers[key] = val
              return headers
          }, {});
          // console.log('headers', headers) // 打印出来的header如下
          /* 
          { Host: 'localhost:9999',
              Connection: 'Upgrade',
              Pragma: 'no-cache',
              'Cache-Control': 'no-cache',
              'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
              Upgrade: 'websocket',
              Origin: 'http://localhost:8080',
              'Sec-WebSocket-Version': '13',
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept-Language': 'zh,zh-CN;q=0.9,en;q=0.8,en-AU;q=0.7',
              Cookie:
              'visit=10; visit.sig=VVIZcIDkunpRwQDicJGbWKrQhTE; hello=bf5b7610-d783-11e8-aa65-354f8f3423d3',
              'Sec-WebSocket-Key': 'qmuFW2gfEl4prcOwCqg7tA==',
              'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits' }
           */
          // 判断是否升级协议
          // 如果Upgrade的知识websocket的话，则需要升级协议
          if (headers.Upgrade === 'websocket') {
              let key = headers['Sec-WebSocket-Key']
              let accept = crypto.createHash('sha1').update(key + code).digest('base64')
              // 处理响应头
              let response = [
                  "HTTP/1.1 101 Switching Protocols",
                  "Upgrade: websocket",
                  "Connection: Upgrade",
                  `Sec-WebSocket-Accept: ${accept}`,
                  '\r\n'
              ].join('\r\n')
             
              socket.write(response)
              // 切换协议成功，开始监听客户端发来的消息
              socket.on('data', function (bufs)  {
                  let FIN = (bufs[0] & 0b10000000) === 0b10000000 // 是否最后一帧
                  let opcode = bufs[0] & 0b00001111 // 操作码 1文本，
                  let isMasked = (bufs[1] & 0b100000000) === 0b100000000 // 对方是否掩码
                  let payloadLength = bufs[1] & 0b01111111;//取得负载数据的长度
                  let mask = bufs.slice(2, 6);//掩码 4个字节
                  let payload = bufs.slice(6);//负载数据
                  // console.log('FIN', FIN) // true
                  // console.log('opcode', opcode) // 1
                  // console.log(FIN, opcode, isMasked, payloadLength, mask, payload) 
                  // true 1 false 6 <Buffer 04 6e 75 fe> <Buffer e0 d3 d5 1b a1 d3>
  
                  for (let i = 0; i < payload.length; i++) {
                      payload[i] ^= mask[i % 4] // 为运算 相同是0， 不想同是1
                  }
  
                  // 处理返回值
                  // console.log(FIN, opcode, isMasked, payloadLength, mask, payload.toString()) 
                  let response = Buffer.alloc( 2 + payload.length )
                  response[0] = 0b10000001
                  response[1] = payload.length
                  // 将payload buf对象从下标2开始拷贝到response中
                  payload.copy(response, 2)
                  socket.write(response)
              })
          }
      })
  })
  server.listen(9999)
  ```

  ### 总结

  > 其实我也不是很懂，就是勉勉强强知道丝丝，还要学习呀。
  >
  > 嗯么么，附上[完成代码](https://github.com/corner1990/dream/tree/master/src/zfnode/websocket/02)