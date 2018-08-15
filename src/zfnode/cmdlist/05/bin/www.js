#! /usr/bin/env node
let yargs = require('yargs')
let Server = require('../src/app')
let os = require('os').platform()
let {exec} = require('child_process')
// 打印参数
// console.log(process.argv)
// 通过yargs 可以直接拿到处理为对象的参数
let argv = yargs.options('p', {
    alias: 'port',
    default: 5000,
    demand: false, // 是否必填
    type: Number, // 限制类型
    description: '端口号'
}).options('o', {
    alias: 'hostname',
    default: 'localhost',
    demand: false, // 是否必填
    type: String, // 限制类型
    description: '主机地址'
}).options('d', {
    alias: 'dir',
    default: process.cwd(), 
    demand: false, // 是否必填
    type: Number, // 限制类型
    description: '执行目录， 默认是当前目录'
})
.usage('usage my-server [options]')
.example('my-server --port 3000 --hostname localhost --dir c://demo')
.argv
console.log(argv)
let server = new Server(argv)
server.start()

let url = `http://${argv.hostname}:${argv.port}`
// 判断 如果说有open参数，则直接在浏览器打开
if (argv.open) {
    if (os == 'win32') exec(`start ${url}`)
    if (os == 'linux') exec(`open ${url}`)
}
