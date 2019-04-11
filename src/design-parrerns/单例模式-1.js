// 单例模式
// 单独的实例

// class Window {
// 	constructor (name) {
// 		this.name = name;
// 	}
// 	static getInstance () {
// 		if (!this.instance) {
// 			this.instance = new Window()
// 		}
// 		return this.instance
// 	}
// }

// let w1 = Window.getInstance()
// let w2 = Window.getInstance()
// console.log(w1 === w2)

// es5
/*function Window (name) {
	this.name = name
}
// 类上的方法，只能通过类来访问
Window.getInstance = (function () {
	let instance
	return function () {
		if (!instance) {
			instance = new Window
		}
		return instance
	}
})()*/

/*
*
* 1.客户端， 就是使用这类的使用者必须知道是一个单例的类，必须主动条用getInstance方法
* 2.并不能真正的阻止客户端直接new Window
*
 */


// 透明单例

// let window = (function() {
// 	let window;
// 	let Window = function (name) {
// 		if (window) {
// 			return window
// 		} else {
// 			this.name = name
// 			return (window = this)
// 		}
// 	}

// 	return Window
// })();

// /*
// * 1. 创建this = 空对象
// * 2. new 关键字， 如果返回的是一个对象，那new 出来的对象就是我们返回的对象
// * 3. 虽然这么写能够实现单例，但是违反了函数单一原则的设计理念，需要进一步优化
//  */
// let w1 = Window.getInstance()
// let w2 = Window.getInstance()

// 优化书写方法
// 把类的实例的创建逻辑和单例逻辑分开
// function Window (name) {
// 	this.name = name
// }

// Window.prototype.getName = function () {
// 	console.log(this.name)
// }
// let CreateSingle = (function () {
// 	let instance;
// 	return function (name) {
// 		if (!instance) {
// 			instance = new Window(name)
// 		}
// 		return instance
// 	}
// })()

// let w1 = new CreateSingle('hello')
// let w2 = new CreateSingle('hello')

// console.log(w1 === w2)

/*// 进一步优化
function Window (name) {
	this.name = name
}
function Dialog (name) {
	this.name = name
}
Window.prototype.getName = function () {
	console.log(this.name)
}
let CreateSingle = function (Constructor) {
	let instance;
	return function () {
		if (!instance) {
			Constructor.apply(this, arguments)
			//  下边 两行代码意思相同
			// this.__proto = ConStructor.prototype
			Object.setPrototypeOf(this, Constructor.prototype)
			instance = this;
		}
		return instance
	}
}

let CreateWindow = CreateSingle(Window)
let w1 = new CreateWindow('hello')
let w2 = new CreateWindow('leo')
console.log(w1 === w2)

let CreateDialog = CreateSingle(Dialog)
let d1 = new CreateDialog('hello')
let d2 = new CreateDialog('leo')
console.log(d1 ===  d2)*/


// 进一步优化 CreateSingle方法
function Window (name) {
	this.name = name
}
function Dialog (name) {
	this.name = name
}
Window.prototype.getName = function () {
	console.log(this.name)
}
/*let CreateSingle = function (Constructor) {
	let instance;
	let SingleConstructor =  function () {
		if (!instance) {
			Constructor.apply(this, arguments)
			instance = this;
		}
		return instance
	}
	// 原形继承
	SingleConstructor.prototype = Object.create(Constructor.prototype)
	return SingleConstructor
}*/

let CreateSingle = function (Constructor) {
	let instance;
	let SingleConstructor =  function () {
		if (!instance) {
			instance = new Constructor(...arguments)
		}
		return instance
	}
	// 原形继承
	return SingleConstructor
}
let CreateWindow = CreateSingle(Window)
let w1 = new CreateWindow('hello')
let w2 = new CreateWindow('leo')
console.log(w1 === w2)

let CreateDialog = CreateSingle(Dialog)
let d1 = new CreateDialog('hello')
let d2 = new CreateDialog('leo')
console.log(d1 ===  d2)
