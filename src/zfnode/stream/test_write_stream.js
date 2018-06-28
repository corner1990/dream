let fs = require('fs')
let path = require('path')
let WriteStream = require('./WriteStream')
let ws = new WriteStream(path.join(__dirname, './1.txt'), {
    flags: 'w',
    mode: '0o666',
    autoClose: true,
    highWaterMark: 3,// 默认写16k
    encodeing: 'utf8',
    start: 0, //从那个为止开始往内部写
})
let i = 9;
function write () {
    let flag = true;
    while(i > 0 && flag) {
        flag = ws.write(--i+'', 'utf8', ()=>{})
    }
}

write()

ws.on('drain', () => {
    write()
    console.log('drain')
})

write()
ws.on('open', () => {
    console.log('open')
})

ws.on('close', (err) => {
    console.log('close', err)
})