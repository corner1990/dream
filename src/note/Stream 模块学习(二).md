# Stream 模块学习(二)

> 在之前学习了node的可读流的用法这里模式实现一个简单的可读流类ReadStream，深入理解流的概念和和实现的过程

### 创建`ReadStream` 类

- 首先我们更具之前使用的样子 定义好类，已经一定需要用到的参数

```javascript
let EventEmitter = require('events')
let fs = require('fs')
//这里需要引入events，实现事件的发布订阅
class ReadStream extends EventEmitter {
    constructor (path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'r' // 文件操作都是读取操作
        this.autoClose = options.autoClose || true //文件读取完毕以后是否自动关闭
        this.highWaterMark = options.highWaterMark || 64*1024 //默认是64k， 60*1024b
        this.start = options.start || 0 //开始读取文件的位置
        this.encoding = options.encoding || null //默认是null， null代表的是buffer
        this.end = options.end //读取文件的结束位置， 需要注意的是包前又包后(0-9 = 10) ,即闭区间
    }
}

```

### 实现文件读取方法

- 官方的流对象默认回读取6k的内容，然后检查是否监听`data`事件，如果监听了就继续读取，如果没有监听，则进入`pause`状态
- 实现`open`方法和关闭方法`destory`方法

```javascript
let EventEmitter = require('events')
let fs = require('fs')

class ReadStream extends EventEmitter {
    constructor (path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'r' // 文件操作都是读取操作
        this.autoClose = options.autoClose || true //文件读取完毕以后是否自动关闭
        this.highWaterMark = options.highWaterMark || 64*1024 //默认是64k， 60*1024b
        this.start = options.start || 0 //开始读取文件的位置
        this.encoding = options.encoding || null //默认是null， null代表的是buffer
        this.end = options.end //读取文件的结束位置， 需要注意的是包前又包后(0-9 = 10) ,即闭区间
        
        this.open() // 第一次打开文件， 拿到fd
    }
    /**
     * @description 文件打开方法
     */
    open () {
        //我们使用fs.open打开文件
        fs.open(this.path, this.flags, (err, fd) => {
            //判读是否有错误，如果有，触发error事件，如果没有，则打开成功，触发open事件
            if (err) {
                if (this.autoClose) { //是否自动关闭
                    this.destory() //销毁当前打开的文件
                }
                //触发error事件
                this.emit('error', err)
                return null;
            }

            // 如果没有报错，就把fd挂载到当前实例，然后触发open事件
            this.fd = fd
            this.emit('open')
        })
    }
    /**
     * @description 销毁事件
     */
    destory () {
        // 判断有没有fd 有就关闭，触发close事件
        if (typeof this.fd == 'number') {
            fs.close(this.fd, () => {
                this.emit('close')
            })
            return 
        }
        // 如果还没有打开文件，则直接触发close事件
        this.emit('close')
    }

}
```

### 这里实现`read`方法

- `Read`方法回检查当前流的状态，如果在流动状态，回疯狂的触发`data`事件(回调自己)，并将读取到的值传过去，直到文件读取完毕
- 如果当前留得状态是非流动状态，则在这次触发`data`事件以后不在调用自己

```javascript
class ReadStream extends EventEmitter {
    constructor (path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'r' // 文件操作都是读取操作
        this.autoClose = options.autoClose || true //文件读取完毕以后是否自动关闭
        this.highWaterMark = options.highWaterMark || 64*1024 //默认是64k， 60*1024b
        this.start = options.start || 0 //开始读取文件的位置
        this.encoding = options.encoding || null //默认是null， null代表的是buffer
        this.end = options.end //读取文件的结束位置， 需要注意的是包前又包后(0-9 = 10) ,即闭区间
        this.flowing = null //默认为非流动模式
        // 创建一个buffer对象(读取文件的时候使用)，对象的长度是我们设置的highWaterMark的值
        this.buffer = Buffer.alloc(this.highWaterMark)
        // 新建一个pos变量，保存当前读取的位置，
        this.pos = this.start

        this.open() // 第一次打开文件， 拿到fd
        // 文件打开以后，检测是否监听data事件，如果返回结果为TRUE，就要进入流动模式
        this.on('newListener', (eventName, callback) => {
            if(eventName == 'data') {
                // 如果用户监听了data事件，就切换状态
                this.flowing = true
                this.read() //开始读取文件
            }
        })
    }
    /**
     * @description 文件打开方法
     */
    open () {
        //我们使用fs.open打开文件
        fs.open(this.path, this.flags, (err, fd) => {
            //判读是否有错误，如果有，触发error事件，如果没有，则打开成功，触发open事件
            if (err) {
                if (this.autoClose) { //是否自动关闭
                    this.destory() //销毁当前打开的文件
                }
                //触发error事件
                this.emit('error', err)
                return null;
            }

            // 如果没有报错，就把fd挂载到当前实例，然后触发open事件
            this.fd = fd
            this.emit('open')
        })
    }
    /**
     * @description 销毁事件
     */
    destory () {
        // 判断有没有fd 有就关闭，触发close事件
        if (typeof this.fd == 'number') {
            fs.close(this.fd, () => {
                this.emit('close')
            })
            return 
        }
        // 如果还没有打开文件，则直接触发close事件
        this.emit('close')
    }
    /**
     * @description 文件读取方法
     */
    read () {
        // 先判断fd(文件描述符)是否存在，如果不存在，说明还没有打开文件，
        // 如果文件还没有打开，则使用once监听open事件，等open事件触发以后再开始读取(触发this.open)
        if (typeof this.fd !== 'number') {
            this.once('open', () => this.read())
            return null
        }
        //如果文件已经打开，开始读取文件
        // howMuchRead：每次读几个字节
        // this.end - this.pos + 1: 主要是防止文件读到末尾的时候读取的文件长度不够引发的问题
        let howMuchRead = this.end ? Math.min(this.highWaterMark, this.end - this.pos + 1) : this.highWaterMark
        fs.read(this.fd, this.buffer, 0, howMuchRead, this.pos, (err, bytesRead) => {
            // 判断 如果读取到的文件内容小于等于0，说明文件读取完毕，则不继续执行代码，并且触发end事件
            if (bytesRead <= 0) {
                this.emit('end')
                this.destory()
                return null
            }
            // 读到了多少个，累加，更新POS的为止
            this.pos += bytesRead
            // 对读取到的文件做处理
            // 首先是截取长度，之后判断用户是指定encode，指定的话进行toString，没有指定的话直接使用截取后的buffer对象
            let data = this.encoding ? this.buffer.slice(0, bytesRead).toString(this.encoding) : this.buffer.slice(0, bytesRead)
            // 触发data事件，并将读取到的值传过去
            this.emit('data', data)

            // 判断是否是流动模式 如果是的话继续触发
            if (this.flowing) {
                this.read()
            }
        })
        
    }

}
```

### 最后实现`pause`和`resume`方法

```javascript
let EventEmitter = require('events')
let fs = require('fs')

class ReadStream extends EventEmitter {
    constructor (path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'r' // 文件操作都是读取操作
        this.autoClose = options.autoClose || true //文件读取完毕以后是否自动关闭
        this.highWaterMark = options.highWaterMark || 64*1024 //默认是64k， 60*1024b
        this.start = options.start || 0 //开始读取文件的位置
        this.encoding = options.encoding || null //默认是null， null代表的是buffer
        this.end = options.end //读取文件的结束位置， 需要注意的是包前又包后(0-9 = 10) ,即闭区间
        this.flowing = null //默认为非流动模式
        // 创建一个buffer对象(读取文件的时候使用)，对象的长度是我们设置的highWaterMark的值
        this.buffer = Buffer.alloc(this.highWaterMark)
        // 新建一个pos变量，保存当前读取的位置，
        this.pos = this.start

        this.open() // 第一次打开文件， 拿到fd
        // 文件打开以后，检测是否监听data事件，如果返回结果为TRUE，就要进入流动模式
        this.on('newListener', (eventName, callback) => {
            if(eventName == 'data') {
                // 如果用户监听了data事件，就切换状态
                this.flowing = true
                this.read() //开始读取文件
            }
        })
    }
    /**
     * @description 文件打开方法
     */
    open () {
        //我们使用fs.open打开文件
        fs.open(this.path, this.flags, (err, fd) => {
            //判读是否有错误，如果有，触发error事件，如果没有，则打开成功，触发open事件
            if (err) {
                if (this.autoClose) { //是否自动关闭
                    this.destory() //销毁当前打开的文件
                }
                //触发error事件
                this.emit('error', err)
                return null;
            }

            // 如果没有报错，就把fd挂载到当前实例，然后触发open事件
            this.fd = fd
            this.emit('open')
        })
    }
    /**
     * @description 销毁事件
     */
    destory () {
        // 判断有没有fd 有就关闭，触发close事件
        if (typeof this.fd == 'number') {
            fs.close(this.fd, () => {
                this.emit('close')
            })
            return 
        }
        // 如果还没有打开文件，则直接触发close事件
        this.emit('close')
    }
    /**
     * @description 文件读取方法
     */
    read () {
        // 先判断fd(文件描述符)是否存在，如果不存在，说明还没有打开文件，
        // 如果文件还没有打开，则使用once监听open事件，等open事件触发以后再开始读取(触发this.open)
        if (typeof this.fd !== 'number') {
            this.once('open', () => this.read())
            return null
        }
        //如果文件已经打开，开始读取文件
        // howMuchRead：每次读几个字节
        // this.end - this.pos + 1: 主要是防止文件读到末尾的时候读取的文件长度不够引发的问题
        let howMuchRead = this.end ? Math.min(this.highWaterMark, this.end - this.pos + 1) : this.highWaterMark
        fs.read(this.fd, this.buffer, 0, howMuchRead, this.pos, (err, bytesRead) => {
            // 判断 如果读取到的文件内容小于等于0，说明文件读取完毕，则不继续执行代码，并且触发end事件
            if (bytesRead <= 0) {
                this.emit('end')
                this.destory()
                return null
            }
            // 读到了多少个，累加，更新POS的为止
            this.pos += bytesRead
            // 对读取到的文件做处理
            // 首先是截取长度，之后判断用户是指定encode，指定的话进行toString，没有指定的话直接使用截取后的buffer对象
            let data = this.encoding ? this.buffer.slice(0, bytesRead).toString(this.encoding) : this.buffer.slice(0, bytesRead)
            // 触发data事件，并将读取到的值传过去
            this.emit('data', data)

            // 判断是否是流动模式 如果是的话继续触发
            if (this.flowing) {
                this.read()
            }
        })
        
    }
    // 暂停的时候只需要将flowing设置为false
    pause () {
        this.flowing = false
    }
    resume () {
        // 继续读取的时候修改flowing为true，并且手动触发read方法s
        this.flowing = true
        this.read()
    }

}

module.exports = ReadStream
```

### 总结

>  以上就是简单的可读流的实现，代码量很少，但是作为自己理解流的概念还是蛮不错的,
>
> 可能会有很多bug，但是对我来说无所谓，我不怕错误，大不了再改嘛

