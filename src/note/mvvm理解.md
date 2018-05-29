# 理解mvvm原理
    通过以下demo，深入理解mvvm的原理，实现数据劫持，数据双向绑定，数据驱动页面，数据双向绑定，计算属性computed！
    注意：为了方便理解，我会在每个函数内部把执行顺序和执行思路用文字注释，望知晓...
###  基本文档结构

- HTML

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>vm的demo</title>
  </head>
  <body>
  	<div id="app">
  		<div>a的值是：{{a.a}}</div>
  		<p>b的值是：{{b}}</p>
  		<input type="text" v-model="b">
  		<p>computed: {{hello}}</p>
  	</div>
  <script src="./lvm2.js"></script>
  <script>
  	var lvm = new Lvm({
  		el: '#app',
  		data: {
  			a: {a:3},
  			b: '2',
  			c: 10
  		},
  		computed: {
  			hello (){
  				console.log('computed')
  				return this.c + this.b
  			}
  		}
  	})
  </script>
  </body>
  </html>
  ```

  ​


- 新建js文件 

  ```javascript
  //新建一个vm对象
  function Lvm (opt = {}) {}
  ```

  ​

  ​

### 初始化对象实现

- 1.对象初始化

- 2.数据劫持

- 3.this代理data对象  

  ```javascript
  function Lvm (opt = {}) {
  	//1.拿到opt对象，保存到this下边
  	this.$options = opt;
  	var data = this._data = this.$options.data;
  	//2.进行数据劫持
  	createObj (data)
  	//3.this代理this._data对象
  	for (let key in data) {
  		Object.defineProperty(this, key, {
  			enumerable: true,
  			get: () => this._data[key],
  			set: (newVal) =>this._data[key] = newVal
  		})
  	}
  }
  /**
   * @desc 数据劫持方法
   * 为了方便递归调用Objserver方法封装，返回值是Objserver的一个实例
   */
  function createObj (data) {
  	if (typeof data !== 'object') return;
  	return new Objserver(data)
  }

  /**
   * @desc 创建对象函数
   * @param {object} data 创建对象时传入的data对象
   * 1.遍历data对象，拿到左右的对象名和属性值
   * 2.使用Object.defineProperty创建对象
   * 3.加入遍历出来的val是一个对象，调用自己，实现递归调用
   * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
   */
  function Objserver (data) {
  	for(let key in data) {
  		let val  = data[key];
  		createObj(val) 
  		//使用Object.defineProperty 进行数据劫持
  		Object.defineProperty(data, key, {
  			enumerable: true,
  			get: function () {
  				return val
  			},
  			set: function (newVal) {
  				//如果用户输入的新值和原先的值完全相同，则不进行操作直接返回
  				if (newVal === val) return;
  				val = newVal
  				//跟新属性值以后重新监听数据
  				createObj(val) 
  			}
  		})
  	}
  }
  ```



### 实现页面渲染

- 1.dom移动到内存
- 2.对字符模板替换
- 3.页面重绘

```javascript
function Lvm (opt = {}) {
	//1.拿到opt对象，保存到this下边
	this.$options = opt;
	var data = this._data = this.$options.data;
	//2.进行数据劫持
	createObj (data)
	//3.this代理this._data对象
	for (let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get: () => this._data[key],
			set: newVal =>this._data[key] = newVal
		})
	}
	//4.编译页面
	new Compile(this.$options.el, this);
}
/**
 * @desc 数据劫持方法
 */
function createObj (data) {
	if (typeof data !== 'object') return;
	return new Objserver(data)
}

/**
 * @desc 创建对象函数
 * @param {object} data 创建对象时传入的data对象
 * 1.遍历data对象，拿到左右的对象名和属性值
 * 2.使用Object.defineProperty创建对象
 * 3.加入遍历出来的val是一个对象，调用自己，实现递归调用
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 */
function Objserver (data) {
	
	for(let key in data) {
		let val  = data[key];
		
		createObj(val) 
		
		//使用Object.defineProperty 进行数据劫持
		Object.defineProperty(data, key, {
			enumerable: true,
			get: function () {
				return val
			},
			set: function (newVal) {
				//如果用户输入的新值和原先的值完全相同，则不进行操作直接返回
				if (newVal === val) return;
				val = newVal
				//跟新属性值以后重新监听数据
				createObj(val) 
			}
		})
	}
}

/**
 * @desc 编译模板
 * @param {string} el 包裹元素选择器
 * @param {object} vm 我们的lvm实例对象
 * 
 * 1.拿到我们初始化的el元素
 * 2.新建一个文档随便，用来缓存dom
 * 3.遍历el元素的所有子元素节点，添加到文档碎片
 * 4.进行表达式里的值替换
 * 5.添加到dom，更新页面
 */
function Compile (el, vm) {
	vm.$el = document.querySelector(el);
	var frag = document.createDocumentFragment(), node = null;
	//把app的dom移动到内存中进行操作
	while(node = vm.$el.firstChild) {
		frag.appendChild(node)
	}
	//替换变量
	replice (frag)


	/**
	 * @descrtion 替换内容
	 * @param  {dom} node html dom标签
	 * @return {null}   没有返回值
	 *
	 * 1.传入所有的dom的元素节点
	 * 2.使用Array.form转换为数组以后遍历处理
	 * 3.新建reg对象，匹配和捕获表达式里的
	 * 4.拿到每一个节点的文本节点(如果是元素，则递归调用自己)
	 * 5.通过nodeType判断是不是文本节点，并且使用正则对象验证是否包含大括号表达式
	 * 6.如果有大括号表达式，则进行替换赋值操作
	 * 7.数据监听(接下来实现)
	 * 8.数据双向绑定(稍后实现)
	 * 9.添加到dom
	 */
	function replice (node) {
		// 把node类数组转换为数组遍历
		Array.from(node.childNodes).forEach(item => {
			var reg = /\{\{(.*)\}\}/,
				text = item.textContent;//拿到文本节点
			if(item.nodeType == 3 && reg.test(text)) {
				reg.exec(text)
				var key, arr = RegExp.$1.split('.'), //如果拿到的是对象的深层属性(a.a.b)，在下边进行遍历 
					val = vm;//这里设置为vm => this 对象以后就可以直接访问得到数据

				arr.forEach(key => {
					//得到数据 遍历拿到对象属性的属性，主要操作多层数据
					val = val[key]
				})
				//替换赋值操作
				item.textContent = text.replace(/\{\{(.*)\}\}/, val)
				val = null;
			}
			//如果node不是文本节点，继续循环
			if (item.childNodes) {
				replice (item)
			}
		})
	}
	//把操作过的数据添加到dom
	vm.$el.appendChild(frag)
	frag = null
}
```



### 实现数据监听动态更新页面

- 模拟监听事件池
- 监听函数weacher

```javascript

function Lvm (opt = {}) {
	//1.拿到opt对象，保存到this下边
	this.$options = opt;
	var data = this._data = this.$options.data;
	//2.进行数据劫持
	createObj (data)
	//3.this代理this._data对象
	for (let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get: () => this._data[key],
			set: newVal =>this._data[key] = newVal
		})
	}
	//4.编译页面
	new Compile(this.$options.el, this);
}
/**
 * @desc 数据劫持方法
 */
function createObj (data) {
	if (typeof data !== 'object') return;
	return new Objserver(data)
}

/**
 * @desc 创建对象函数
 * @param {object} data 创建对象时传入的data对象
 * 1.遍历data对象，拿到左右的对象名和属性值
 * 2.使用Object.defineProperty创建对象
 * 3.加入遍历出来的val是一个对象，调用自己，实现递归调用
 * 4.新建一个事件池dep
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 */
function Objserver (data) {
	let dep = new Dep();
	for(let key in data) {
		let val  = data[key];
		
		createObj(val) 
		
		//使用Object.defineProperty 进行数据劫持
		Object.defineProperty(data, key, {
			enumerable: true,
			get: function () {
				//如果存在target属性的话添加到事件池dep
				Dep.target && dep.addSub(Dep.target)
				return val
			},
			set: function (newVal) {
				//如果用户输入的新值和原先的值完全相同，则不进行操作直接返回
				if (newVal === val) return;
				val = newVal
				//跟新属性值以后重新监听数据
				createObj(val) 
				//调用事件池通知方法 提醒更新时视图
				dep.notify()
			}
		})
	}
}

/**
 * @desc 编译模板
 * @param {string} el 包裹元素选择器
 * @param {object} vm 我们的lvm实例对象
 * 
 * 1.拿到我们初始化的el元素
 * 2.新建一个文档随便，用来缓存dom
 * 3.遍历el元素的所有子元素节点，添加到文档碎片
 * 4.进行表达式里的值替换
 * 5.添加到dom，更新页面
 */
function Compile (el, vm) {
	vm.$el = document.querySelector(el);
	var frag = document.createDocumentFragment(), node = null;
	//把app的dom移动到内存中进行操作
	while(node = vm.$el.firstChild) {
		frag.appendChild(node)
	}
	//替换变量
	replice (frag)


	/**
	 * @descrtion 替换内容
	 * @param  {dom} node html dom标签
	 * @return {null}   没有返回值
	 *
	 * 1.传入所有的dom的元素节点
	 * 2.使用Array.form转换为数组以后遍历处理
	 * 3.新建reg对象，匹配和捕获表达式里的
	 * 4.拿到每一个节点的文本节点(如果是元素，则递归调用自己)
	 * 5.通过nodeType判断是不是文本节点，并且使用正则对象验证是否包含大括号表达式
	 * 6.如果有大括号表达式，则进行替换赋值操作
	 * 7.数据监听(接下来实现)
	 * 8.数据双向绑定(稍后实现)
	 * 9.添加到dom
	 */
	function replice (node) {
		
		// 把node类数组转换为数组遍历
		Array.from(node.childNodes).forEach(item => {
			var reg = /\{\{(.*)\}\}/,
				text = item.textContent;//拿到文本节点
			if(item.nodeType == 3 && reg.test(text)) {
				reg.exec(text)
				var key, arr = RegExp.$1.split('.'), //如果拿到的是对象的深层属性(a.a.b)，在下边进行遍历 
					val = vm;//这里设置为vm => this 对象以后就可以直接访问得到数据

				arr.forEach(key => {
					//得到数据 遍历拿到对象属性的属性，主要操作多层数据
					val = val[key]
				})
				//创建监听小函数
				new Wetcher(vm, arr, function(newVal){
					item.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
				})
				//替换赋值操作
				item.textContent = text.replace(/\{\{(.*)\}\}/, val)
				val = null;
			}
			//如果node不是文本节点，继续循环
			if (item.childNodes) {
				replice (item)
			}
		})
	}
	//把操作过的数据添加到dom
	vm.$el.appendChild(frag)
	frag = null
}

/**
 * 新建一个dep 实现模拟事件池
 * subs 保存所有需要监听的对象
 * addSub 将监听事件添加到事件池
 * notify当数据发生变化的时候调用，通知更新数据
 * notify触发的时候，遍历执行subs里的所有事件
 */
function Dep () {
	this.subs = [];
}

/**
 * @desc 事件池添加方法
 * @param {Function} fn 添加事件到事件池
 */
Dep.prototype.addSub = function (fn) {
	this.subs.push(fn)
}
/**
 * @desc 数据更新时刷新页面
 * @return {[type]} [description]
 */
Dep.prototype.notify = function () {
	this.subs.forEach(fn => {
		fn.update()
	})
}

/**
 * @desc 监听小函数 每个需要监听的对象的实例对象
 * @param {object}   vm  当前this的实例
 * @param {string}   exp 监听的属性 a|a.a 
 * @param {Function} fn  数据更改以后执行的回调函数
 *
 * 1.我们在创建一个wecher监听对象的实例，传入上述的参数
 * 2.为了方便加入事件池，在初始化函数的过程中给Dep一个target属性，
 * 然后在触发属性的get方法，在哪里判断是否存在target属性，存在就加入，不存在则不操作
 * 3.在操作完成以后Dep.target属性制空
 */
function Wetcher (vm, exp, fn){
	this.fn = fn;
	this.vm = vm;
	this.exp = exp;
	Dep.target = this;
	let val = this.vm;
	let arr = this.exp;
  
	//获取值 会调用get方法
	arr.forEach(k => {
		val = val[k]
	})
  
	Dep.target = null;
}
/**
 * @description 监听小函数在数据变更以后调用
 * @return {[type]} [description]
 * 1.在这里我们拿到更新后的数据
 * 2.调用调用回调函数fn，并将新值传入
 */
Wetcher.prototype.update = function () {
	let val = this.vm
	let arr = this.exp
	//获取值 会调用get方法
	arr.forEach(k => {
		val = val[k]
	})
	//执行创建实例时的回调函数，并且传入新值替换
	this.fn(val)
}
```



### 实现数据双向绑定

- input赋值
- input绑定事件
- input的value更新的时候更新数据

```javascript

function Lvm (opt = {}) {
	//1.拿到opt对象，保存到this下边
	this.$options = opt;
	var data = this._data = this.$options.data;
	//2.进行数据劫持
	createObj (data)
	//3.this代理this._data对象
	for (let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get: () => this._data[key],
			set: newVal =>this._data[key] = newVal
		})
	}
	//4.编译页面
	new Compile(this.$options.el, this);
}
/**
 * @desc 数据劫持方法
 */
function createObj (data) {
	if (typeof data !== 'object') return;
	return new Objserver(data)
}

/**
 * @desc 创建对象函数
 * @param {object} data 创建对象时传入的data对象
 * 1.遍历data对象，拿到左右的对象名和属性值
 * 2.使用Object.defineProperty创建对象
 * 3.加入遍历出来的val是一个对象，调用自己，实现递归调用
 * 4.新建一个事件池dep
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 */
function Objserver (data) {
	let dep = new Dep();
	for(let key in data) {
		let val  = data[key];
		
		createObj(val) 
		
		//使用Object.defineProperty 进行数据劫持
		Object.defineProperty(data, key, {
			enumerable: true,
			get: function () {
				//如果存在target属性的话添加到事件池dep
				Dep.target && dep.addSub(Dep.target)
				return val
			},
			set: function (newVal) {
				//如果用户输入的新值和原先的值完全相同，则不进行操作直接返回
				if (newVal === val) return;
				val = newVal
				//跟新属性值以后重新监听数据
				createObj(val) 
				//调用事件池通知方法 提醒更新时视图
				dep.notify()
			}
		})
	}
}

/**
 * @desc 编译模板
 * @param {string} el 包裹元素选择器
 * @param {object} vm 我们的lvm实例对象
 * 
 * 1.拿到我们初始化的el元素
 * 2.新建一个文档随便，用来缓存dom
 * 3.遍历el元素的所有子元素节点，添加到文档碎片
 * 4.进行表达式里的值替换
 * 5.添加到dom，更新页面
 */
function Compile (el, vm) {
	vm.$el = document.querySelector(el);
	var frag = document.createDocumentFragment(), node = null;
	//把app的dom移动到内存中进行操作
	while(node = vm.$el.firstChild) {
		frag.appendChild(node)
	}
	//替换变量
	replice (frag)


	/**
	 * @descrtion 替换内容
	 * @param  {dom} node html dom标签
	 * @return {null}   没有返回值
	 *
	 * 1.传入所有的dom的元素节点
	 * 2.使用Array.form转换为数组以后遍历处理
	 * 3.新建reg对象，匹配和捕获表达式里的
	 * 4.拿到每一个节点的文本节点(如果是元素，则递归调用自己)
	 * 5.通过nodeType判断是不是文本节点，并且使用正则对象验证是否包含大括号表达式
	 * 6.如果有大括号表达式，则进行替换赋值操作
	 * 7.数据监听(接下来实现)
	 * 8.数据双向绑定(稍后实现)
	 * 9.添加到dom
	 */
	function replice (node) {
		
		// 把node类数组转换为数组遍历
		Array.from(node.childNodes).forEach(item => {
			var reg = /\{\{(.*)\}\}/,
				text = item.textContent;//拿到文本节点
			if(item.nodeType == 3 && reg.test(text)) {
				reg.exec(text)
				var key, arr = RegExp.$1.split('.'), //如果拿到的是对象的深层属性(a.a.b)，在下边进行遍历 
					val = vm;//这里设置为vm => this 对象以后就可以直接访问得到数据

				arr.forEach(key => {
					//得到数据 遍历拿到对象属性的属性，主要操作多层数据
					val = val[key]
				})
				//创建监听小函数
				new Wetcher(vm, arr, function(newVal){
					item.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
				})
				//替换赋值操作
				item.textContent = text.replace(/\{\{(.*)\}\}/, val)
				val = null;
			}
			//实现数据双向绑定 
			//思路：
			//首先判断如果是元素，是否存在v-model属性，（拿到所有的attribute，然后遍历判断）
			//如果不存在就不操作，如果存在（v-model）属性则进行如下操作
			//拿到属性，遍历对象拿到val，赋值给元素
			//给input元素绑定事件，在数据变化的时候那导致，然后重新赋值
			//因为这里赋值如果说嵌套层级较多的时候需要进行特殊处理，我偷懒，没有做，只做了一级的，
			if (item.nodeType == 1) {
				let attrs = item.attributes;
				let reg = /v\-model/;
				//循环遍历属性 看有没有v-model
				Array.from(attrs).forEach(attr => {
					let name = attr.name;
					let exp = attr.value.split('.');
					if (reg.test(name)) {
						let val = vm;
						
						exp.forEach(k => {
								val = val[k]
							})
						item.value = val;
						
						//监听数据变化 更新input的值
						new Wetcher(vm, exp, function(newVal){
							item.value = newVal
						})

						item.addEventListener('input', function (e) {
							let val = e.target.value;
							//还没有想到多层级的数据怎么设置，后期学了再补
							vm[exp] = val
						})
					}
				})
			}
			//如果node不是文本节点，继续循环
			if (item.childNodes) {
				replice (item)
			}
		})
	}
	//把操作过的数据添加到dom
	vm.$el.appendChild(frag)
	frag = null
}

/**
 * 新建一个dep 实现模拟事件池
 * subs 保存所有需要监听的对象
 * addSub 将监听事件添加到事件池
 * notify当数据发生变化的时候调用，通知更新数据
 * notify触发的时候，遍历执行subs里的所有事件
 */
function Dep () {
	this.subs = [];
}

/**
 * @desc 事件池添加方法
 * @param {Function} fn 添加事件到事件池
 */
Dep.prototype.addSub = function (fn) {
	this.subs.push(fn)
}
/**
 * @desc 数据更新时刷新页面
 * @return {[type]} [description]
 */
Dep.prototype.notify = function () {
	this.subs.forEach(fn => {
		fn.update()
	})
}

/**
 * @desc 监听小函数 每个需要监听的对象的实例对象
 * @param {object}   vm  当前this的实例
 * @param {string}   exp 监听的属性 a|a.a 
 * @param {Function} fn  数据更改以后执行的回调函数
 *
 * 1.我们在创建一个wecher监听对象的实例，传入上述的参数
 * 2.为了方便加入事件池，在初始化函数的过程中给Dep一个target属性，
 * 然后在触发属性的get方法，在哪里判断是否存在target属性，存在就加入，不存在则不操作
 * 3.在操作完成以后Dep.target属性制空
 */
function Wetcher (vm, exp, fn){
	this.fn = fn;
	this.vm = vm;
	this.exp = exp;
	Dep.target = this;
	let val = this.vm;
	let arr = this.exp;
	//获取值 会调用get方法
	arr.forEach(k => {
		val = val[k]
	})
	
	Dep.target = null;
}
/**
 * @description 监听小函数在数据变更以后调用
 * @return {[type]} [description]
 * 1.在这里我们拿到更新后的数据
 * 2.调用调用回调函数fn，并将新值传入
 */
Wetcher.prototype.update = function () {
	let val = this.vm
	let arr = this.exp
	//获取值 会调用get方法
	arr.forEach(k => {
		val = val[k]
	})
	//执行创建实例时的回调函数，并且传入新值替换
	this.fn(val)
}
```

### 实现computed

- 新建一个initComputed函数
- 获取computed的的值进行操作

```javascript

function Lvm (opt = {}) {
	//1.拿到opt对象，保存到this下边
	this.$options = opt;
	var data = this._data = this.$options.data;
	//2.进行数据劫持
	createObj (data)
	//3.this代理this._data对象
	for (let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get: () => this._data[key],
			set: newVal =>this._data[key] = newVal
		})
	}
	//计算属性初始化 必须在compile之前调用 否则无效 
	initComputed.call(this)

	//5.编译页面
	new Compile(this.$options.el, this);
}
/**
 * @desc 数据劫持方法
 */
function createObj (data) {
	if (typeof data !== 'object') return;
	return new Objserver(data)
}

/**
 * @desc 创建对象函数
 * @param {object} data 创建对象时传入的data对象
 * 1.遍历data对象，拿到左右的对象名和属性值
 * 2.使用Object.defineProperty创建对象
 * 3.加入遍历出来的val是一个对象，调用自己，实现递归调用
 * 4.新建一个事件池dep
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 */
function Objserver (data) {
	let dep = new Dep();
	for(let key in data) {
		let val  = data[key];
		
		createObj(val) 
		
		//使用Object.defineProperty 进行数据劫持
		Object.defineProperty(data, key, {
			enumerable: true,
			get: function () {
				//如果存在target属性的话添加到事件池dep
				Dep.target && dep.addSub(Dep.target)
				return val
			},
			set: function (newVal) {
				//如果用户输入的新值和原先的值完全相同，则不进行操作直接返回
				if (newVal === val) return;
				val = newVal
				//跟新属性值以后重新监听数据
				createObj(val) 
				//调用事件池通知方法 提醒更新时视图
				dep.notify()
			}
		})
	}
}

/**
 * @desc 编译模板
 * @param {string} el 包裹元素选择器
 * @param {object} vm 我们的lvm实例对象
 * 
 * 1.拿到我们初始化的el元素
 * 2.新建一个文档随便，用来缓存dom
 * 3.遍历el元素的所有子元素节点，添加到文档碎片
 * 4.进行表达式里的值替换
 * 5.添加到dom，更新页面
 */
function Compile (el, vm) {
	vm.$el = document.querySelector(el);
	var frag = document.createDocumentFragment(), node = null;
	//把app的dom移动到内存中进行操作
	while(node = vm.$el.firstChild) {
		frag.appendChild(node)
	}
	//替换变量
	replice (frag)


	/**
	 * @descrtion 替换内容
	 * @param  {dom} node html dom标签
	 * @return {null}   没有返回值
	 *
	 * 1.传入所有的dom的元素节点
	 * 2.使用Array.form转换为数组以后遍历处理
	 * 3.新建reg对象，匹配和捕获表达式里的
	 * 4.拿到每一个节点的文本节点(如果是元素，则递归调用自己)
	 * 5.通过nodeType判断是不是文本节点，并且使用正则对象验证是否包含大括号表达式
	 * 6.如果有大括号表达式，则进行替换赋值操作
	 * 7.数据监听(接下来实现)
	 * 8.数据双向绑定(稍后实现)
	 * 9.添加到dom
	 */
	function replice (node) {
		
		// 把node类数组转换为数组遍历
		Array.from(node.childNodes).forEach(item => {
			var reg = /\{\{(.*)\}\}/,
				text = item.textContent;//拿到文本节点
			if(item.nodeType == 3 && reg.test(text)) {
				reg.exec(text)
				var key, arr = RegExp.$1.split('.'), //如果拿到的是对象的深层属性(a.a.b)，在下边进行遍历 
					val = vm;//这里设置为vm => this 对象以后就可以直接访问得到数据

				arr.forEach(key => {
					//得到数据 遍历拿到对象属性的属性，主要操作多层数据
					val = val[key]
				})
				//创建监听小函数
				new Wetcher(vm, arr, function(newVal){
					item.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
				})
				//替换赋值操作
				item.textContent = text.replace(/\{\{(.*)\}\}/, val)
				val = null;
			}
			//实现数据双向绑定 
			//思路：
			//首先判断如果是元素，是否存在v-model属性，（拿到所有的attribute，然后遍历判断）
			//如果不存在就不操作，如果存在（v-model）属性则进行如下操作
			//拿到属性，遍历对象拿到val，赋值给元素
			//给input元素绑定事件，在数据变化的时候那导致，然后重新赋值
			//因为这里赋值如果说嵌套层级较多的时候需要进行特殊处理，我偷懒，没有做，只做了一级的，
			if (item.nodeType == 1) {
				let attrs = item.attributes;
				let reg = /v\-model/;
				//循环遍历属性 看有没有v-model
				Array.from(attrs).forEach(attr => {
					let name = attr.name;
					let exp = attr.value.split('.');
					if (reg.test(name)) {
						let val = vm;
						
						exp.forEach(k => {
								val = val[k]
							})
						item.value = val;
						
						//监听数据变化 更新input的值
						new Wetcher(vm, exp, function(newVal){
							item.value = newVal
						})

						item.addEventListener('input', function (e) {
							let val = e.target.value;
							//还没有想到多层级的数据怎么设置，后期学了再补
							vm[exp] = val
						})
					}
				})
			}
			//如果node不是文本节点，继续循环
			if (item.childNodes) {
				replice (item)
			}
		})
	}
	//把操作过的数据添加到dom
	vm.$el.appendChild(frag)
	frag = null
}

/**
 * 新建一个dep 实现模拟事件池
 * subs 保存所有需要监听的对象
 * addSub 将监听事件添加到事件池
 * notify当数据发生变化的时候调用，通知更新数据
 * notify触发的时候，遍历执行subs里的所有事件
 */
function Dep () {
	this.subs = [];
}

/**
 * @desc 事件池添加方法
 * @param {Function} fn 添加事件到事件池
 */
Dep.prototype.addSub = function (fn) {
	this.subs.push(fn)
}
/**
 * @desc 数据更新时刷新页面
 * @return {[type]} [description]
 */
Dep.prototype.notify = function () {
	this.subs.forEach(fn => {
		fn.update()
	})
}

/**
 * @desc 监听小函数 每个需要监听的对象的实例对象
 * @param {object}   vm  当前this的实例
 * @param {string}   exp 监听的属性 a|a.a 
 * @param {Function} fn  数据更改以后执行的回调函数
 *
 * 1.我们在创建一个wecher监听对象的实例，传入上述的参数
 * 2.为了方便加入事件池，在初始化函数的过程中给Dep一个target属性，
 * 然后在触发属性的get方法，在哪里判断是否存在target属性，存在就加入，不存在则不操作
 * 3.在操作完成以后Dep.target属性制空
 */
function Wetcher (vm, exp, fn){
	this.fn = fn;
	this.vm = vm;
	this.exp = exp;
	Dep.target = this;
	let val = this.vm;
	let arr = this.exp;
	//获取值 会调用get方法
	arr.forEach(k => {
		val = val[k]
	})
	
	Dep.target = null;
}
/**
 * @description 监听小函数在数据变更以后调用
 * @return {[type]} [description]
 * 1.在这里我们拿到更新后的数据
 * 2.调用调用回调函数fn，并将新值传入
 */
Wetcher.prototype.update = function () {
	let val = this.vm
	let arr = this.exp
	//获取值 会调用get方法
	arr.forEach(k => {
		val = val[k]
	})
	//执行创建实例时的回调函数，并且传入新值替换
	this.fn(val)
}

/**
 * @description 计算属性函数
 * @return {} [description]
 */
function initComputed () {
	let vm = this
	let computed = vm.$options.computed

	//拿到所有的computed属性，进行遍历操作
	//Object.keys(computed) => 返回computed对象的所有属性的name的数组
	//判断如果val是一个函数，则直接返回这个函数，如果是一个变量，则调用变量的get方法
	Object.keys(computed).forEach(key => {

		//建立数据劫持
		Object.defineProperty(vm, key, {
			get: typeof computed[key] === 'function' ? computed[key] 
				: computed[key].get,
			set: function() {}
		})
	})
}

```

