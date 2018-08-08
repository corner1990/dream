//ipc 进程之家通信
let {spawn} = require('child_process')
let path = require('path')

let child = spawn('node', ['3.ipc.js'],{
  cwd: path.join(__dirname, 'pro'),
  stdio: ['pipe', 'pipe', 'pipe', 'ipc']
})

// stdio
// ignore 不要进程的数据
// pipe 管道建立管道
//  null

child.send({name: 'leo'})

child.on('message', msg => {
  console.log('child', msg)
  child.kill() // 杀死进程
  // child.exit()
})


// 



