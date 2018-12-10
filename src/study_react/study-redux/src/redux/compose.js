function add1 (str) {
    return 1 + str
}
function add2 (str) {
    return 2 + str
}
function add3 (str) {
    return 3 + str
}

// 打印拿到结果
// let ret = add1(add2(add3('hello world')))
// console.log(ret) //123hello world
/**
 * 
 * @param  {...any} fns function 处理函数
 * 说明： 第一次执行拿到返回的函数， 也就是return返回的fns.reduceRight
 *       后边继续执行的时候会由右向左的计算
 */
// function compose (...fns) {
//     // console.log('fns', fns) // [ [Function: add1], [Function: add2], [Function: add3] ]
//     return args => fns.reduceRight((val, fn) => fn(val), args)
// }

// let ret = compose(add1, add2, add3)('hello world')
// console.log(ret) // 123hello world

// 处理多个参数
function sum (a, b) {
    return a + b
}
// function compose (...fns) {
//     // console.log('fns', fns) // [ [Function: add1], [Function: add2], [Function: add3] ]
//     // return function (...args) { 
//     //     let last = fns.pop()
//     //     return fns.reduceRight((val, fn) => fn(val), last(...args))
//     // }
//     return (...args) => {
//         let last = fns.pop()
//         return fns.reduceRight((val, fn) => fn(val), last(...args))
//     }
// }

//  进化版
/**
 * @param  {...any} fns 传入函数
 * 执行思路：
 * 1.第一次执行的时候， a = add1 , b = add2, let tmp = add1(add2(...args))
 * 2.第二次执行： a = tmp, b = add3, let tmp = add3(tmp('''args))
 * 3.第三次执行: a = tmp, b = sum, let tmp = a(sum(...args))
 * 4.最后返回结果
 * 总结：
 * 虽然执行顺寻时从左往右执行，但是每次都会把右边的函数(b)执行，然后把执行的返回值作为参数传递给函数a，一直循环到最后一层，也就是我们的dispacth，
 * 
 */
function compose (...fns) {
    return fns.reduce((a, b) => (...args) => {
        // args => 第一次： store.dispatch 
        // args => 第二次： 中间件处理函数，形参为action的函数
        return a( b(...args) )
    } )
}
// 
// function compose (...fns) {
//     return fns.reduce((a, b) => (...args) => a( b(...args) ) )
// }

// let ret = compose(add1, add2, add3, sum)('hello world', ' leo')
// console.log(ret) // 123hello world leo

export default compose