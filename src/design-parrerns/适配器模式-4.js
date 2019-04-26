// 开发中总是会有恨的老的代码，然后我们随着时间的推移，很多东西已经不用之前的库了，我们为了不改之前的改之前的代码，可以自己写一个适配
// 假设我们使用jQuery的ajax请求，现在改用fetch

// 设置代理
window.$ = {
	ajax (options) {
		return fetch({
			method: options.type || 'GET',
			body: JSON.stringify(options.data || {}),
			responseType: options.responseType
		})
	}
}

// 调用
$.ajax({
	type: 'get',
	responseType: 'json',
	data: {a: 'a', b: 'B'}
})
