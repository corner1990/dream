// 面向对象类
// class Animal{
//     constructor (name) {
//         this.name = name
//     }
//     say () {
//         console.log(`my name is ${this.name}`)
//     }
// }
// let dog = new Animal('littel dog')
// dog.say()

// 继承父类
class Animal{
    constructor (name) {
        this.name = name
    }
    say () {
        console.log(`my name is ${this.name}`)
    }
}

class Dog extends Animal{
    constructor() {
        super('狗')
    }
    speak () {
        console.log('汪汪汪')
    }
}
let dog = new Dog('littel dog')
dog.say()
dog.speak()


