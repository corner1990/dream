let PathToReg = require('path-to-regexp')
let keys = []

// end = false 不必须结束
// end = true 必须结束
// let reg = PathToReg('/user/:id', keys, {end: false})
// 打印结果
// console.log(reg) // /^\/user(?:\/(?=$))?(?=\/|$)/i
// end = false 不必须结束
// console.log(reg.test('/user')) // true
// console.log(reg.test('/user/1')) // true

// end = true 必须结束
// let reg = PathToReg('/user', keys, {end: true})
// console.log(reg.test('/user')) // true
// console.log(reg.test('/user/1')) // false

// keys 里边保存的是路由参数
// console.log(keys) 
// 打印效果如下
// [ 
//     {
//         name: 'id',
//         prefix: '/',
//         delimiter: '/',
//         optional: false,
//         repeat: false,
//         partial: false,
//         pattern: '[^\\/]+?'
//     }
// ]

let reg = PathToReg('/user/:id/:name', keys, {end: false})
// console.log(keys)
let result = '/user/1/hello'.match(reg)
// console.log(result) 
// [ '/user/1/hello', '1', 'hello', index: 0, input: '/user/1/hello' ]
let names = keys.map(key => key.name)
// console.log(names) // [ 'id', 'name' ]

// 对一个数组进行处理
let parmas = names.reduce((memo, name, idx) => {
    memo[name] = result[idx + 1]
    return memo
}, {})

console.log(parmas) // { id: '1', name: 'hello' }