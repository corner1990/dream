// 异步并行执行钩子
// let { AsyncParallelHook } = require('tapable')
class AsyncParallelHook {
    constructor () {
        this.hooks = []
    }
    tap (name, cp) {
        this.hooks.push(cp)
    }
    callAsync () {
        let args = Array.from(arguments)
        let cb = args.pop()
        this.hooks.map(hook => {
            hook(args)
        })
        cb()
    }
}

let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('hello',err=>{
    console.log(err);
    console.timeEnd('cost');
});