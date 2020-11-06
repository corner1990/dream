// 命名空间
/*
* 1. 变量冲突
* 2. 复杂层次对象的可读性
 */
let utils = {}
utils.define = function (namespace, fn) {
	namespace = namespace.split('.')
	let fnName = namespace.pop()
	let curr = utils

	for (let i = 0; i < namespace.length; i++) {
		let name = namespace[i]
		if (!curr[name]) {
			curr[name] = {} // 作为容器
		}
		curr = curr[name]
	}
	curr[fnName] = fn
}

utils.define('req', function () {console.log('req')})
utils.define('requst.header', function () {console.log('utils.req.header')})
console.log(utils.req())
console.log(utils.requst.header())
