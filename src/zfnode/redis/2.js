// 发布订阅
const redis = require('redis')
// 新建两个客户端
const client1 =  redis.createClient(6379, 'localhost')
const client2 =  redis.createClient(6379, 'localhost')

// 订阅食物和饮料两个频道
client1.subscribe('food')
client1.subscribe('drink')

// 发布事件，应为订阅有延迟 所以需要使用setimout
setTimeout(()=> {
    client2.publish('food', '面包')
    client2.publish('drink', '橙汁')

    // 这里取消订阅食物频道
    client2.unsubscribe('food')
}, 1000)

setTimeout(() => {
    client2.publish('food', '牛肉')
    client2.publish('drink', '啤酒')
}, 2000)
