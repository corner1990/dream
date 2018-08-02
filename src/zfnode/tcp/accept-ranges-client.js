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
