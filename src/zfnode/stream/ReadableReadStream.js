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
    let buffer = Buffer.alloc(this.highWaterMark)
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
        this.emit('readable')
      }
    })
  }
}

module.exports = ReadableReadStream
