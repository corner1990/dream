class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0, length = this.tasks.length;
        let next = () => {
            let task = this.tasks[index++];
            if (task) {
                task(...args, next);
            } else {
                finalCallback();
            }
        }
        next();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});