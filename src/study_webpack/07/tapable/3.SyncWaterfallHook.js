// let { SyncWaterfallHook } = require('tapable')
// 同步串联执行，这次拿到的结果是上一次return的结果
class SyncWaterfallHook {
    constructor () {
        this.hooks = []
    }
    tap (name, cb) {
        this.hooks.push(cb)
    }
    call () {
        let [first, ...hooks] = this.hooks
        hooks.reduce((ret, hook) => hook(ret), first(...arguments))
    }
}
// 串联执行，拿到上一个次执行的参数
let queue = new SyncWaterfallHook(['name'])
queue.tap('1', function (name) {
    console.log('1', name)
    return 1
})

queue.tap('1', function (name) {
    console.log('2', name)
    return 2
})

queue.tap('1', function (name) {
    console.log('3', name)
    return 3
})

queue.call('leo')