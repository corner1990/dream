let fs = require('fs')
let path = require('path')
//自己模拟写的可读流对象
let ReadStream = require('./ReadStream')

//常见的可读流： socket、req
//创建一个可读流，使用new ReadStream 返回一个可读流对象
let rs = new ReadStream(path.join(__dirname, '1.txt'), {
    flags: 'r', // 文件操作都是读取操作
    // encoding: 'utf8', //默认是null， null代表的是buffer
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
    // rs.pause() //暂停触发data事件
})
// 读取文件结束
rs.on('end', () => {
    console.log('fs read end')
})
