let {fork} = require('child_process')
let path = require('path')

let child = fork('fork.js', ['a', 'b', 'c'], {
    cwd: path.join(__dirname, 'pro'),
    silent: true, // 这句话的意思就是: ['ignore', 'ignore', 'ignore', 'ipc']
})
// 默认支持IPC
// 默认的fork [0, 1, 2, 'ipc']
child.send('hello')
