// detach 将主进程关掉，子进程可以自己运行
// uref

let { spawn } = require('child_process')
let path = require('path')
let fd = require('fs').openSync('./100.txt', 'w')

let child = spawn('node', ['detach.js'], {
  cwd: path.join(__dirname, 'pro'),
  stdio: [0, fd, 1]
})