/* 
* 使用接口约束类
*/

interface Animal{
    name: string;
    speak (something:string):void;
}

// 继承单个对象
class Dog implements Animal{
    constructor (public name: string) {
        this.name = name
    }
    speak (something:string):void {
        console.log('小狗在'+ something)
    }
}

let dog = new Dog('小甜甜')
dog.speak('哈哈')

// 继承多个接口

interface BridInterface {
    fly():void
}
class Bird implements Animal, BridInterface{
    constructor (public name: string) {
        this.name = name
    }
    speak (something:string):void {
        console.log('小鸟在'+ something)
    }
    fly ():void {
        console.log('小鸟在天空飞翔')
    }
}

let b = new Bird('xiaoliao')
console.log(b.fly())
