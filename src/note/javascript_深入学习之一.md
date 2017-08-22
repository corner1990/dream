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

```javascript
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

