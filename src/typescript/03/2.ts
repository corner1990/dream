/* 
* 静态属性
* 静态方法
*/
class Person2 {
    static message = 'hello'
    // 加上static表示方法是静态属性，属于累的属性，可以通过类调用，但是不会给子实例继承
    static getName() {}
}

let p2 = new Person2()
console.log(Person2.message)
console.log(p2.message)

/* 
* 多态
*/
// 语法抽离实例
class Animal {
    speak () {
        throw Error('不可以调用')
    }
}

class Dog extends Animal{
    speak () {
        console.log('小狗汪汪汪！')
    }
}
class Cat extends Animal{
    speak () {
        console.log('小猫喵喵喵！')
    }
}
let cat = new Cat()
let dog = new Dog()
dog.speak()
cat.speak()


// 抽象方法
/* 
* 定义抽象类
* 不可以直接实例化，只能飞别的实例做继承
*/
abstract class Animal2{
    // 抽象方法
    abstract speak ():void;
}

/* 
* 子类继承抽象父类
* 子类中必须实现父类抽象的方法，否则会报错
*/
class Cat2 extends Animal2{
    speak () {
        console.log('小猫喵喵喵！')
    }
}
