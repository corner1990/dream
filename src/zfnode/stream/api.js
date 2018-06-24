// 流 node很多内容都应用到了流
// 流的特点：有序，有方向
// 简单的流的分类： 可读流，可写流

let fs = require('fs')
let path = require('path')
//常见的可读流： socket、req
//创建一个可读流，使用fs.createReadStream 返回一个可读流对象
let rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
    flags: 'r', // 文件操作都是读取操作
    encoding: 'utf8', //默认是null， null代表的是buffer
    autoClose: true, //文件读取完毕以后是否自动关闭
    highWaterMark: 3, //默认是64k， 60*1024b
    start: 0, //开始读取文件的位置
    end: 8, //读取文件的结束位置， 需要注意的是包前又包后(0-9 = 10) ,即闭区间
})

// 默认情况下不会将文件中的内容输出
// 内容回先创建一个buffer对象，并先读取3b， 如果没有监听data事件，则不会继续读取，直到我们监听data事件以后，就会疯狂的触发该事件

// 非流动模式||暂停模式
// 流的模式会疯狂的触发data事件，直到读取完毕
// 开始读取文件，打开流
rs.on('open', () => {
    console.log('fs read open')
})
// 文件读取结束，关闭流
rs.on('close', () => {
    console.log('fs read close')
})
// 文件读取错误时触发
rs.on('error', err => {
    console.log('fs read error', err)
})
//开始读取文件
rs.on('data', data => { // 暂停模式 => 流动模式
    console.log(data)
})
// 读取文件结束
rs.on('end', () => {
    console.log('fs read end')
})

// 通常情况下要我们写那么多参数会很繁琐，而且我们也不可能记得那么多参数，只需要设置一个编码即可，可以按照以下方法

let fs = require('fs')
let path = require('path')
//常见的可读流： socket、req
//创建一个可读流，使用fs.createReadStream 返回一个可读流对象
let rs = fs.createReadStream(path.join(__dirname, '1.txt'))

// 默认情况下不会将文件中的内容输出
// 内容回先创建一个buffer对象，并先读取3b， 如果没有监听data事件，则不会继续读取，直到我们监听data事件以后，就会疯狂的触发该事件
//设置文件读取编码
rs.setEncoding('utf8')

// 非流动模式||暂停模式
// 流的模式会疯狂的触发data事件，直到读取完毕
// 开始读取文件，打开流
rs.on('open', () => {
    console.log('fs read open')
})
// 文件读取结束，关闭流
rs.on('close', () => {
    console.log('fs read close')
})
// 文件读取错误时触发
rs.on('error', err => {
    console.log('fs read error', err)
})
//开始读取文件
rs.on('data', data => { // 暂停模式 => 流动模式
    console.log(data)
    
})
// 读取文件结束
rs.on('end', () => {
    console.log('fs read end')
})

// 通常情况下会一直出发data事件，直到读取结束，而我们有可能需要处理完某些逻辑以后在进行下一次读取，那么我就就会用到两个方法
// rs.pause() //暂停方法，表示暂停读取，可以暂停data事件触发
// rs.resume() //恢复data事件的触发

let fs = require('fs')
let path = require('path')
//常见的可读流： socket、req
//创建一个可读流，使用fs.createReadStream 返回一个可读流对象
let rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
    flags: 'r', // 文件操作都是读取操作
    encoding: 'utf8', //默认是null， null代表的是buffer
    autoClose: true, //文件读取完毕以后是否自动关闭
    highWaterMark: 3, //默认是64k， 60*1024b
    start: 0, //开始读取文件的位置
    end: 8, //读取文件的结束位置， 需要注意的是包前又包后(0-9 = 10) ,即闭区间
})

// 默认情况下不会将文件中的内容输出
// 内容回先创建一个buffer对象，并先读取3b， 如果没有监听data事件，则不会继续读取，直到我们监听data事件以后，就会疯狂的触发该事件

// 非流动模式||暂停模式
// 流的模式会疯狂的触发data事件，直到读取完毕
// 开始读取文件，打开流
rs.on('open', () => {
    console.log('fs read open')
})
// 文件读取结束，关闭流
rs.on('close', () => {
    console.log('fs read close')
})
// 文件读取错误时触发
rs.on('error', err => {
    console.log('fs read error', err)
})
//开始读取文件
rs.on('data', data => { // 暂停模式 => 流动模式
    console.log(data)
    rs.pause() //暂停触发data事件
})
// 读取文件结束
rs.on('end', () => {
    console.log('fs read end')
})

//这里的index和timer只是在为了防止无限触发rs.resume而设置的，就是index等于4的时候相当于已经读完了文件，我们清除一下定时器
let index = 0;
let timer = setInterval(() => {
    if(index == 4) {
        clearInterval(timer)
    }
    index++
    rs.resume() //恢复触发data事件
}, 3000)
