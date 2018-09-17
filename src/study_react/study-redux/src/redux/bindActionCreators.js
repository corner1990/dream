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