let redis = require('redis')
// 连接redis服务
const client = redis.createClient(6379, 'localhost')

// 监听错误哦
client.on_connect('error', function (err) {
    console.log('err', err)
})

// 添加值
// client.set('home', 'gansu', (err, res) => {
//     if (!err) {
//         console.log('res', res)
//     }
// })

// 获取值
client.get('home', (err, res) => {
    if (!err) {
        console.log('res', res)
    }
})