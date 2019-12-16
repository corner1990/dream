# es6 之 new Function
> 恩么么，有一种这样的场景，随着开发的场景越来越多，我们很多时候需要动态几算，以前只要把函数封装好就可以用了，有没有考虑过讲方法也动态封装呢。。。
> 怎么说呢，大神就是大神，很多我还没用到的东西别人已经实现了，最近刚好用到...

### new Function 
- 语法
```JavaScript
let func = new Function ([arg1, arg2, ...argN], functionBody);
// 上边的代码就是动态创建一个函数，我们的参数，函数体都左右参数传入
```

- demo
```javascript
// 求和 官方demo
let sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2))
```
### 创建函数三种语法
```javascript
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```
- 动态函数体分装
> 不得 不说 模板字符串在这里也是极好用的
```javascript
let fnBody = 'console.log("Hello, ${name}, nice to meet you!")'
let sayHello = new Function('name', fnBody)
sayHello('leo')
```
### 注意事项
> 看起来很美好，但是，但是， 但是
> 这么创建的函数作用域是在顶级，不在你代码运行的context域中，下边就是一个示范

```javascript
 let val = '123';

function getFn() {
    let val = 'this is val!';
    let fn = new Function('console.log(val)');
    return fn;
}

getFn()() // 这里输出：123
```

### 最后
> 个人能力有限，只能简单的总结一些可以用到的场景，抛砖引玉， 若有更好的方式，请告知过，茶水费丰厚

1. 动态几算， 比如我们做报表的时候把函数替分装好
2. 函数柯里化，以前我们可能只能处理部分参数，现在还可以处理更复杂的场景，参考koa的洋葱模型，只要你愿意，拓展性极强
3. 通过call修改this指向，oop也是ok的
4. 其他函数时编程设计功能函数

```javascript
// 参数处理 总感觉那里不对，求指点
function getFn() {
    let fn = new Function('console.log(this.name, Array.from(arguments))');
    return fn;
}

getFn().call(obj, 3, 4)
```
