// 串行同步执行，有一个返回值部位null的规则跳过剩下的逻辑
// let { SyncBailHook } = require('tapable')

class SyncBailHook {
    constructor () {
        this.hooks = []
    }
    tap (name, cb) {
        this.hooks.push(cb)
    }
    call (...args) {
         
        let i = 0, ret;
        do {
            ret = this.hooks[i++]()
        } while(!ret)
    }
}


let queue = new SyncBailHook(['name'])

queue.tap('1', function (name) {
    console.log('1', name)
    return 'hello'
})

queue.tap('1', function (name) {
    console.log('2', name)
})

queue.tap('1', function (name) {
    console.log('3', name)
})

queue.call('leo')