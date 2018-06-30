# stream学习(三)

### writeStream

> 可写流是对数据写入'目的地'的一种抽象。

 ### 使用方法如下

- 默认写入的大小是16k
- 写入的数据必须是`buffer`或者字符串
- 方法主要有`write`,`end`

```javascript
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
```

### `drain`方法

> 抽干方法，当写入完成后会被触发
>
> 必须是缓存去满了，满了又被清空才会被触发；

```javascript
// 可读流配合可写流， 写一个pipe 示例
let fs = require('fs')
let path = require('path')
let ws = fs.createWriteStream(path.join(__dirname, './1.txt'), {
    flags: 'w',
    mode: '0o666',
    autoClose: true,
    highWaterMark: 3,// 默认写16k，在这里每次读3个字节
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
```

