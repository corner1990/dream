# `Path-to-RegExp`模块

> 将路径字符串（如/ user /：name）转换为正则表达式。
>
> [path-to-regexp 介绍](https://www.npmjs.com/package/path-to-regexp)

### 安装模块

```javascript
npm install path-to-regexp --save
```

### 简单的使用

```javascript
// 引入模块
let PathToReg = require('path-to-regexp')
// 要使用路径中找到的键填充的数组
let keys = []

let reg = PathToReg('/user/:id', keys, {end: false})
// 打印结果
console.log(reg) // /^\/user(?:\/(?=$))?(?=\/|$)/i

// end = false 不必须结束
console.log(reg.test('/user')) // true
console.log(reg.test('/user/1')) // true

// end = true 必须结束
let reg = PathToReg('/user', keys, {end: true})
console.log(reg.test('/user')) // true
console.log(reg.test('/user/1')) // false


```

- keys保存的是路由参数

```javascript
// 引入模块
let PathToReg = require('path-to-regexp')
// 要使用路径中找到的键填充的数组
let keys = []

let reg = PathToReg('/user/:id', keys, {end: false})
console.log(keys) 
// 打印效果如下
[ 
    {
        name: 'id',
        prefix: '/',
        delimiter: '/',
        optional: false,
        repeat: false,
        partial: false,
        pattern: '[^\\/]+?'
    }
]
```

- 使用路由拿到返回值

```javascript
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
```

### 结束

> 这是简单的组件使用,具体更详细的使用方法,可以走[传送门](https://www.npmjs.com/package/path-to-regexp)