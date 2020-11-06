// redux
// 简单工厂模式
function CreateStore (reducer) {
	let state;
	let listeners = []
	function subscribe (listener) {
		listeners.push(listener)
	}
	function getState () {
		return state
	}
	function dispatch (action) {
		state = reducer(state, action)
	}
	return {
		getState,
		dispatch,
		subscribe
	}
}

let reducer = function (state, action) {
	// 内部实现逻辑请参考之前redux博客
}
let store = CreateStore({})
