/* 
* 定义类
*/
class Person {
    name: string // 实例属性
    age: number
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
    }

    getName ():string{
        return this.name
    }
}

let p = new Person('leo', 10)
console.log(p.getName())


// 类的继承
class Parent {
    name: string // 实例属性
    age: number
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
    }

    getName ():string{
        return this.name
    }
}

class Student extends Parent {
    no: number
    constructor (name:string, age:number, no:number) {
        super(name, age) // 调用父类的构造函数
        this.no = no
    }
    getNo ():number{
        return this.no
    }
}

let s1 = new Student('hello', 12, 121212)
console.log(s1)


/* 
* 修饰符
* public 公开的，自己，子类都可以访问
* protected 受保护的只有自己和子类可以访问
* private 私有的 只有自己访问
*/
class Father {
    public name:string
    protected age:number
    private money:number
    constructor (name:string, age:number, money:number) {
        this.name = name
        this.age = age
        this.money = this.money
    }
    getName ():string {
        return this.name
    }
    getAge ():number {
        return this.age
    }
    getMoney ():number {
        return this.money
    }
}

class Child extends Father{
    getAge ():number {
        return this.age
    }
}

let c = new Child('test', 10, 100);
console.log(c.getName())
console.log(c.getAge())
console.log(c.getMoney())