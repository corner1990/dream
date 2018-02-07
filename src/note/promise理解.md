# 理解Promise 实现原理

### 实现基本调用

```javascript
/**
 * @desc 自定义promiseL类，模拟实现promise对象
 * @param {function} excutor 用户在初始化Promise对象时传入的函数
 */
function PromiseL (excutor) {
	let self = this
	self.status = 'padding' //默认等待状态
	self.value = undefined //状态成功时的value
	self.reason = undefined //状态为失败时的error 信息
	//因为是异步调用 所以需要把callback缓存起来
	self.resolvedCallBackArr = [] //成功的回调函数
	self.rejectedCallBackArr = [] //失败的回调函数

	/**
	 * @desc 用户触发成功的时候的回到
	 * @param  {all} value 用户传入的参数 未知类型
	 * 
	 */
	function resolve (value) {
		//如果函数执行成功，则修改状态为成功，
		if (self.status == 'padding') {
			self.value = value
			self.status = 'resolved'

			//遍历调用回调函数
			self.resolvedCallBackArr.forEach(callback => callback(self.value))
		}
	}

	/**
	 * @desc 用户触发rejcet时调用的函数
	 * @param  {[type]} reason 错误信息 未知
	 * @return {[type]}        [description]
	 */
	function reject (reason) {
		//如果状态失败 更改状态和赋值
		if (self.status == 'padding') {
			self.reason = reason
			self.status = 'rejected'
			self.rejectedCallBackArr.forEach(callback => callback(self.reason))
		}
	}

	//只要有错误 就走tra catch
	//用户第一次传入的函数同步执行
	try {
		excutor(resolve, reject)
	} catch (e) {
		reject(e)
	}
	// console.log(excutor)
}

/**
 * @desc 在实例上扩展then方法
 * @param  {function} onFulfiled 用户传入的成功会调函数
 * @param  {function} onRejected 用户传入的失败回调函数
 * 方法思路：
 * 1.调用的时候如果是成功状态，则调用onFulfiled成功状态函数，并将参数传入
 * 2.调用的时候如果是失败状态，则调用onRejected成功状态函数，并将参数传入
 * 3.调用的时候如果是等待状态，则将传入的函数缓存进入程序池，后期用户主动触发的时候调用
 * @return {[type]}            [description]
 */
PromiseL.prototype.then = function (onFulfiled, onRejected) {
	let self = this
	//根据状态调用函数
	if (self.status == 'resolved') {
		onFulfiled(this.value)
	}

	if (self.status == 'rejected') {
		onRejected(self.reason)
	}

	//如果是异步 先将回调函数缓存
	if (self.status == 'padding') {
		self.resolvedCallBackArr.push(onFulfiled)
		self.rejectedCallBackArr.push(onRejected)
	}
}
```

### 实现错误处理，返回一个 `PromiseL` 对象实例

> 捕捉错误处理不是和理解，写出来也感觉不对，暂时先搁置，后期考证   

```javascript
/**
 * @desc 自定义promiseL类，模拟实现promise对象
 * @param {function} excutor 用户在初始化Promise对象时传入的函数
 */
function PromiseL (excutor) {
	let self = this
	self.status = 'padding' //默认等待状态
	self.value = undefined
	self.reason = undefined
	//因为是异步调用 所以需要把callback缓存起来
	self.resolvedCallBackArr = [] //成功的回调函数
	self.rejectedCallBackArr = [] //失败的回调函数

	/**
	 * @desc 用户触发成功的时候的回到
	 * @param  {all} value 用户传入的参数 未知类型
	 * 
	 */
	function resolve (value) {
		//如果函数执行成功，则修改状态为成功，
		if (self.status == 'padding') {
			self.value = value
			self.status = 'resolved'

			//遍历调用回调函数
			self.resolvedCallBackArr.forEach(callback => callback(self.value))
		}
	}

	/**
	 * @desc 用户触发rejcet时调用的函数
	 * @param  {[type]} reason 错误信息 未知
	 * @return {[type]}        [description]
	 */
	function reject (reason) {
		//如果状态失败 更改状态和赋值
		if (self.status == 'padding') {
			self.reason = reason
			self.status = 'rejected'
			self.rejectedCallBackArr.forEach(callback => callback(self.reason))
		}
	}

	//只要有错误 就走tra catch
	try {
		excutor(resolve, reject)
	} catch (e) {
		reject(e)
	}
	// console.log(excutor)
}

/**
 * @desc 在实例上扩展then方法
 * @param  {function} onFulfiled 用户传入的成功会调函数
 * @param  {function} onRejected 用户传入的失败回调函数
 * 方法思路：
 * 1.调用的时候如果是成功状态，则调用onFulfiled成功状态函数，并将参数传入
 * 2.调用的时候如果是失败状态，则调用onRejected成功状态函数，并将参数传入
 * 3.调用的时候如果是等待状态，则将传入的函数缓存进入程序池，后期用户主动触发的时候调用
 * 4.实现功能，返回一个PromiseL的实例
 * @return {undefined}          
 */

PromiseL.prototype.then = function (onFulfiled, onRejected) {
	let self = this
	//用来保存返回的PromiseL实例
	let promise2 
	//根据状态调用函数
	if (self.status == 'resolved') {
		// onFulfiled(this.value)
		return promise2 = new PromiseL((resolve, reject) => {
			let x = onFulfiled(this.value)
			//判断 返回的是promise对象或者是值分别处理
			if (x instanceof PromiseL) {
				x.then(resolve, reject)
			} else {
				resolve(x)
			}
		})
	}

	if (self.status == 'rejected') {
		return promise2 = new PromiseL((resolve, reject) => {
			let x = onRejected(self.reason)
			//判断 返回的是promise对象或者是值分别处理
			if (x instanceof PromiseL) {
				x.then(resolve, reject)
			} else {
				resolve(x)
			}
		})
	}

	//如果是异步 先将回调函数缓存
	if (self.status == 'padding') {
		//如果状态时padding 分别在程序池保存reolve和reject的函数 等用户触发的时候调用
		return promise2 = new PromiseL((resolve, reject) => {
			self.resolvedCallBackArr.push(() => {
				let x = onFulfiled(self.value)
				//判断 返回的是promise对象或者是值分别处理
				if (x instanceof PromiseL) {
					x.then(resolve, reject)
				} else {
					resolve(x)
				}
			})
			self.rejectedCallBackArr.push(() => {
				let x = onRejected(self.reason)
				//判断 返回的是promise对象或者是值分别处理
				if (x instanceof PromiseL) {
					x.then(resolve, reject)
				} else {
					resolve(x)
				}
			})
		})
	}
}

/**
 * @desc 当函数有报错 最后捕捉错误
 * @param  {Function} fn 方法调用时的回调函数
 * @return {object}      return 一个promiseL的实例
 */
PromiseL.prototype.catch = function (fn) {
	// console.log(fn)
	return this.then(null,fn)
}

```

### 实现 `Promise.all`  方法

```javascript
/**
 * @desc 自定义promiseL类，模拟实现promise对象
 * @param {function} excutor 用户在初始化Promise对象时传入的函数
 */
function PromiseL (excutor) {
	let self = this
	self.status = 'padding' //默认等待状态
	self.value = undefined
	self.reason = undefined
	//因为是异步调用 所以需要把callback缓存起来
	self.resolvedCallBackArr = [] //成功的回调函数
	self.rejectedCallBackArr = [] //失败的回调函数

	/**
	 * @desc 用户触发成功的时候的回到
	 * @param  {all} value 用户传入的参数 未知类型
	 * 
	 */
	function resolve (value) {
		//如果函数执行成功，则修改状态为成功，
		if (self.status == 'padding') {
			self.value = value
			self.status = 'resolved'

			//遍历调用回调函数
			self.resolvedCallBackArr.forEach(callback => callback(self.value))
		}
	}

	/**
	 * @desc 用户触发rejcet时调用的函数
	 * @param  {[type]} reason 错误信息 未知
	 * @return {[type]}        [description]
	 */
	function reject (reason) {
		//如果状态失败 更改状态和赋值
		if (self.status == 'padding') {
			self.reason = reason
			self.status = 'rejected'
			self.rejectedCallBackArr.forEach(callback => callback(self.reason))
		}
	}

	//只要有错误 就走tra catch
	try {
		excutor(resolve, reject)
	} catch (e) {
		reject(e)
	}
	// console.log(excutor)
}

/**
 * @desc 在实例上扩展then方法
 * @param  {function} onFulfiled 用户传入的成功会调函数
 * @param  {function} onRejected 用户传入的失败回调函数
 * 方法思路：
 * 1.调用的时候如果是成功状态，则调用onFulfiled成功状态函数，并将参数传入
 * 2.调用的时候如果是失败状态，则调用onRejected成功状态函数，并将参数传入
 * 3.调用的时候如果是等待状态，则将传入的函数缓存进入程序池，后期用户主动触发的时候调用
 * 4.实现功能，返回一个PromiseL的实例
 * @return {undefined}          
 */

PromiseL.prototype.then = function (onFulfiled, onRejected) {
	//进行参数为空的处理
	onFulfiled = typeof onFulfiled == 'function' ? onFulfiled :  data => data
	onRejected = typeof onRejected == 'function' ? onRejected : err => err
	let self = this
	let promise2
	//根据状态调用函数 resolved 成功态
	if (self.status == 'resolved') {
		// onFulfiled(this.value)
		return promise2 = new PromiseL((resolve, reject) => {
			// 错误处理 如果有错误 直接进入then的reject状态
			try {
				let x = onFulfiled(this.value)
				//判断 返回的是promise对象或者是值分别处理
				if (x instanceof PromiseL) {
					x.then(resolve, reject)
				} else {
					resolve(x)
				}
			} catch (e) {
				reject(e)
			}
		})
	}

	//根据状态调用函数 rejected 失败态
	if (self.status == 'rejected') {
		return promise2 = new PromiseL((resolve, reject) => {
			// 错误处理 如果有错误 直接进入then的reject状态
			try {
				let x = onRejected(self.reason)
				//判断 返回的是promise对象或者是值分别处理
				if (x instanceof PromiseL) {
					x.then(resolve, reject)
				} else {
					resolve(x)
				}
			} catch (e) {
				reject(e)
			}
		})
	}

	//如果是异步 先将回调函数缓存
	if (self.status == 'padding') {
		//如果状态时padding 分别在程序池保存reolve和reject的函数 等用户触发的时候调用
		return promise2 = new PromiseL((resolve, reject) => {
			self.resolvedCallBackArr.push(() => {
				let x = onFulfiled(self.value)
				//判断 返回的是promise对象或者是值分别处理
				if (x instanceof PromiseL) {
					x.then(resolve, reject)
				} else {
					resolve(x)
				}
			})
			self.rejectedCallBackArr.push(() => {
				let x = onRejected(self.reason)
				//判断 返回的是promise对象或者是值分别处理
				if (x instanceof PromiseL) {
					x.then(resolve, reject)
				} else {
					resolve(x)
				}
			})
		})
	}
}

/**
 * @desc 当函数有报错 最后捕捉错误
 * @param  {Function} fn 方法调用时的回调函数
 * @return {object}      return 一个promiseL的实例
 */
PromiseL.prototype.catch = function (fn) {
	// console.log(fn)
	return this.then(null,fn)
}

/**
 * @desc 传入多个promise对象
 * @param  {array} promiseLs 数组内部为多个Promise实例对象
 * @return {Promise}           返回一个PromiseL对象实例，通过then拿到最后的结果
 */
PromiseL.all = function (promiseLs) {
	return new PromiseL(function (resolve, reject) {
		let result = [] //最终的结果
		let i = 0 //当前完成的数量
		
		/**
		 * @desc 当子promise执行成功的回调函数
		 * @param  {number} index 当前执行的是那一个promise对象
		 * @return {[type]}       [description]
		 */
		let resolved = function (index) {
			return function (data) {
				result[index] = data
				i++

				if (i == promiseLs.length) {
					// 所有的promises都执行完毕
					resolve(result)
				}
			}
		}

		//遍历所有的对象，调用他们的then方法进行处理
		for (let j = 0, len = promiseLs.length; j < len; j++) {
			promiseLs[j].then(resolved(j), err => {
				reject(err)
			})

		} 
	})
}
```

