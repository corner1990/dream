function greeting (name:string):void{
    console.log('hello, ', name)
}

// ts 形参和实参要完全一样
function greeting2(name:string, age:number):void{}

// 可选参数 必须是最后一个
function greeting3(name:string, age?:number):void{}

// 默认参数
function ajax (method:string='GET', url:string) {
    console.log(method, url)
}
ajax('post', '/user')


// 剩余参数
function sum (...numbers:number[]) {
    return numbers.reduce((val, item) => {
        return val + item
    }, 0)
}

let ret = sum(1, 2, 3, 4)
console.log(ret)