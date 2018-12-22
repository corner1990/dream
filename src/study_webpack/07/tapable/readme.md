# Tapable 
> Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundle的Compilation都是Tapable的实例
### tapable暴露的方法
```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```
## Tapable用法
### SyncHook
> 串行同步执行，不关心返回值
- 使用方法
```js
const { SyncHook } = require('tapable')
// 当触发此事件的时候需要传入， 然后监听函数可以获取name参数
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
```
- 模拟实现一个SyncHook
```js
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
```
### SyncBailHook
> 串行同步执行，有一个返回值部位null的规则跳过剩下的逻辑
- 方法调用
```js
let { SyncBailHook } = require('tapable')

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
```
- 模拟实现SyncBailHook
```js

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

```

### SyncWaterfallHook
> 同步串联执行，这次拿到的结果是上一次return的结果
- 语法
```js
let { SyncWaterfallHook } = require('tapable')

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
```
- 模拟实现
```js

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
```
### SyncLoopHook
> 监听函数返回true表示继续循环，返回undefined表示循环结束，注意，这个函数不适合处理多个任务
- 语法
```js
let { SyncLoopHook } = require('tapable')


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
```
- 模拟实现
```js
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
```

### AsyncParallelHook
> 异步并行执行钩子
- 语法
```js
let { AsyncParallelHook } = require('tapable')

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
```
- 模拟实现
```js
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
```

## AsyncParallelBailHook

> 带保险的异步并行执行钩子

### tap

```js
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
```

### tapAsync

```js
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let finalCallback=args.pop();
        let count=0,total=this.tasks.length;
        function done(err) {
            if (err) {
                return finalCallback(err);
            } else {
                if (++count == total) {
                    return finalCallback();
                }
            }
        }
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    console.log(1);
    callback('Wrong');
});
queue.tapAsync('2',function(name,callback){
    console.log(2);
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log(3);
    callback();
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```

### tapPromise

```js
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let args=Array.from(arguments);
        let promises = this.tasks.map(task => task(...arguments));
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
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
            reject();
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

queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
},err => {
    console.error(err);
    console.timeEnd('cost');
})
```

## AsyncSeriesHook

>  异步串行钩子

### tap

```js
let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
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
```

### tapAsync

```js
class AsyncSeriesBailHook{
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
```

### tapPromise

```js
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
         //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then(() => b());
        }, first(...args));
    }
}
let queue=new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(data=>{
    console.log(data);
    console.timeEnd('cost');
});
```

## AsyncSeriesBailHook

### tap

```js
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
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
```

### tabAsync

```js
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            task?task(...args,next):callback();
        }
        next();
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback('wrong');
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
```

### tapPromise

```js
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
       setTimeout(function(){
           console.log(1);
           //resolve();
           reject();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(err=>{
    console.log(err);
    console.timeEnd('cost');
},err=>{
    console.log(err);
    console.timeEnd('cost');
});
```

## AsyncSeriesWaterfallHook

### tap

```js
let {AsyncSeriesWaterfallHook} = require('tapable');
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tap('1',function(name,callback){
    console.log(1);
});
queue.tap('2',function(data){
    console.log(2,data);
});
queue.tap('3',function(data){
    console.log(3,data);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```

### tapAsync

```js
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesWaterfallHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err,data) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            if (task) {
                if (i==0) {
                    task(...args,next);
                } else {
                    task(data,next);
                }

            } else {
                callback(err,data);
            }
        }
        next();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback(null,1);
   },1000)
});
queue.tapAsync('2',function(data,callback){
    setTimeout(function(){
        console.log(2);
        callback(null,2);
    },2000)
});
queue.tapAsync('3',function(data,callback){
    setTimeout(function(){
        console.log(3);
        callback(null,3);
    },3000)
});
queue.callAsync('zfpx',(err,data)=>{
    console.log(err,data);
    console.timeEnd('cost');
});
```

### tapPromise

```js
let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then((data) => b(data));
        }, first(...args));
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 1);
            resolve(1);
        }, 1000);
    });
});
queue.tapPromise('2', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 2);
            resolve(2);
        }, 2000);
    });
});
queue.tapPromise('3', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 3);
            resolve(3);
        }, 3000);
    });
});
queue.promise('zfpx').then(err => {
    console.timeEnd('cost');
});
```

## tapable

```js
const {Tapable,SyncHook} = require("tapable");
const t = new Tapable();
t.hooks = {
    myHook: new SyncHook()
};
let called = 0;
t.plugin("my-hook", () => called++);
t.hooks.myHook.call();
t.plugin("my-hook", () => called += 10);
t.hooks.myHook.call();
console.log(called);
```