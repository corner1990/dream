# 面向对象学习
### 什么是面向对象
- 把客观对象抽象成属性数据和对数据的相关操作，把内部细节和不相关的信息隐藏起来
- 把同意类型的客观对象的属性和操作绑定在一起，封装成类
    + 面向对象分析 OOA
    + 面向对象设计 OOD
    + 面向对象编程 OOP

### 概念
- 类，对象(实例)
- 父类是公共的
- 定义类
    ```js
    class Animal{
        constructor (name) {
            this.name = name
        }
        say () {
            console.log(`my name is ${this.name}`)
        }
    }
    let dog = new Animal('littel dog')
    dog.say()

    ```
- 继承类
 1. 子类继承父类
 2. 继承可以把公共方法抽离出来，提高复用，减少冗余
    ```js
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
    ```

    
- 封装
    + 把数据封装起来
    + 减少耦合，不该访问的不让外部访问
    + 利于数据的接口权限管理
    + ES6 不支持私有属性，一般_ 开头的都会私有的，不要使用
    + 实现
        - public: 共有修饰符，默认修饰符
        - protected：受保护的修饰符，乐意被雷和子类使用protect修饰的属性和行为
        - private：私有修饰符，只可以在类内部使用

    ```tsx
    
    // 创建父类
    class Animal{
        public name;
        protected age;
        private weight;
        constructor (name, age, weight) {
            this.name = name;
            this.age = age;
            this.weight = weight;
        }
    }
    // 继承父类
    class Person extends Animal {
        private money;
        constructor (name, age, weight, money) {
            super(name, age, weight);
            this.money = money;
        }
        getName(){
            console.log(this.name)
        }
        getAge(){
            console.log(this.age)
        }
    }
    // 创建实例
    let p = new Person('leo', 18, 190, 100)
    
    ```

- 多态

  - 同一个接口可以不同实现
  - 保持子类开放性和灵活性
  - 面向接口编程

  ```tsx
  /**
   * @desc 多态
   */
  class Animal{
      name: string;
      constructor (name) {
          this.name = name;
      }
      // 把eat当成一个接口，让子类继承，实现不同的功能，就是多态
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
  
  ```

  ### 结束语

  > 忘记了什么后学的设计模式，知道某一天面试，某官问道，发现自己基本上已经忘，近期抽时间学习一下，温故而知新啊啊啊啊。。。。