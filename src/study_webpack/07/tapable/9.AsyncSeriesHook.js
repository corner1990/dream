// 异步串行钩子
let {AsyncSeriesHook} = require('tapable');
// class AsyncSeriesHook{
//     constructor() {
//         this.tasks=[];
//     }
//     tap(name,task) {
//         this.tasks.push(task);
//     }
//     callAsync() {
//         for (let i=0;i<total;i++){
//             let task=this.tasks[i];
//             task(...args,done);
//         }
//     }
// }
let queue = new AsyncSeriesHook(['name']);
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
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});