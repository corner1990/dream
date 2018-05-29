# javaScript 技巧
	我们都知道javaScript是一门极其灵活的语言，具有多种使用风格，通常情况下，我们编写javaScript要么
	使用面向过程的方式，要么使用面向对象的方式。利用ECMAScript的语言特点，BOM扩展和DOM扩展功能来获得
	更强大的效果。
	
### 高级函数
	函数是javaScript中最有趣的部分之一。他们的本质是十分简单和过程化，但也可以非常复杂和动态。某些特殊情况可以利用闭包实现。
	
- 安全的类型检测
	+ javaScript内置的类型检测机制并非完全可靠。typeof 操作服会因为一些无法预知的行为导致检测数据类型的结果不准确，instanceof操作符在存在多个作用域（页面内嵌多个frame）的时候也会有很多问题
	+ 由于原生数组的构建函数明和全局作用域无关，因此使用`toStrong()`就能保证返回一样的值。
	
```
function isArr(val){
	return Object.prototype.toString.call(val) == "[object Array]"
}

<!--基于以上思路可以检测原生函数或者正则表达式-->

function isFn(obj){
	return Object.prototype.toString.call(obj) == '[object Function]';
}

function isReg(obj){
	return Object.prototype.toString.call(obj) == '[object RegExp]'
}
```

- 作用域安全的构造函数
```
//基本的构造函数
function Person(opt){
	this.name = opt.name;
	this.age = opt.age;
}
//正确的调用方式
var pereson1 = new Person({name:'leo',age:16})

//错误的方式
var pereson2 = Person({name:'join',age:18})

//此时会在window对象上边挂载name和age属性,解决方式如下
function Person(opt){
	if(this instanceof Person){
		this.name = opt.name;
		this.age = opt.age;
	}else{
		return new Person(opt)
	}
}

//实现以上模式就可以锁定调用构建函数的环境。如果使用构建函数窃取模式的继承不使用原型链，继承很可能会被破坏。
```

- 惰性载入函数

> 因为浏览器之间行为的差异，多数JavaScript代码包含了大量的if语句，将执行引导到正确的代码中。


```
function createXHR () {
	if(typeof XMLHttpRequest != 'undefined'){
		return function () {
			return new XMLHttpRequest()
		}
	}else if (typeof ActiveXObject != 'undefined') {
		//第一次执行的时候不是string，那么就会执行if里面的代码 
		return function () {
			if(typeof arguments.callee.activeXString != 'string'){
				var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
					i,
					len;
					for (i=0, len = versions.length; i<len; i++) {
						try{
							new ActiveXObject(versions[i])
							arguments.callee.activeXString = versions[i]
							break;
						} catch (ex) {}
					}
			}
			//第二次来的时候直接构造函数!因为arguments.callee表示函数createXHR,通过给这个函数附加  
                //属性的方法来进行判断这个函数是否已经执行过了!  
			return new ActiveXObject(arguments.callee.activeXString)
		}
	}else {
		return function () {
			throw new Error('不支持 XHR')
		}
	}
}

//这个栗子中使用的技巧是创建一个匿名，自执行函数，用以确定执行那一个函数实现。
//惰性载入函数的有点是只在执行分支的代码是会损失一点性能。

alert(createXHR());//打印XHR对象  
alert(createXHR.activeXString);//如果在不执行原生的XHR的浏览器中，这里就会打印出通过IE创建的HXR的版本号，这个属性是在函数上面!  
```

- 函数绑定

> 函数绑定要创建一个函数，可以在特定的this环境中指定一个参数调用另一个函数，该技巧常常和回调函数于事件处理程序一起使用，以便将函数作为变量传递的同时保留代码执行环境

```
//栗子
var on = function (el, type ,fn) {
	 	el.addEventListener(type, fn, false)
	 }
	 var hander = {
	 	mes: 'event handled',
	 	handleclick: function () {
	 		console.log(this.mes,this)
	 	}
	 }

	var btn = document.querySelector('button')
	
	on(btn, 'click', function (event) {
		hander.handleclick(event)
	})
	
//将函数绑定到指定环境的函数 bind
function bind (fn, context) {
	return function () {
		console.log(context,arguments)
		return fn.apply(context,arguments)
	}
}

//es5给我们封装好了一个bind方法 我们不需要封装 就可以直接调用
on(btn, 'click' ,hander.handleclick.bind(hander))
```

- 函数ke里化

> 于函数紧密相关的就是函数克里化（function currying），用于创建已经删治好了一个或多个参数的函数，函数克里化的基本方法和函数绑定是一样的，使用一个闭包返回一个函数，两者的却别在于当函数被调用时，返回的函数还需要设置一些传入的参数，具体看栗子：

```
//1.基本示例
function add (num1, num2) {
		return num1 + num2
	}

function curriedAdd (num) {
	return add(5, num)
}
curriedAdd(3)

//2.动态创建，调用一个函数，并为他传入需要ke里化的函数和必要参数
//函数的主要工作就是将白返回的甘薯参数进行排序

function  curry (fn) {
	let args = Array.prototype.slice.call(arguments, 1)
	return function () {
		let innerArgs = Array.prototype.slice.call(arguments)
		let finalArgs = args.concat(innerArgs)
		console.log(args, 'args')
		console.log(innerArgs, 'innerArgs')
		console.log(finalArgs, 'finalArgs')
		return fn.apply(null, finalArgs)
	}
}

var currAdd = curry(add, 5)

console.log(currAdd(3)) 

//函数ke里化还常常作为函数绑定的一部分包含在其中构造出更为复杂的bind()函数
//当我们想除了Event对象在额外给事件处理程序传递参数是会非常有用
function bind (fn, context) {
		var args = Array.prototype.slice.call(arguments, 2)
		return function () {
			var innerArgs = Array.prototype.slice.call(arguments)
			var finalArgs = args.concat(innerArgs)

			return fn.apply(context, finalArgs)
		}
	}

//栗子
var handler = {
		mes: 'event handler',
		handleclick: function (name, event) {
			console.log(this.mes + ':' + name + ':' + event.type, this)
		}
	}
// 函数绑定 
 var on = function (el, type ,fn) {
 	el.addEventListener(type, fn, false)
 }

var btn = document.querySelector('button')

on(btn, 'click', bind(handler.handleclick, handler, 'myBtn'))

//ES5的bind() 方法也实现了函数ke里化，主要在this的值后边传入另一个参数即可
on(btn, 'click', handler.handleclick.bind(handler, 'myBtn'))

```

### 防篡改对象
> ES5可以让开发认定定义放篡改对象

- 不可扩展对象：不可以给已有的对象新增属性和方法，但是不英系那个操作已有的成员
- 密封的对象（sealed Object）：密封对象不可扩展，不可以删除属性和方法，但是可以修改
- 冻结的对象（frozen Object）：冻结的对象既不可以扩展，有事密封的，而且对象的属性[Writable]特性会被设置为false，如果定义了[set]函数，访问起属性仍然是可写的。

```
// 不可扩展对象
var person = {name: 'leo', age: 18}
Object.preventExtensions(person)

// 可以使用Object.isExtensible() 检测对象是否可以扩展
var person1 = {name: 'leo', age: 19}
console.log(Object.isExtensible(person1))
//密封的对像
Object.seal(person1)

// 使用Object.isSealed() 方法可以确定对象是否被密封了，因为密封的对象不可扩展，所用Object.isExtendsible() 检测密封的对象也会返回false
console.log(Object.isExtensible(person))
console.log(Object.isSealed(person))


//冻结的对象
var person2 = {name: 'leo', age: 20}
Object.freeze(person2)
//Object.isFrozen() 方法用于检测冻结对象
// 因为冻结的对象既是密封的，有又是冻结的 所以使用Object.isSealed() 检测返回true
console.log(Object.isFrozen(person2))
console.log(Object.isSealed(person2))

```
...待续



