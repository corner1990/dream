/**
 * 我们不可能每次一个动作都手动大护法dispatch，这里方法主要是帮我们处理自动更新页面
 * @param {object} actions 动作类型
 * @param {fn} dispatch 派发动作的函数
 */
export default function (actions, dispatch) {
  // 我们需要返回的状态
  // actions = {add () {dispatch({type: ADD})}, minus () {dispatch({type: MINUS})}}
  // let newActons = {}
  // 这么写 不是很优雅
  // for (let key in actions) {
  //   newActons[key] = () => dispatch(actions[key]())
  // }
  // return newActons

  return Object.keys(actions).reduce((memo, key) => {
    // memo[key] = (...args) => dispatch(actions[key]()) ...args 是方便我们后边传参
    memo[key] = (...args) => dispatch(actions[key](...args))
    return memo
  }, {})
}