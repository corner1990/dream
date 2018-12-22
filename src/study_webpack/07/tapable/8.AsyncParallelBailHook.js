//let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        for (let i=0;i<this.tasks.length;i++){
            let ret=this.tasks[i](...args);
            if (ret) {
                return callback(ret);
            }
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});