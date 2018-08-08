
// 建立两个进程，第一个进程负责讲第一个进程中的参数传入到第二个进程中去，第二个进程再把值写入到文件中去
let {spawn} = require('child_process')
let path = require('path')

let child1 = spawn('node', ['1.test.js', 'a', 'b', 'c'], {
    cwd: path.join(__dirname, 'pro')
})

let child2 = spawn('node', ['2.test.js', 'a', 'b', 'c'], {
    cwd: path.join(__dirname, 'pro')
})

child1.stdout.on('data', data => child2.stdout.write(data))
