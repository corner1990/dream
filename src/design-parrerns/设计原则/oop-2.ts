/**
 * @desc 多态
 */
class Animal{
    name: string;
    constructor (name) {
        this.name = name;
    }
    eat(food) {

    }
}

class Dog extends Animal{
    eat (food) {
        console.log(`${this.name}吃${food}`)
    }
}

class Person extends Animal{
    eat (food) {
        console.log(`${this.name}吃${food}`)
    }
}


let dog = new Dog('狗')
dog.eat('包子')

let p = new Person('ren')
p.eat('亏')
