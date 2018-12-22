// let { AsyncParallelHook } = require('tapable')
class AsyncParallelHook {
    constructor () {
        this.hooks = []
    }
    tapAsync (name, cp) {
        this.hooks.push(cp)
    }
    callAsync () {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,length = this.hooks.length;
        function done(err) {
            if (++i == length) {
                callback(err);
            }
        }
        this.hooks.forEach(hook => {
            hook(...args,done);
        });

    }
}

let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,cb){
    setTimeout(function(){
        console.log(1);
        cb();
    },1000)
});
queue.tapAsync('2',function(name,cb){
    setTimeout(function(){
        console.log(2);
        cb();
    },2000)
});
queue.tapAsync('3',function(name,cb){
    setTimeout(function(){
        console.log(3);
        cb();
    },3000)
});
queue.callAsync('leo',err=>{
    console.log(err);
    console.timeEnd('cost');
});