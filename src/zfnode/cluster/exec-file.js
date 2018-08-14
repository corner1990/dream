let {execFile} = require('child_process')

// // spawn execFile 是异步的
// execFile('node', ['-v'], {
//     maxBuffer: 100
// }, (err, stdout, stderr) => {
//     // 执行结果会被缓存，执行结束以后一起输出
//     console.log(stdout)
// })

// execFile('ls', ['-l'], {
//     maxBuffer: 800
// }, (err, stdout, stderr) => {
//     // 执行结果会被缓存，执行结束以后一起输出
//     console.log(stdout)
// })

// 官方提示用来执行命令
let {exec} = require('child_process')
// 默认调用
// exec('ls', {
//     maxBuffer: 100
// }, (err, stdout, stderr) => {
//     // 执行结果会被缓存，执行结束以后一起输出
//     console.log(stdout)
// })

exec('ls -l', {
    maxBuffer: 900
}, (err, stdout, stderr) => {
    // 执行结果会被缓存，执行结束以后一起输出
    console.log(stdout)
})