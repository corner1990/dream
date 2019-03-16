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


### 接口

- 接口是一种规范的定义，定义了行为和动作的规范
- 接口定义了某些类必须遵守的规范
- 接口不关心类的内部状态数据，也不关心细节
- 类似与抽象类，还增加了属性、函数等类型

- 属性类接口

  ```typescript
  /* 
  * 属性类的接口
  */
  interface userInterface{
      name: string,
      age: number,
      home?: string,
      height?:number
  }
  
  function getUserInfo (user: userInterface):void {
       console.log(`${user.name} ${user.age}`)
   }
  
  function getVipInfo (user: userInterface):void {
      console.log(`${user.name} ${user.age}`)
  }
  
   getUserInfo({name: 'leo', age: 10})
   getVipInfo({name: 'vip', age: 999})
  ```

- 函数类的接口

  > 如果希望对一个函数的参数和返回值进行约束

  ```typescript
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
  ```

- 使用接口类

  ```typescript
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
  
  ```


### 泛型 generic type
- 范性可以支持不特定的数据类型
- 要求传入的参数和返回的参数一致

  ```typescript
  function calculate<T>(value:T):T{
      return value
  }
  // 调用函数的时候讲类型传递过去
  console.log(calculate<string>('leo'))
  console.log(calculate<number>(1))
  
  // 类的泛形使用
  class MyArray <T> {
      private list:T[] = []
  
      add(value:T) {
          this.list.push(value)
      }
      max():T{
          let ret = this.list[0]
          for(let i=1; i < this.list.length; i++) {
              if (this.list[i] > ret) ret = this.list[i]
          }
  
          return ret
      }
  }
  let arr1 = new MyArray<number>()
  arr1.add(1)
  arr1.add(23)
  arr1.add(15)
  arr1.add(65)
  arr1.add(175)
  console.log(arr1.max())
  ```


### 在vscode中配置使用

- 进入到当前文件目录

- 生成配置文件: `tsc --init`

  ```json
  {
    "compilerOptions": {
      /* Basic Options */
      "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. 指定ECMAScript的目标版本*/
      "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 指定模块代码的生成方式*/
      // "lib": [],                             /* Specify library files to be included in the compilation. 指定编译的时候用来包含的编译文件*/
      // "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译JS文件*/
      // "checkJs": true,                       /* Report errors in .js files. 在JS中包括错误*/
      // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定JSX代码的生成方式 是保留还是react-native或者react*/
      // "declaration": true,                   /* Generates corresponding '.d.ts' file.生成相应的类型声明文件 */
      // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. 为每个类型声明文件生成相应的sourcemap*/
      // "sourceMap": true,                     /* Generates corresponding '.map' file. 生成对应的map文件 */
      // "outFile": "./",                       /* Concatenate and emit output to single file. 合并并且把编译后的内容输出 到一个文件里*/
      // "outDir": "./",                        /* Redirect output structure to the directory.按原始结构输出到目标目录 */
      // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 指定输入文件的根目录，用--outDir来控制输出的目录结构*/
      // "composite": true,                     /* Enable project compilation 启用项目编译*/
      // "removeComments": true,                /* Do not emit comments to output. 移除注释*/
      // "noEmit": true,                        /* Do not emit outputs. 不要输出*/
      // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
      // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. 当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
      // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule').r把每一个文件转译成一个单独的模块 */
  
      /* Strict Type-Checking Options */
      //"strict": true,                           /* Enable all strict type-checking options. 启用完全的严格类型检查 */
      // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. 不能使用隐式的any类型*/
      // "strictNullChecks": true,              /* Enable strict null checks. 启用严格的NULL检查*/
      // "strictFunctionTypes": true,           /* Enable strict checking of function types. 启用严格的函数类型检查*/
      // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions.启用函数上严格的bind call 和apply方法 */
      // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. 启用类上初始化属性检查*/
      // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type.在默认的any中调用 this表达式报错 */
      // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. 在严格模式下解析并且向每个源文件中发射use strict*/
  
      /* Additional Checks */
      // "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用到的本地变量时报错 */
      // "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用到的参数时报错*/
      // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 当不是所有的代码路径都有返回值的时候报错*/
      // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 在switch表达式中没有替代的case会报错 */
  
      /* Module Resolution Options */
      // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). 指定模块的解析策略 node classic*/
      // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. 在解析非绝对路径模块名的时候的基准路径*/
      // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. 一些路径的集合*/
      // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. 根目录的列表，在运行时用来合并内容*/
      // "typeRoots": [],                       /* List of folders to include type definitions from. 用来包含类型声明的文件夹列表*/
      // "types": [],                           /* Type declaration files to be included in compilation.在编译的时候被包含的类型声明 */
      // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking.当没有默认导出的时候允许默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
      //"esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.*/
      // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks.不要symlinks解析的真正路径 */
  
      /* Source Map Options */
      // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. 指定ts文件位置*/
      // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. 指定 map文件存放的位置 */
      // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. 源文件和sourcemap 文件在同一文件中，而不是把map文件放在一个单独的文件里*/
      // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. 源文件和sourcemap 文件在同一文件中*/
  
      /* Experimental Options */
      // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启动装饰器*/
      // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
    }
  }
  ```

- 编译

  > 修改好配置文件以后，在命令函数输入命令：tsc
  >
  > 即可看到编译后的文件

- vscode 自动编译

  - Terminal->Run Task-> tsc:build 编译
  - Terminal->Run Task-> tsc:watch 编译并监听
- npm scripts

  - npm run 实际上是调用本地的 Shell 来执行对应的 script value，所以理论上能兼容所有 bash 命令
  - Shell 在类 Unix 系统上是 /bin/sh，在 Windows 上是 cmd.exe

- npm scripts 的 PATH

  - npm run 会预置 PATH，对应包下的 node_modules/.bin 目录





