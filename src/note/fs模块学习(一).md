# Fs模块学习(一)

> fileSystem(fs): 文件模块，node核心模块，带有很多API， 常见的又fs.readFile, fs.open, fs.read, fs.write...



### 引入模块

```
const fs = require('fs') //这样我们就可以通过fs调用node提供的API了
```



### 关闭编码的问题

- 很多的时候我们会因为编码的问题，从而导致文件乱码，这里说一种中简单的处理方式
- node的官方处理方式，使用一个srcipBOM方法

```javascript
/**
 * @description 去除BOM头
 * @param {string || Buffer} content 需要处理的内容
 * @return {string || Buffer} 返回去掉BOM头的内容
 */
function stripBOM (content) {
    //假如是Buffer对象，则走这里判断
    if (Buffer.isBuffer(content)) {
        if (content[0] == 0xEF && content[1] === 0XBB && content[2] === 0xBF) {
            return content.slice(3)
        }
        return content
    } else {//如果是字符串走着里
        if (content.charCodeAt(0) === 0xFEFF){
            content = content.splice(1)
        }
        return content
    }
}

let fs = require('fs')
let path = require('path')

//utf8 是unicode的实现
let res = fs.readFileSync(path.join(__dirname, './1.txt'))

// 截取bom头
res = stripBOM(res)
console.log(res)
```

- 第三方处理模块`iconv-lite` ,专门用来出来node不支持的编码转换为urf8编码

```javascript
1.安装
npm i iconv-lite

2.引入和使用
//第三方模块： iconv-lite
let iconv = require('iconv-lite')
let fs = require('fs')
let path = require('path')
let res = fs.readFileSync(path.join(__dirname, './1.txt'))
//解析指定编码为utf8
res = iconv.decode(res, 'gbk')
console.log(res.toString())
```

- 关于某些情况下`Buffer`对象因为截取的问题，出现乱码的解决方法

```javascript
// Buffer 的乱码问题
let buf = Buffer.from('环球易购')
let buf1 = buf.slice(0, 5)
let buf2 = buf.slice(5)
let {StringDecoder} = require('string_decoder')

//在下边我们打印就会出现错误
console.log(buf1.toString())
console.log(buf2.toString())

// 遇到以上以外导致的乱码问题，使用string_deoder解决
// string_decoder: 不识别的时候先不输出，缓存，等到后边输入的内容可以拼接成一个正常字符的时候输出
let sd = new StringDecoder()
console.log(sd.write(buf1).toString())
console.log(sd.write(buf2).toString())
```

### 读取一个文件

```javascript
// 同步的性能低，会阻塞主线程，能用异步就应该使用异步
let fs = require('fs')
let path = require('path')

// 读取文件的时候默认编码是Null， Null代表的就是二进制
 fs.readFile(path.join(__dirname, '1.txt'), {flag: 'r'}, (err, data) => {
     console.log(`data=> ${data}`)
 })
```

### 写入一个文件

```javascript
//写入文件 路径， 编码
// 编码格式写入
// mode 权限
// 0o666 表示可读
// 0o4444 表示可写
// chmod -R 777 *
fs.writeFile(path.join(__dirname, '2.txt'),'hello write test', {flag: 'w'}, err => {
    console.log(err)
})
fs.readFile(path.join(__dirname, '2.txt'), (err, data) => {
    console.log(`data=> ${data}`)
})
```

### 拷贝一个文件

```javascript

let fs = require('fs')
let path = require('path')

function copy (sorce, target) {
    //读取文件
    fs.readFile(path.join(__dirname, sorce), (err, data) => {
        if (err) throw Error(err)
        //写入target目标文件
        fs.writeFile(path.join(__dirname, target), data, {flag: 'w+'}, err => {
            if (err) throw Error(err)
        })
    })
}
copy('2.txt', '3.txt')
// nod 8.5+ 有一个copyFile方法
// copyFile方法不能读取大文件，因为读取的时候是先把读取的内容放到内存中曲，然后在写入，文件过大的时候，内存不足会导致死机。。。。
 fs.copyFile(path.join(__dirname, '2.txt'), path.join(__dirname, '3.txt'), () => {
     console.log('拷贝成功')
 })
```

### 常用的几个`fs.open`

```javascript
// 限制读取个数 手动读取
// fs.open 打开文件，先要打开文件，才能对文件操作
// fd: file descriptor 文件描述，他代表当前文件的描述
// process.stdout.write() //标准输出
// process.stderr.write() //标准错误输出

let fs = require('fs')
let path = require('path')
let buffer = Buffer.alloc(3)

// open参数： 文件绝对路径 操作模式 flags 表示读or写 配置权限 callback
// 读取一个文件
fs.open(path.join(__dirname, '1.txt'), 'r', 0o6666, (err, fd) => {
    // offset表示的是buffer从那个开始
    // length 一次想读几个
    // length 不能大于buffer的长度
    // position 带表的是文件爱你的读取位置，默认可以写Null，当前从0开始
    if (err) throw Error(err)
    fs.read(fd, buffer, 0, 3, 0, (err, bytesRead) => {
        console.log('222222')
        console.log(err, buffer.toString(), bytesRead)
    })
})

// 写入文件
let fs = require('fs')
let path = require('path')
let buffer = Buffer.alloc(3)

fs.open(path.join(__dirname, '2.txt'), 'r+', 0o6666, (err, fd) => {
    fs.write(fd, Buffer.from('环球易购'), 3, 3, null, (err, byteWrite) => {
        if (err) throw Error(err)
        console.log(byteWrite)
    })
})


// 关闭文件
// 文件打开是需要关闭的，因为linux打开的文件数是有限制的
let fs = require('fs')
let path = require('path')
fs.open(path.join(__dirname, '2.txt'), 'w', (err, wFd) => {
    fs.write(wFd, Buffer.from('环球易购'), 0, 12, 0, (err, bytesWritted) => {
        //当write方法触发了毁掉函数，并不是真正的的文件写入了，先把内容写入到缓存去，
        // 我们们使用fs.fsync强制将缓存区的内容写入后关闭文件
        fs.fsync(wFd, ()=> {
            fs.close(wFd, ()=> {
                console.log('关闭')
            })
        })
    })
})

```

### 文件拷贝

```javascript
// 实现一个copy方法，copy大文件的时候使用
let fs = require('fs')
let path = require('path')
/**
 * @description 实现拷贝方法
 * @param {string} source 要拷贝的源文件
 * @param {String} target 要拷贝的目标文件
 * 
 * 实现思路：
 * 1.创建变量size: 表示读取buffer的长度
 * 2.创建buffer对象：下边读取文件和写入文件是使用
 * 3.使用fs.open打开源文件，得到rFd(目标文件的文件描述)
 * 4.然后在回调函数判断是否有错，有的话直接抛出错误，没有的话进如下一步
 * 5.使用fs.open方法打开目标文件，拿到wFd(目标文件的文件描述)
 * 6.继续判断是否又错误，有的话直接抛出错误，没有的话进如下一步
 * 7.写一个next方法，进行读取和写入，并且方便递归调用
 * 8.next方法
 *     1.读取源文件，并拿到长度为size的内容放入第一步创建的buffer对象
 *     2.判断读取内容（bytesRead）的长度，如果bytesRead小于等于0，说明文件读取完毕了，则不继续向下执行
 *     3.写入目标文件文件
 */
function copy (source, target) {
    let size = 3 //每次读文件的大小
    let buf = Buffer.alloc(3)

    //先去打开文件
    fs.open(path.join(__dirname, source), 'r', (err, rFd) => {
        //如果读取不到source文件之间抛出错误
        if (err) throw Error(err)
        // 如果没有报错，则打开target文件，准备写入
        fs.open(path.join(__dirname, target), 'w', (err, wFd) => {
            //如果有错误，直接抛出错误
            if (err) throw Error(err)
            // 开始读取内容
            function next() {
                // 读取文件
                fs.read(rFd, buf, 0, size, null, (err, bytesRead) => {
                    // 假如bytesRead小于等于0，说明文件读取完毕了，则不继续向下执行
                    if (bytesRead > 0 ){
                        // 写入文件
                        fs.write(wFd, buf, 0, bytesRead, null, (err, bytesWritted) => {
                            next() //调用自己执行下一次读取
                        })
                    } else {
                        fs.close(rFd, () => {}) //读取的文件没有缓存的问题，可以直接关闭
                        fs.fsync(wFd, () => {
                            fs.close(wFd, () => {
                                console.log('关闭')
                            })
                        })
                    }
                })
            }

            next() //开始读取并写入
        })
    })

   
}
copy('2.txt', '3.txt') 

```

