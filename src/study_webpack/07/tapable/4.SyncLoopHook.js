// 监听函数返回true表示继续循环，返回undefined表示循环结束，注意，这个函数不适合处理多个任务
// let { SyncLoopHook } = require('tapable')
class SyncLoopHook {
    constructor () {
        this.hooks = []
    }
    tap (name, cp) {
        this.hooks.push(cp)
    }
    call (...args) {
        this.hooks.map(hook => {
            let ret;
            do {
                ret = hook(...args)
            } while (ret == true || !(ret === undefined))
        })
    }
}

let queue = new SyncLoopHook(['name'])

let count = 0
queue.tap('i', name => {
    console.log(name, count++)
    if (count === 3) {
        return undefined;
    }
    return true
})
queue.call('helo')