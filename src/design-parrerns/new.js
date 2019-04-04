function create () {
	// 创建一个空对象
	let obj = {}
	// 获取构造函数
	let Con = [].shift.call(arguments)
	// 链接到原形
	obj.__proto__ = Con.__proto__
	// 绑定this
	let result = Con.apply(obj, arguments)

	// 确保 new 出来的对象
	return typeof result === 'object' ？ result : obj
}








































