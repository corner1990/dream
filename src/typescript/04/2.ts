/* 
* 函数累的接口
*/
// 如果希望对一个函数的参数和返回值进行约束
interface discount{
    (price: number):number
}

let cost:discount = function (price:number):number {
    return price * .8
}
console.log(cost(100))

// 对数组对象的约束
interface userInterface{
    [index:number]:string
}

let arr:userInterface = ['str1', 'str2']
console.log(arr)