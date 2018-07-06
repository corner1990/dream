# Stream 模块学习(六)

### `radable `方法

> 当我们创建一个流，就会先把缓存去填满，等待你自己消费
>
> 如果当前的缓存区被清空后，回再次触发readable事件
>
> 当消费小于最高水平线，就会自动添加highWaterMark这么多的数据

- 下边就是栗子：

```javascript
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
```

### 使用`readable`方法，实现一个`LineaRead`方法

- 构建对象

```javascript
let fs = require('fs')
let path = require('path')
let EventEmitter = require('events')

//在win下 换行回车是\r\n 0x0d
// 在Mac下 只是\n
class LineReader extends EventEmitter {
  constructor (path) {
    super()
    this.RETURN = '0x0d'
    this.LINE = '0x0a'
    this.buffer = [] // 存储数据的容器
  }
}
```

- 创建一个可读流，并监听`line`事件,使用`readable`读取内容

```javascript
let fs = require('fs')
let path = require('path')
let EventEmitter = require('events')

//在win下 换行回车是\r\n 0x0d
// 在Mac下 只是\n
class LineReader extends EventEmitter {
  constructor (path) {
    super()
    this.RETURN = '0x0d'
    this.LINE = '0x0a'
    this.buffer = [] // 存储数据的容器
    this._rs = fs.createReadStream(path) //默认清空下限度highWaterMark
    this.on('newListener', eventName => {
      if(eventName !== 'line') return false
      this._rs.on('readable', () => {
        let char;
        // 读出来的内容都是buffer类型
        while (char = this._rs.read(1)) {
          let current = char[0]
          // console.log(current)
          // 在这里处理数据
          switch (current) {
            // 当遇到 \r时表示这一行就ok了
            // case this.RETURN:
            case 13:
              // 将数据转换成buffer对象，然后tostring
              this.emit('line', Buffer.from(this.buffer).toString())
              // 发射完数据后将缓存去清空
              this.buffer.length = 0
              // 这里是拿到下一个内容，判断是不是\n 是的话就不处理，不是的话就添加到buffer中
              let c = this._rs.read(1)
              // if (c[0] !== this.LINE) this.buffer.push(c[0])
              if (c[0] !== '0a') this.buffer.push(c[0])
              break;
            case this.LINE:
            case '0a':
              this.emit('line', Buffer.from(this.buffer).toString())
              // 发射完数据后将缓存去清空
              this.buffer.length = 0
              break;
          
            default:
              // console.log(current == this.RETURN)
              this.buffer.push(current)
              break;
          }
        }
      })
    })
    
  }
}
```

- 完成`end`事件中的逻辑

```javascript
class LineReader extends EventEmitter {
  constructor (path) {
    super()
    this.RETURN = '0x0d'
    this.LINE = '0x0a'
    this.buffer = [] // 存储数据的容器
    this._rs = fs.createReadStream(path) //默认清空下限度highWaterMark
    this.on('newListener', eventName => {
      if(eventName !== 'line') return false
      this._rs.on('readable', () => {
        let char;
        // 读出来的内容都是buffer类型
        while (char = this._rs.read(1)) {
          let current = char[0]
          // console.log(current)
          // 在这里处理数据
          switch (current) {
            // 当遇到 \r时表示这一行就ok了
            // case this.RETURN:
            case 13:
              // 将数据转换成buffer对象，然后tostring
              this.emit('line', Buffer.from(this.buffer).toString())
              // 发射完数据后将缓存去清空
              this.buffer.length = 0
              // 这里是拿到下一个内容，判断是不是\n 是的话就不处理，不是的话就添加到buffer中
              let c = this._rs.read(1)
              // if (c[0] !== this.LINE) this.buffer.push(c[0])
              if (c[0] !== '0a') this.buffer.push(c[0])
              break;
            case this.LINE:
            case '0a':
              this.emit('line', Buffer.from(this.buffer).toString())
              // 发射完数据后将缓存去清空
              this.buffer.length = 0
              break;
          
            default:
              // console.log(current == this.RETURN)
              this.buffer.push(current)
              break;
          }
        }
      })
    })
    // 最后一行没有换行符，所以我们当读取结束以后需要手动触发一次line事件
    this._rs.on('end', () => {
      // 结束时添加最后一行，然后发送出去
      this.emit('line', Buffer.from(this.buffer).toString())
      this.buffer.length = 0;
    })
  }
}
```

- 调用方法

```javascript
let line = new LineReader(path.join(__dirname, '1.txt'))
line.on('line', data => {
  console.log(data)
})
```

### 结尾

> 最近比较忙，笔记做得有些仓促
>
> 遗留了一个问题，就是我在switch case后边写变量的时候不知道为什么会不生效，找了很多方法，如模板字符串，都不行，暂时先搁置一下，后期有时间了再回来看

