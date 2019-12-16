// let str = 'return ' + '`Hello ${name}`!';
// let fn = new Function('name', str);
let sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2))

let fnBody = 'console.log(`Hello, ${name}, nice to meet you!`)'
let sayHello = new Function('name', fnBody)
sayHello('leo')
// console.log(fn('leo'))
val = '123'
//  作用域问题， 这里的函数的作用域是全局作用域
// function getFn() {
//     let val = 'this is val!';
//     let fn = new Function('console.log(val)');
//     return fn;
// }

// getFn()()
let obj = {
    name: 'leo'
}
// call 调用
// function getFn() {
//     let fn = new Function('console.log(this.name)');
//     return fn;
// }

// getFn().call(obj)
// 参数处理
function getFn() {
    let fn = new Function('console.log(this.name, Array.from(arguments))');
    return fn;
}

getFn().call(obj, 3, 4)