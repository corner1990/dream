// let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let promises = this.tasks.map(task => task());
        return Promise.all(promises);
    }
}

console.time('cost');
let queue = new AsyncParallelHook(['name']);
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('leo').then(()=>{
    console.timeEnd('cost');
})