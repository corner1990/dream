// LineReader 行读取器
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
    
    this._rs.on('end', () => {
      // 结束时添加最后一行，然后发送出去
      this.emit('line', Buffer.from(this.buffer).toString())
      this.buffer.length = 0;
    })
  }
}

let line = new LineReader(path.join(__dirname, '1.txt'))

line.on('line', data => {
  console.log(data)
})
// module.exports = LineReader