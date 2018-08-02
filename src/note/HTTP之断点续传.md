# HTTP之断点续传

> 这里主要是理解http断点续传的原理，如何通过http请求头操作，以及相应的请求和响应头的设置。

### server端实现

```javascript
// 断点续传

// 客户端要发一个头 Range:bytes = 0 -1
// 服务端返回一个头
// Accept-Ranges:bytes
// COntent-Ranges: 0-10/总大小

const http = require('http')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const stat = promisify(fs.stat) // 将方法promise化

const server = http.createServer(async (req, res) => {
    // 拼接文件路径，读取文件大小
    let p = path.join(__dirname, 'content.txt')
    let statObj = await stat(p)
    let start = 0
    let end = statObj.size //可读流是包前包后
    let total = end
    // 读取文件大小
    
    // 读取请求头
    let range = req.headers['range']
    // 如果有请求头部，则进行分片读取
    if (range) {
        // 设置请求头，告诉浏览器支持分片下载
        res.setHeader('Accept-Ranges', 'bytes')
        // 拿到起始位置和结束为止
        let result = range.match(/bytes=(\d*)-(\d*)/)
        start = result[1] ? result[1] - 0 : start
        end = result[2] ? result[2] - 1 : end
        // 获取成功 并且文件总大小告诉客户端
        res.setHeader('Content-Range', `${start}-${end}/${total}`)
    }
    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    fs.createReadStream(p, {start, end}).pipe(res)
})

server.listen(3000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
})

// 关闭HTTP服务器
server.on('close', () => {
  console.log('服务器关闭')
})

// 服务器监听错误
server.on('error', e => {
  console.log(e)
})
```

### 模拟客户端

> 这里使用node模拟客户端

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

let ws = fs.createWriteStream(path.join(__dirname, './download.txt'))
let pause = false
let start = 0
let step = 10

// 请求参数
let options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    methods: 'GET'
}
/**
 * @description 下载文件
 */
function download () {
    // 跟新请求头
    options.headers = {
        Range: `bytes=${start}-${start + step}`
    }
    // 更新下标
    start += step

    // 发送请求
    http.get(options, res => {
        let range = res.headers['content-range']
        let total = range.split('/')[0]

        let buffers = []
        res.on('data', chunk => {
            buffers.push(chunk)
        })
        // 合并文件 并写入本地磁盘
        res.on('end', () => {
            ws.write(Buffer.concat(buffers))
            console.log('end', buffers.toString())
            // 如果不是暂停，并且没有大于文件总长度，才会继续下载
            // if (pause === false && start < total) download()

            // 为了展示效果，这里做一个手动延迟
            setTimeout(() => {
                if (pause === false && start < total) download()
            }, 5000)
        })
    })
}
download()

// 下载 每次获取10个 我们在控制台进行操作 输入p是暂停，其他任意键是继续
process.stdin.on('data', chunk => {
    chunk = chunk.toString()
    if (chunk.includes('p')) {
        pause = true
    } else {
        pause = false
        download()
    }
})

```

### 总结

> 通过以上简单的代码，对断点续传，以及http请求头做了一个学习和体会，知道了`Accept-Range`的作用，其实很多东西都可以通过请求头和响应头来操作，只是目前太菜了 好多还只能看看....