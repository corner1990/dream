// writeStream

let fs = require('fs')
let path = require('path')
let ws = fs.createWriteStream(path.join(__dirname, './1.txt'), {
    flags: 'w',
    mode: '0o666',
    autoClose: true,
    highWaterMark: 3,// 默认写16k
    encodeing: 'utf8',
    start: 0, //从那个为止开始往内部写
})


// let flag = ws.write('1', 'utf8', () => {})//方法是异步的
// 写入的数据必须是buffer
// flag 代表的是继续写
// 表示符表示的并不是是否写入，表示的是是能否继续写， 凡事返回false，也不会丢失，就会把内容放到内存中去
let flag = ws.write('1', 'utf8', () => {}) //这是一个异步方法
console.log(flag, 'flag')
flag = ws.write('2', 'utf8', () => {}) //这是一个异步方法
console.log(flag, 'flag')
flag = ws.write('3', 'utf8', () => {}) //这是一个异步方法
console.log(flag, 'flag')

// 方法有： write end
ws.end() //当写完以后就不能继续在写了
// ws.write('456') // write after end

// 抽干方法， 当都写入完成后会触发drain事件
// 必须缓存去满了，满了后被清空才会触发drain事件

let fs = require('fs')
let path = require('path')
let ws = fs.createWriteStream(path.join(__dirname, './1.txt'), {
    flags: 'w',
    mode: '0o666',
    autoClose: true,
    highWaterMark: 3,// 默认写16k
    encodeing: 'utf8',
    start: 0, //从那个为止开始往内部写
})

ws.on('drain', ()=>{
    console.log('drain')
})

// for (var i = 0; i < 9; i++) {
//     let flag = ws.write(i+'')
//     console.log(flag)
// }

// 可读流配合可写流， 写一个pipe发给你发
// flag 当文件被抽干以后才会改变为TRUE
let fs = require('fs')
let path = require('path')
let ws = fs.createWriteStream(path.join(__dirname, './1.txt'), {
    flags: 'w',
    mode: '0o666',
    autoClose: true,
    highWaterMark: 3,// 默认写16k
    encodeing: 'utf8',
    start: 0, //从那个为止开始往内部写
})
let i = 9;
/**
 * @description 一个写入文件方法
 * 循环写入--i 到指定的文件，当flag等于false的时候，
 */
function write () {
    let flag = true;
    // flag不等于true的时候，说明node正在写入文件，在读取到的内容会被添加到缓存区，等我们全部写入完毕以后，flag就会改变为true
    while(i > 0 && flag) {
        flag = ws.write(--i+'', 'utf8', ()=>{})
    }
}


// 每次消费光缓区中的内容，就会触发这个事件，我们就可以继续写入文件了
ws.on('drain', () => {
    write()
    console.log('drain')
})