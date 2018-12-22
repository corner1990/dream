// 串行同步执行，不关心返回值
// const { SyncHook } = require('tapable')
// SyncHook
class SyncHook {
    constructor () {
        this.hooks = []
    }
    tap (name, cb) {
        this.hooks.push(cb)

    }
    call (name) {
        this.hooks.map(hook => hook(...arguments))
    }
}
// // 当触发此事件的时候需要传入， 然后监听函数可以获取name参数
let queue = new SyncHook(['name'])
queue.tap('1', function (name, age) {
    console.log(name, 1)
})

queue.tap('2', function (name, age) {
    console.log(name, 2)
})

queue.tap('3', function (name, age) {
    console.log(name, 3)
})

// 使用call初始时间
queue.call('leo')