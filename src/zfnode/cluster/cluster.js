// // 集群 很多歌服务
// let cluster = require('cluster')

// // cluster.isMaster  是不是主进程
// // console.log(cluster.isMaster)
// // 根据CPU的核数，创建对应的进程
// if (cluster.isMaster) {
//     // 可以在主分支中创建子进程
//     let woker = cluster.fork()
//     let woker2 = cluster.fork()
//     console.log('父进程')
// } else {
//     console.log('子进程')
// }
// // 下边的代码会每次都执行
// console.log(1)
// cluster.on('fork', Worker => {})
// cluster.on('exit', () => console.log('exit'))
// cluster.on('disconnect', () => console.log('断开连接'))

// // 在实际工作中我们会根据CPU的核数，创建对应的进程
// // 集群 很多歌服务
// let cluster = require('cluster')
// let cups = require('os').cpus()
// let http = require('http')

// // cluster.isMaster  是不是主进程
// // console.log(cluster.isMaster)
// // 根据CPU的核数，创建对应的进程
// if (cluster.isMaster) {
//     // 可以在主分支中创建子进程
//    for (let i = 0; i< cups; i++) {
//        cluster.fork()
//    }
//     console.log('父进程')
// } else {
//     http.createServer((req, res) => {
//         res.end('ok' + process.pid)
//     }).listen(5000)
//     console.log('子进程')
// }
// // 下边的代码会每次都执行
// console.log(1)
// cluster.on('fork', Worker => {})
// cluster.on('exit', () => console.log('exit'))
// cluster.on('disconnect', () => console.log('断开连接'))

// 进程之间通信
// 在实际工作中我们会根据CPU的核数，创建对应的进程
// 集群 很多歌服务
// let cluster = require('cluster')
// let cups = require('os').cpus()
// let http = require('http')

// // cluster.isMaster  是不是主进程
// // console.log(cluster.isMaster)
// // 根据CPU的核数，创建对应的进程
// // 可以通过IPC的方式进行进程之间的通信，默认不支持管道的方式
// if (cluster.isMaster) {
//     // 可以在主分支中创建子进程
//    for (let i = 0; i< cups; i++) {
//        cluster.setupMaster({
//            stdio: 'pipe'
//        })
//        cluster.fork()
//    }
//     console.log('父进程')
// } else {
//     http.createServer((req, res) => {
//         res.end('ok' + process.pid)
//     }).listen(5000)
//     console.log('子进程')
// }
// // 下边的代码会每次都执行
// console.log(1)
// cluster.on('fork', Worker => {})
// cluster.on('exit', () => console.log('exit'))
// cluster.on('disconnect', () => console.log('断开连接'))

// 很多时候我们不想通过判断的方式写代码，可以通过配置，然后实现
let cluster = require('cluster')
let cups = require('os').cpus().length
let path = require('path')

cluster.setupMaster({
    stdio: 'pipe',
    exec: path.join(__dirname, './test/process.js')
})

for (let i = 0; i< cups; i++) {
    cluster.fork()
}
// 下边的代码会每次都执行
cluster.on('fork', Worker => {})
cluster.on('exit', () => console.log('exit'))
cluster.on('disconnect', () => console.log('断开连接'))