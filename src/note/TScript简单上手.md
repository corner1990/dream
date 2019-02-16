# TScript简单上手

### TScript简介
- Typescript 是由微软开发的一款开源的编程语言
- Typescript 是JavaScript的超集，遵循最新的es5，es6规范。Typescript 扩展了JavaScript语法
- Typescript 更像后端java， c#这样的面向对象的语言，可以让js开发大型企业应用

### 安装TScript

```bash
npm i typescript -g
```

### 使用

- 新建1.ts文件, 内容如下

  ```js
  let a = 1;
  ```

- 编译文件

  > 使用命令行工具，进入到新建文件的目录。输入以下命令

  ```bash
  tsc ./1.ts
  ```

### 数据类型

- 布尔类型

  ```js
  let isMarried:boolean = true;
  ```

  

- 数字类型

  ```js
  let mum:number = 1;
  ```

  

- 字符串类型

  ```js
  let str:string = 'abc'
  ```

  

- 数组

  > 数组定义比较特殊，首先是定义数组的累醒了其次是定义数组里存放的数据类型

  ```js
  // 数组 只能存放字符串类型数据
  let hobbys:string[] = ['smokeing', 'drinking', 'haire']
  // 数组 只能存放数字类型数据
  let numers:Array<number> = [1, 2, 3, 4]
  // 数组，只能存放对象类型数据
  let objs:Array<object> = [{name: 'leo'}, {name: 'join'}]
  // 数组，可以存放对象或者数字类型数据
  let arr:Array<object|number> = []
  // 数组，可以存放任意类型数据
  let Any:Array<any> = []
  ```

  

- 对象

  ```js
  let obj:object = {content: 'hah'}
  ```

  

- 元祖

  > 长度必须固定，并且存放的数据必须和定义的一致

  ```js
  let fullname:[string, string] = ['zhang', 'san']
  ```

- 枚举

  > 定义枚举类型的值 性别，里边有两个选项，girl， boy

  ```js
  enum Gender {
      BOY = '男孩',
      GIRL = '女孩'
  }
  console.log(`leo is gender${Gender.BOY}, nick is ${Gender.GIRL}`)
  ```

- any

  > ANY 任何类型，一旦使用了any相当于放弃了类型检查，慎重使用

  ```js
  let root:any = document.getElementById('#root')
  root.style.color = 'red'
  
  let abc:any = 1
  ```

- null 和 undefined

  ```js
  let x:number|null|undefined;
  x = 10;
  x = undefined;
  x = null;
  ```

- void 内型

  > void, any的反面，不能有任何值

  ```js
  function greeting (name:string = 'leo'):void {
      console.log(`hello ${name}`)
  }
  
  greeting('leo')
  
  let xx:never;
  xx = (() => {throw new Error('worng')})()
  ```

- never

  > never 永远不会有返回值

  ```js
  // 这个函数一旦执行，就不会结束的时候使用nerver
  function sum ():never {
      while (true){
          console.log(true)
      }
  }
  
  function multi ():never{
      // 函数永远不会执行完毕
      throw Error('ok')
  }
  
  function divide (a:number, b:number):never|number {
      return a/b
  }
  
  divide(10, 2)
  ```

  

### 函数

- 形参，形参和实参要完全一样

  ```js
  function greeting2(name:string, age:number):void{}
  ```

- 可选参数 必须是最后一个

  ```js
  function greeting3(name:string, age?:number):void{}
  ```

- 默认参数

  ```js
  function ajax (method:string='GET', url:string) {
      console.log(method, url)
  }
  ajax('post', '/user')
  ```

- 剩余函数

  ```js
  function sum (...numbers:number[]) {
      return numbers.reduce((val, item) => {
          return val + item
      }, 0)
  }
  
  let ret = sum(1, 2, 3, 4)
  console.log(ret)
  ```

- 函数重载

  > Java中: 指两个或者两个一样的函数，参数的个数和类型不一样，执行不同的方法*

  ```js
  // 函数声明
  // js中没法像JAVA那样，如果需要更具不同的参数，实现不同的功能，是需要在内部做判断的
  function attr(val:string):void;
  function attr(val:number):void;
  function attr(val:boolean):void;
  
  // 函数体
  function attr(val:any):void {
      console.log(val)
  }
  
  attr('leo')
  attr(20)
  attr(true)
  ```

- 设置属性示例

  ```js
  // 实现一个attr函数
  function attr (key:string):any;
  function attr (key:string, val:any):boolean;
  
  let obj = {}
  function attr (key: string, val: any) {
      if (arguments.length > 1) {
          obj[key] = val;
      } else {
          return obj[key]
      }
  }
  
  attr('name', 'leo')
  console.log(attr('name'))
  
  ```



### 类的定义

- 定义类

  ```js
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
  ```

- 类的继承

  ```js
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
  ```

- 修饰符

  ```js
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
  // 调用测试
  console.log(c.getName())
  console.log(c.getAge())
  console.log(c.getMoney())
  ```

- 静态属性，静态方法

  ```js
  class Person2 {
      static message = 'hello'
      // 加上static表示方法是静态属性，属于类的属性，可以通过类调用，但是不会给子实例继承
      static getName() {}
  }
  
  let p2 = new Person2()
  console.log(Person2.message)
  console.log(p2.message)
  ```

- 多态

  > 语法抽离实例

  ```js
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
  ```

- 抽象方法

  ```js
  /* 
  * 定义抽象类
  * 不可以直接实例化，只能从别的实例做继承
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
  ```

  



