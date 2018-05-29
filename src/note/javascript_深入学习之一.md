# javascript 深入学习之一

### js中的数据类型
1.基本数据类型  
> number、string、Null、boolean、undefined  

2.引用数据类型  
> function, object: {}, [], /[0-9]/

### 预加载
+ 浏览器在预加载的时候，首先会提供一个全局的js执行环境 -> 全局作用域（global/window）
+ 在当前作用域中，js代码执行之前，浏览器默认会把所有的关键字var,function的进行提前声明
  - 申明（declare）：var a; 属于声明，告诉浏览器在当前作用域有一个变量a
  - 定义（defined）：a = 1；赋值属于定义
+ var和function关键字在预解析的操作是不同的
  - var -> 预解释的时候只是声明
  - function -> 在预解释的时候已经提前声明+赋值了
+ 预解释只发生在当前作用域，例如开始的时候只对window下的进行预解释，funciton内部的在function调用的时候解释
```
var a;
var obj = {name: 'leo'}

function total(num1, num2) {
  console.log(num1 + num2)
}
```
+ 欲解释的时候不管条件成不成立，都会把带var提前声明

  ```javascript
  //这里是栗子
  // window 预解析：var name; -> window.name
  if ( !('name' in window) ) {//name in window => true
    var name = 'window'
  }
  console.log(name) //undefined
  ```

  ​


+ 预解释的时候只解释 `=` 左边的，右边的是赋值，不参与解释

  ```javascript
  //匿名函数之函数表达式：把函数定义的部分当做一个值赋值给变量/元素的某一个事件
  //window下的预解释：var fn;
  fn() // VM315:1 Uncaught TypeError: fn is not a function

  var fn = function () {
    console.log("i'm is fn")
  }
  //上边这种方法可以让我们在做开发的报错查找的时候直接向上查找

  //下边这样就可以执行
  fn1() //fni
  function fn1 () {
    console.log('fn1')
  }
  fn1() //fni
  //函数在预解释和执行的过程大致如下：在全局作用域下 通过function关键字定义的函数，浏览器会在堆内存中开辟一个空间，把函数体内的代码当做字符串保存，然后返回这个空间的地址，然后把这个返回的地址赋值给fn1；
  //函数调用的过程：浏览器首先会检查有没有形参，如果有的话进行赋值，然后进行预解释(变量提前声明)；然后逐行往下执行嗲吗
  ```

+ 自执行函数：函数定义和执行一起进行，浏览器不会对其进行预解释

  ```javascript
  //以下是几种简单子执行函数的写法
  (function () {} ());
  (function () {}) ();
  ~function () {} ();
  -function () {} ();
  !function () {} ();
  +function () {} ();
  //不管是加括号 ，还是加~,+..都是为了让匿名函数成为一个需要执行的表达式
  ```

+ 函数体中的return后边的代码虽然不会执行，但是还是会预解释

  ```javascript
  //这是安利
  function fn () {
    console.log(num) //函数在执行之前进行了预解析，变量提升，所以不会报错，只会输出undefined
    return ()=>{}
    var num = 100
    
  }

  fn() ;//undefined
  ```

+ 在预解释的时候如果如果名字已经声明过了，浏览器就不会重新声明，但是需要重新赋值

  ```javascript
  //js中变量名和函数名重复了，也算是冲突
  //window预解释：var fn, window.fn; fn = fn函数的堆地址， window.fn = fn函数的堆地址
  var fn = 'fn';
  function fn () {
    console.log('fnuction')
  }
  //下边是案例
  fn() //1
  function fn () {console.log(1)}
  fn() // 10
  var fn  = '10'
  fn() //VM324:5 Uncaught TypeError: fn is not a function
  function fn () {console.log(2)}
  fn()

  //以上代码执行的打开过程如下：首先浏览器预解释：function fn： 声明+定义,var fn：不需要重复声明;
  1.第一次调用 fn() 这时fn还是一个函数，打印出 1
  2.第二次，同上
  3.这里我们对fn 进行了重新赋值 fn= 10
  4.这里的时候fn已经是一个number，所以直接报错，代码停止运行了
  ```

+ 代码在执行过程中查找上级作用域的机制

  - 如何查找上级作用域：看当前函数实在那个作用域下定义的，那么他的上一级作用域就是谁；和函数在哪里运行没有任何关系

  ```javascript
  //
  var num = 10

  function fn () {
    var num = 20;
    return function () {
    console.log(num)
  }
  }
  var f = fn() //f = fn返回的函数
  f() //20 没有形参 上级作用域有

  ~function () {
    var num = 1200
    f() //20
  }()

  ```

  ​

### js中的内存分类

+ 栈内存：用来提供一个供js运行的环境 -> 作用域（全局作用域/私有作用域）
+ 堆内存：用来存储引用数据类型的值 -> 对象存储的是属性名和值，方法存的是代码字符串

### js中的作用域链
+ 如何区分私有变量和全局变量
  - 全局变量：在全局作用域下声明（预解析的时候）的变量就是全局变量
  - 私有变量：在私有作用域中生命的变量或者形参
  > 在私有作用域中，代码在执行的时候看到一个变量，首先要确定改变了是否是私有变量，如果是，就和外边没有任何关系，如果不是的话会在私有作用域的上一级查找该变量，如果上一级也没有，就会一直查找到window作用域为止
+ 当函数执行的时候（函数调用的直接目的就是让函数体中的代码执行），首先会形成一个新的作用域，然后按照如下步骤进行
  - 如果有形参，先给形参赋值
  - 进行私有作用域中的预解析
  - 私有作用域中的代码由上而下的执行
  > 闭包：属于一种机制，函数在执行的过程中形成了一个新的私有的作用域，里边的参数不会收到外边的干扰(函数外部修改不了函数的私有变量，函数的私有变量也修改不了外界的变量) 


### js中的内存释放和作用域的销毁

+ 堆内存：对象数据类型，或者函数数据类型定义，都会在开辟一个堆内存，每个堆内存都有一个引用地址。如果外边知道了这个地址，就说明被引用了，不能销毁
+ 释放堆内存：只需要把它的引用变量赋值为Null即可，如果当前堆内存没有被任何变量引用，那么浏览器会在空闲的时候把它销毁..

```
javascript
栈内存：
1.全局作用域，只有在关闭页面的时候才会被销毁
2.私有作用域(只有函数执行的时候才会有私有作用域) ,for循环和if只是代码快
  函数在执行的时候会创建一个新的私有的作用域，当私有作用域中的代码执行完毕，当前作用域就会主动释放和销毁
 var person = {name: 'leo', age: 18}
 //销毁内存
 person = null
3.特殊情况
  a.如果当前私有作用域中的部分内存被外部占用，当前私有作用域就不能被销毁了

function fnA () {
  var num = 100;
    return function () {
        console.log(num)
    }
}

var fnB = fnA() 
//fnA在执行的时候创建了一个新的私有作用域，然后反回了一个新的私有的作用域(匿名函数，返回的其实是堆内存的引用地址)，把这个返回的作用域赋值给fnB，此时fnA作用域中的部分作用域被fnB占用，所以fnA在执行完以后不能被销毁
// 上栗子返回num的话fnA还是会被销毁，因为栈内存是全局的。

var btn = document.querySelector('#btn')
~function () {
    btn.onclick =function (){
        console.log('clickMe')
    }
}()
//在上述案例中，因为btn是一个对象，然后在函数内部新建了一个堆内存，然后绑定给btn.click,所以上边的自执行函数也不能被销毁了。

4.不立即销毁案例
function fnC () {
    return function () {
        console.log('fnC')
    }
}
fnC()()//这里先执行fnC返回了一个内部的私有作用域然后接着继续执行返回的作用域，执行完毕以后再销毁fnC,这种情况被称为不立即销毁

//下边是简单的作用域练习

function fnD () {
    var i = 10;
  return function (n) {
      console.log(n + (++i) )
  }
}
var fn = fnD()
fn(10)  //21
fn(20) //32
fnD()(10) //21
fnD()(20) // 31

```

### js中的this关键字
```
//js中this是当前行为执行的主体，js中的context代表的是当前行为执行的环境
//this是谁和在哪里定义和在哪里执行没有任何关系
//如何区分js中的this
1.函数执行，看前边是否有对象，有的话this指的就是.前边的对象；如果没有的话this就是window

    function fn() {
        console.log(this)
    }

    var obj = {
        name: 'hello',
        fn:fn
    }

    fn() //window
    obj.fn() //obj

2.自执行函数中的this永远是window
3.进行dom事件绑定，给元素事件绑定大的方法，在触发事件，执行函数的时候，函数体中的this就是dom元素

    //思考
    var num = 20
    var obj = {
        num: 30,
        fn: (function (num) {
                this.num *= 3
                num += 15
                var num = 45
                return function () {
                    this.num *= 4
                    num += 20
                    console.log(num)
                }
            } (num))
    }

    var f = obj.fn
    f() //65
    obj.fn() //85
    connsole.log(num, obj.num) //120 120
    
    //上述代码的执行情况大致如下：
    1.进行预解析，var num; var obj; var f;
    2.赋值: num = 20; 
        obj.num = 30;
        obj.fn = 自执行函数返回值A
        自执行函数执行过程：在对内存开辟新空间，进行形参赋值， 全局的num被当作值赋值给形参num，然后进行预解释，var num；
        给num赋值： num = win.num = 20
        开始执行函数内容；
        this.num *= 3 //->win.num * 3 = 60 这里的this是window
        num += 15 = 20 + 15 = 35
        num = 45 //重新复制
        在函数体内开辟一个新的堆空间保存fn，然后返回堆内存的空间地址赋值给obj.fn;此时因为该匿名函数的空间有内存被外部引用，从而导致该内存空间不会被销毁；

        fn = obj.fn //-> 自执行函数的返回后值又赋值给了fn

    3.fn() //执行过程
    f() = function () {//此时this = window
                    this.num *= 4 //=> win.num *= 40 = 240 = win.num = 240
                    num += 20 //当前作用域没有num ，查找上级作用于，得到num = 45 = 65
                    console.log(num) //这里输出的是65
                }()

    4.obj.fn() //执行过程
        obj.fn = function () { //this 是 obj
                    this.num *= 4 = obj.num *= 30 = 120
                    num += 20 //同样是查找上级 之前是65 = 65 + 20 = 85
                    console.log(num)//这里输出的85
                }


    5.console.log(win.num, obj.num) //240 120

```

### 单利模式
+ 对象数据类型的作用：把描述同一个对象的属性和方法放在一个内存空间下，起到了分组的作用，我们把这种分组编写代码的方式叫做“单例模式”

```
//这就是例子
var person = {
  name: 'leo',
  age: 16
}
```

+ 在单例模式中，我们管person叫做“命名空间”
+ 单例模式在项目中典型的应用有模块化开发，多人协同同时开发，每个人负责部分功能，最后再把功能集合在一起

```
var tab = function () {} //同时a负责的功能
var banner = functtion () {} //同事B负责的功能。

var util = {//通过一个对象集合在一起
  tab: tab,
  banner: banner
}
```

### js中的工厂模式
+ 单例模式虽然解决了分组的问题，但是不能够批量生产
+ 工厂模式：把实现这些功能的代码封装在一个函数中，以后如果想实现这个功能，只需要执行这个方法就可以了-> “函数的封装”
+ 函数封装的好处：
  - 低耦合，高内聚，有效的减少页面的冗余代码，提高代码的利用率

```
//和还是用创建对象作为例子
function Person (name, age) {//封装方功能
  var obj = {}
  obj.name = name
  obj.age = age
  obj.say = function () {
    console.log(`hello my name is ${this.name},my age is ${this.age}岁`)
  }
  return obj
}

var p1 = Person('leo', 18) //调用工厂方法创建对象
p1.say() //调用对象的say方法
```

+ 所有的编程语言都是面对象的开发的，都会有这几种特性 -> 类的继承、封装、多态
  - 继承：子对象继承父对象的属性和方法
  - 封装：把实现相同功能的代码封装在一个function中
  - 多态：有重载和重写两种；重载在后台语言中就是根据传入的参数不同，执行不同的功能，js中的体现就是通过arguments对象，实现函数柯里化。重写就是子类重写父类的方法。
### js中的构造函数模式
+ 构造函数模式的目的就是为了创建一个类，并且创建这个类的实例
+ 构造模式和工厂模式的区别
  - 执行的时候：一个是直接调用方法，一个是通过new 关键字，工厂模式 -> person(name, age); 构造函数 -> new Person(name, age)
  - js中所有的类都是函数数据类型的。它通过new执行了一个类，但它本身是个普通的函数
  - 在函数执行的时候
    + 相同：都是创建一个私有作用域，然后形参赋值->预解释 -> 代码从上到下执行(类和普通函数一样，也有普通函数大的一面)
    + 不同：在代码执行之前，不用自己手动创建对象，浏览器会默认创建一个对象数据类型的并(这个对象其实是我们当前类的实例），然后分别把属性名和属性值分别赋值给了对象,最后浏览器默认会返回该对象
+ 构造函数模式中，类里边的this.xxx的this默认是指创建的当前实例
+ 创建的实例虽然有相同的方法和属性，但是因为他们在不同堆内存中，所以是独立的，使用===判断的时候会返回false

```
//构造函数模式
var Pereson = function (name, age) {
  this.name = name
  this.age = age
  this.say = function () {
    console.log(`hello my name is ${this.name},my age is ${this.age}岁`)
  }

}

var p1 = new Person;//不传参的话后边可以不用括号
var p2 = new Person('leo', 18)

//this的问题：在类中出现this.xxx = xxx hthis都是当前类的实例，而某个属性值(方法)，方法中的this需要看方法执行的时候，前边是否有 `.` 才能知道this是谁

var Pereson = function (name, age) {
  var lastName = 'hahahaha' //
  this.name = name
  this.age = age
  this.say = function () {
    console.log(`hello my name is ${this.name},my age is ${this.age}岁`)
  }
  return {name: 'helllo'}
}

var p2 = new Person('leo', 18)
console.log(p2.lastName) //undefined
//普通函数的一面：在类里边也会像普通函数那样进行预解析和赋值，代码逐行解释运行，那个lastName被当作私有变量被解析 但是不会赋值给实例对象
//在构造函数模式种中，浏览器默认返回创建的类的实例对象，我们也可以自己手动retun然会对象，如果返回的是值类型的话会被浏览器忽略，但是返回的是一个对象类型的数据的话就会覆盖默认返回的实例对象，例如以下案例：
var Person = function (name, age) {
  var lastName = 'hahahaha' //
  this.name = name
  this.age = age
  this.say = function () {
    console.log(`hello my name is ${this.name},my age is ${this.age}岁`)
  }
  <!-- return function () {console.log('你以为你以为的就是你以为的么？')} -->
  return {}
}

var p3 = new Person('leo', 18)
console.log(p3) //{name: 'hell lo'}
console.log(p3 instanceof Person) //检测p3是否属于Persson大的实例
console.log(name in p3) //检测p3有没有name属性
console.log()

```

+ 检测一个对象是否属于这个类 -> per instanceof Person 
+ 所有的实例都是对象类型，所偶的对象类型行都是object这个内置类的一个实例。所以p3它也是object的一个实例 console.log(p3 instanceof Object) -> true
+ 检测一个属性是否是这个对象的私有属性：hasOwnProperty console.log(p3.hasOwnProperty('name')) //hasOwnPropery方法返回值是一个boolean对象 //false

### 原型链模式
+ 构造函数模式中拥有了类和实例的概念，并且实例和实例之间是相互的独立的 ->实例识别
+ 基于构造函数的模式解决了方法和属性公有的的问题， 把公用的方法和属性设置给构造函数 -> 想让谁拥有共有方法，就把把方法或者属性设置在对象的prototype上边
+ 每个函数数据类型(普通函数,类)都有一个天生自带的属性：proototype(原型)，并且这个属性是一个对象数据类型的值
+ 并且在prototype上浏览器天生会给它属性consructor(构造函数)，属性值是当前函数本身
+ 每一个对象数据类型{普通的对象，实例也天生自带一个属性__proto__}，指向它的构造函数(原型)

```
function Fn () {
  this.name = 100
}

Fn.prototype.getName = function () {
  console.log(this.name)
}

var f1 = new Fn
var f2 = new Fn

console.log
console.log(f1 instancof Object) //-> true 每一个对象都是Object大的实例，通过__proto__属性，不管查找多少级，最终都能找到Object；

```

+ Object.prototype上没有__proto__这个属性
+ Object是所有对象的数据类型的的基类（最顶层大的类）
+ 原型链模式 
  f1.hasOwnProperty('x') // 检测x是不是f1的私有属性，如果有返回true，如果没有，返回false
  - 我们通过变量名.属性名的方式获取属性值的时候会首先在私有属性里查找，如果私有属性有这个值，则获取这个值
  - 如果私有属性没有这个属性，浏览器会根据原型链进行向上查找，找到以后，获取属性值
  - 如果原型上边也没有,浏览器会继续沿着__proto__向上查找，一直找到Object.Prototype为止，如果还是没有找到就返回undefind
  - 我们管上边的这种链接查找方式，叫做“原型链模式”

+ 原型链中的this
  - 类中的this.xxx =xx //this是当前的实例
  - 在某一函数中，this看当前函数调用的时候 `.` 前边是谁，this就是谁，总共有以下几个步骤：首先确定this的指向是谁；把this替换成对应的代码；按照原型链方式一步步的查找
```
//创建一个类
function Fn () {
  this.x = 100
  this.y = 200
  this.getX = function () {
    console.log(this.x)
  }
}

//给当前类设置原型
 Fn.prototype = {
  constructor: Fn,
  y: 300,
  getX: function () {
    console.log(this.x)
  },
  getY: function () {
    console.log(this.y)
  }
 }

 var f = new Fn;
 f.getX() //100
 f.__proto__.getX();  //this ->f.__proto__ -> Fn.Prototpe.x = undefined
 f.getY() // 200
 f.__proto__.getY() // 300
```
+ 原型链中批量设置公有属性
  - 起一个别名
  - 重构原型对象方式


```
//我们给原型写方法的基本形式
function Fn () {
  this.a = 100
}

Fn.prorotype.getA = function () {
  console.log(this.a)
}
Fn.prorotype.setA = function () {
  this.a = 200
}

// 别名的方式
var pro = Fn.prorotype
pro.getA = function () {
  console.log(this.a)
}
pro.setA = function () {
  this.a = 200
}

//重构原型对象 -> 我们重新开辟一个新的内存，保存我们公有的属性和方法，然后用我们自己开辟的堆内存替换浏览器默认的
//由于只有浏览器默认设置的原型才有construct属性，为了保持一致，我们要给开辟的空间手动设置consructor属性，属性值是当前类
function Fn () {
  this.a = 100
}

Fn.prorotype = {
  constructor: Fn,
  getA: function () {
    console.log(this.a)
  },
  setA: function () {
    this.a = 200
  }
}
```

### js中常用的几种继承方式

+ 原型继承是我们js中最常用的一种继承方式 
  - 子类B想要继承父类A中的左右的属性和方法(私有+共有)，只需要B.prototype = new A;即可
  - 原型继承的特变，他是把父类中私有的+公有的都继承到了子类原型上(子类公有的)
  - 核心：原型链继承并不是把父类中的属性和方法克隆一份一模一样的给B，而是让B和A之间增加了原型链的链接，以后B的实例n想要用A中的某个方法，需要一级级的通过原型链向上查找来使用

javascript
```
//可枚举和不可枚举
var obj = {name:'leo', age:12}
for (var key in obj) {
  if (obj.propertyIsEnumerable(key)) {//检测是否可枚举
    console.log(key)
  }
  if (obj.hasOwnProperty(key)) {//只遍历obj的私有属性
    console.log(key)
  }
}

//Object.create(obj) 创建一个新对象，但是还要把obj作为这个对象的原型 在IE6~8不支持
var obj1 = Object.create(obj)

//原型继承
function Fn () {
  this.x = 100
}

function Fn2 () {
  this.y = 200
}

Fn2.prototype = new Fn;

//call继承 把父类私有的属性和方式克隆一份一模一样的作为子类的私有属性
function A () {
  this.x = 100
}
A.prototype.getX = function () {
  console.log(this.x)
}

function B () {
  //this -> n
  A.call(this) // A.call(n)
}
var n = new B
console.log(n.x)

//冒充对象继承法
function A () {
  this.x = 100
}
A.prototype.getX = function () {
  console.log(this.x)
}

function B () {
  //this -> n
  var temp = new A;
  for (var key in temp) {
      this[key] = temp[key]
  }
}
var n = new B
console.log(n.x)

//混合模式继承： 原型继承+call继承
function A () {
  this.x = 100
}
A.prototype.getX = function () {
  console.log(this.x)
}

function B () {
  //this -> n
  A.call(this) // A.call(n)
}
B.prorotype = new A;
B.prototype.constructor = B;
var n = new B
console.log(n.x)

//寄生组合式继承
function A () {
  this.x = 100
}
A.prototype.getX = function () {
  console.log(this.x)
}

function B () {
  //this -> n
  A.call(this) // A.call(n)
}
B.prorotype = Object.create(A.prototype)
B.prototype.constructor = B;
var n = new B

console.log(n.x)

//中间类继承法 实现一个去除最大值和最小值，然后求平均值
function avgEnv () {
    arguments.__proto__ = Array.Prororytpe
  	arguments.sort((a, b) => {return a - b})
  	arguments.pop()
  	arguments.shift()
  	return eval(arguments.join('+')/ arguments.length)
}

```

### 函数的三种角色
+ Function -> 所有的函数都是它的一个实例
+ prototype:类的原型，在原型上定义的方法都是当前Fn这个类实例的公有方法
+ __proto__ : 把函数当成一个普通的对象
+ 函数存在了多面性
    - 普通函数：他本身就是一个普通函数，执行的时候形成私有的作用域{闭包}，形参赋值，预解释，代码执行，执行完成后栈内存销毁/不销毁
    - 类：他有自己的实例，也有一个叫做prototyp的属性，是自己的原型，他的实例都可以指向自己的原型
    - 普通对象：和var obj = {}中的 obj一样，就是一个普通对象，他作为对象可以有一些自己的私有属性，可以通过__proto__找到Function.prototype;
    - 这三者之间没有必要的练习












