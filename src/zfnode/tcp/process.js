// process 进程
// node 实现一个自带的模块 child_process
// 可以创建一个进程为我们服务，不会印象当前node的事件环，

// 多进程
// 多核CPU 如果node只开一个进程，只会占用一个cpu

// 集群
// let os = require('os').cpus()
// console.log(os.length)

// 如何创建一个紫禁城, 复杂再进程之间通信,
// node 不适合cpu密集
// spawn 生产 fork 叉子 exec 执行, execFile 执行文件
let { spawn } = require('child_process')
let path = require('path')

let child = spawn('node', ['1.test.js', 'a', 'b', 'c'], {
    cwd: path.join(__dirname, 'pro'),
    // stdio: 'inherit',
    // stdio: [process.stdin, process.stdout, process.error],
    // stdio: [0, 1, 2],
})
// stdio 如果不写值，莫认是pipe

// 主进程有三个东西
// process.stdin 0
// process.stdout 1
// process.error 2

child.on('exit', () => console.log('exit'))
child.on('close', () => console.log('close'))
child.on('error', () => console.log('发生错误'))

// 模块之间通信
child.stdout.on('data', data => console.log(data.toString()))

// 建立两个进程，第一个进程负责讲第一个进程中的参数传入到第二个进程中去，第二个进程再把值写入到文件中去
