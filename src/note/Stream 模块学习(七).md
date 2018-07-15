# Stream 模块学习(七)

> 在这之前实现了流的流动模式，这里实现一个流的暂停模式

### 构建对象和方法

```javascript
let EventEmitter = require('events')
let fs = require('fs')

class ReadableReadStream extends EventEmitter {
  constructor (path, options) {
    super()
    this.path = path
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end || null
    this.flag = options.flag || 'r'

    this.buffers = [] // 缓存区
    this.length = 0 // 处理缓存去大小
    this.pos = this.start // 设置起始下标
    this.emittedReadable = false // 是否触发_read事件
    this.reading = false // 是否正在读取

    this.open()
    // 判断是否需要触发read事件
    this.on('newListener', eventName => {
      if (eventName === 'readable') this.read()
    })
  }
  //关闭文件
  destory () {
  }
  // 打开文件啊
  open () {
    // 打开文件
  }
  read(n) {
  }
  // 封装读取的方法
  _read () {
  }
}

module.exports = ReadableReadStream

```

### 实现文件的打开和关闭方法

```javascript
let EventEmitter = require('events')
let fs = require('fs')

class ReadableReadStream extends EventEmitter {
  constructor (path, options) {
    super()
    this.path = path
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end || null
    this.flag = options.flag || 'r'

    this.buffers = [] // 缓存区
    this.length = 0 // 处理缓存去大小
    this.pos = this.start // 设置起始下标
    this.emittedReadable = false // 是否触发_read事件
    this.reading = false // 是否正在读取

    this.open()
    // 判断是否需要触发read事件
    this.on('newListener', eventName => {
      if (eventName === 'readable') this.read()
    })
  }
  //关闭文件
  destory () {
    if (typeof this.fd !== 'number') return this.emit('close')
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
  // 打开文件啊
  open () {
    // 打开文件
    fs.open(this.path, this.flag, 0o666, (err, fd) => {
      if (err) {
        this.emit('error', err)
        if (this.autoClose) this.destory()
        return
      }

      this.fd = fd
      this.emit('open')
    })
  }
  // 读取内容方法
  read(n) {
  }
  // 封装读取的方法
  _read () {
  }
}

module.exports = ReadableReadStream

```

### 实现读取内容方法

```javascript
let EventEmitter = require('events')
let fs = require('fs')

class ReadableReadStream extends EventEmitter {
  constructor (path, options) {
    super()
    this.path = path
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end || null
    this.flag = options.flag || 'r'

    this.buffers = [] // 缓存区
    this.length = 0 // 处理缓存去大小
    this.pos = this.start // 设置起始下标
    this.emittedReadable = false // 是否触发_read事件
    this.reading = false // 是否正在读取

    this.open()
    // 判断是否需要触发read事件
    this.on('newListener', eventName => {
      if (eventName === 'readable') this.read()
    })
  }
  //关闭文件
  destory () {
    if (typeof this.fd !== 'number') return this.emit('close')
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
  // 打开文件啊
  open () {
    // 打开文件
    fs.open(this.path, this.flag, 0o666, (err, fd) => {
      if (err) {
        this.emit('error', err)
        if (this.autoClose) this.destory()
        return
      }

      this.fd = fd
      this.emit('open')
    })
  }
  /**
   * @description 读取缓存区的内容
   * @param {Number} n 读取内容的长度
   */
  read(n) {
    let buffer
    if (n > 0 & n < this.length) { // 读取的内容，缓存去只有这么多
      // 在缓存区中读取文件 [buffer, buffer]
      buffer = Buffer.alloc(n) //这里是要返回的buffer
      let buf // 保存临时buffer对象
      let flag = true // 开关，控制while循环
      let pos = 0 // 读取的下标 维护buf的索引
      // 这里使用while循环，直到读取的长度到达为n的时候跳出循环
      while (flag && (buf = this.buffers.shift())) {
        for (let i = 0; i < buf.length; i++) {
          buffer[pos++] = buf[i]
          // 如果pos已经等于n，说明内容读取完毕，不需要再去拷贝了
          if (pos === n) {
            flag = false
             // buf.slice(i + 1) 拿到没有消费完的内容
             // 如果当前buffer里的内容没有消费完毕， 把没有消费的那部分截取成一个新的buffer，然后返回之前在this.buffers的位置
             if (i <= buffer.length) {
               this.buffers.unshift(buf.slice(i + 1))
               this.reading = false // 读取完毕，更新状态
               // 更新缓存去大小
               this.length -= pos
             }
            break
          }
        }
      }
    }
    // 更改状态
    if (this.length === 0) this.emittedReadable = true
    // 如果当前缓存区的小于highWaterMark时再去读取
    if (this.length < this.highWaterMark) {
      if (!this.reading) {
        this.reading = true
        this._read()
      }
    }

    return buffer
  }
  // 封装读取的方法
  _read () {
  }
}

module.exports = ReadableReadStream

```

### 实现内部读取文件方法`_read`

```javascript
let EventEmitter = require('events')
let fs = require('fs')

class ReadableReadStream extends EventEmitter {
  constructor (path, options) {
    super()
    this.path = path
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end || null
    this.flag = options.flag || 'r'

    this.buffers = [] // 缓存区
    this.length = 0 // 处理缓存去大小
    this.pos = this.start // 设置起始下标
    this.emittedReadable = false // 是否触发_read事件
    this.reading = false // 是否正在读取

    this.open()
    // 判断是否需要触发read事件
    this.on('newListener', eventName => {
      if (eventName === 'readable') this.read()
    })
  }
  //关闭文件
  destory () {
    if (typeof this.fd !== 'number') return this.emit('close')
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
  // 打开文件啊
  open () {
    // 打开文件
    fs.open(this.path, this.flag, 0o666, (err, fd) => {
      if (err) {
        this.emit('error', err)
        if (this.autoClose) this.destory()
        return
      }

      this.fd = fd
      this.emit('open')
    })
  }
  /**
   * @description 读取缓存区的内容
   * @param {Number} n 读取内容的长度
   */
  read(n) {
    let buffer
    if (n > 0 & n < this.length) { // 读取的内容，缓存去只有这么多
      // 在缓存区中读取文件 [buffer, buffer]
      buffer = Buffer.alloc(n) //这里是要返回的buffer
      let buf
      let flag = true // 开关，控制while循环
      let pos = 0 // 读取的下标 维护buf的索引
      while (flag && (buf = this.buffers.shift())) {
        for (let i = 0; i < buf.length; i++) {
          buffer[pos++] = buf[i]
          // 如果pos已经等于n，说明内容读取完毕，不需要再去拷贝了
          if (pos === n) {
            flag = false
             // buf.slice(i + 1) 拿到没有消费完的内容
             // 如果当前buffer里的内容没有消费完毕， 把没有消费的那部分截取成一个新的buffer，然后返回之前在this.buffers的位置
             if (i <= buffer.length) {
               this.buffers.unshift(buf.slice(i + 1))
               this.reading = false // 读取完毕，更新状态
               // 更新缓存去大小
               this.length -= pos
             }
            break
          }
        }
      }
    }
    // 更改状态
    if (this.length === 0) this.emittedReadable = true
    // 如果当前缓存区的小于highWaterMark时再去读取
    if (this.length < this.highWaterMark) {
      if (!this.reading) {
        this.reading = true
        this._read()
      }
    }

    return buffer
  }
  // 封装读取的方法
  _read () {
    // 当小缓存区 小于highWaterMark时去读取
    // 判断，如果文件还没有打开，那就等文件打开以后在操作事件
    if (typeof this.fd !== 'number' ) return this.once('open', () => this._read())
    
    // 创建一个长度为highWaterMark的buffer对象
    let buffer = Buffer.alloc(this.highWaterMark)
    
    // 读取文件
    fs.read(this.fd, buffer, this.start, buffer.length, this.pos, (err, bytesRead) => {
      // 这里判断是否读取到内容，如果没有，则关闭文件，触发end事件
      if (bytesRead <= 0) {
        this.emit('end')
        this.destory()
        return false
      }
      // 将读取的内容放入缓存区
      // buffer.slice(0, bytesRead) // 在结束的时候可能会出现长度不够的情况，这里只保存有内容的部分
      this.buffers.push(buffer.slice(0, bytesRead))
      this.pos += bytesRead // 更新读取的索引
      this.length += bytesRead // 更新缓存区的大小

      // 判断是否需要触发readable事件
      if (this.emittedReadable) {
        this.emittedReadable = false //下次默认不出发事件
        this.emit('readable') // 触发readable事件
      }
    })
  }
}

module.exports = ReadableReadStream
```
### 使用
```javascript
let fs = require('fs')
let path = require('path')
let ReadStream = require('./ReadableReadStream')
// 这里我们使用自己实现的流读取文件
let rs = new ReadStream(path.join(__dirname, './1.txt'), {
  flag: 'r',
  autoClose: true,
  encoding: 'utf8',
  start: 0,
  end: 6,
  highWaterMark: 3
})
// 监听readable事件
rs.on('readable', () => {
  // 默认先会读满缓存区
  // 我们在这里不停的消费，等缓存区为空时会默认触发readable事件
  let res = rs.read(2)
  console.log('res', res)
  // 这里消费玩以后缓存曲的length为1
  console.log('res.length', rs.length)
  // 我们在一秒后打印缓存区的长度，发现是4
  setTimeout(() => {
    console.log('res.length', rs.length)
  }, 1000);
})
```

### 总结

> 以上 通过四个步奏实现了一个简单的readable的流，感觉需要注意的几个点如下：
>
> 1.我们缓存区的大小的维护，每一个操作借点一定不能遗漏
>
> 2.在read方法内部读取缓存区大小的时候，有可能会出现内容没有被消费完的情况，需要我们在结尾做一个判断，如果还有内容，就把这部分内容使用slice为一个新的buffer对象，并放在数组的开始，下次从这个buffer对象开始读取
>
> 3.内部的读取文件也会存在一个可能最后一次读到的内容不是整个buffer的情况，需要做判断处理，代码备注里有提到，需要特别注意一下

