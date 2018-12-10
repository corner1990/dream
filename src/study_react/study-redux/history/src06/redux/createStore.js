/**
 * 创建state
 */
function createStore(reducer) {
  let state;
  let listeners = [] // 订阅数组

  // 监听函数
  function subscribe(listener) {
    listeners.push(listener)
    // 返回一个函数，可以取消订阅
    return () => {
      listeners = listeners.filter(item => item !== listener)
    }
  }
  /**
   * 获取store
   */
  function getState() {
    // 做一个克隆，防止对象被修改
    return JSON.parse(JSON.stringify(state))
  }

  function dispatch(action) {
    state = reducer(state, action)
    // 状态更新以后，执行所有的监听函数
    listeners.forEach(fn => fn())
  }
  // 需要主动调用一次dispatch进行初始化
  dispatch({ 'type': '@@INIT' })
  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore;