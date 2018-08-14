// 集群 很多歌服务
let cluster = require('cluster')

// cluster.isMaster  是不是主进程
// console.log(cluster.isMaster)

if (cluster.isMaster) {
    // 可以在主分支中创建子进程
    let woker = cluster.fork()
    console.log('父进程')
} else {
    console.log('子进程')
}
console.log(1)
