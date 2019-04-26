// 使用场景
/*
1. 参数适配
2. 返回值的适配
 */
function ajax(options) {
	let defaultOptions = {
		method: 'GET',
		dataType: 'json'
	}
	// es5 写法
	/*for (let key in  options) {
		defaultOptions[key] = options[key] || defaultOptions[key]
	}*/
	// es6 写法
	defaultOptions = { ...defaultOptions, ...options}
	console.log(defaultOptions)
}
ajax({
	url: 'http://abc.com',
	method: 'POST',
	success: function (data) {}
})
