# reudx中间件原理(二)

> 这里主要解决多个中间件同事应用，以及redux的两个组件，compose和applyMiddleware组件。

### `componse`组件

> 该组件主要是作用就是将多个同时执行，最后返回结果，先看下边的栗子

```javascript
function add1 (str) {
    return 1 + str
}
function add2 (str) {
    return 2 + str
}
function add3 (str) {
    return 3 + str
}

// 打印拿到结果
let ret = add1(add2(add3('hello world')))
console.log(ret) //123hello world
```

- 原始版

> 这里写一个通用方法来处理这些调用的问题
>
> 1. 拿到所有需要执行的函数，
> 2. 使用reduceRight从右向左执行
> 3. 返回最终结果

```javascript
function add1 (str) {
    return 1 + str
}
function add2 (str) {
    return 2 + str
}
function add3 (str) {
    return 3 + str
}

/**
 * 
 * @param  {...any} fns function 处理函数
 * 说明： 第一次执行拿到返回的函数， 也就是return返回的fns.reduceRight
 *       后边继续执行的时候会由右向左的计算
 */
function compose (...fns) {
    // console.log('fns', fns) // [ [Function: add1], [Function: add2], [Function: add3] ]
    return args => fns.reduceRight((val, fn) => fn(val), args)
}
let ret = compose(add1, add2, add3)('hello world')
console.log(ret) // 123hello world
```

- 进化第一步，处理多个参数

```javascript
function add1 (str) {
    return 1 + str
}
function add2 (str) {
    return 2 + str
}
function add3 (str) {
    return 3 + str
}

// 处理多个参数
function sum (a, b) {
    return a + b
}

function compose (...fns) {
    // console.log('fns', fns) // [ [Function: add1], [Function: add2], [Function: add3] ]
    return (...args) => {
        // 拿到最后一个函数
        let last = fns.pop()
        // 返回一个函数，把上一个函数处理的返回值val作为参数传递给下一个函数，并返回改函数的返回值
        return fns.reduceRight((val, fn) => fn(val), last(...args))
    }
}

let ret = compose(add1, add2, add3, sum)('hello world', ' leo')
console.log(ret) // 123hello world leo
```

- 最终版

```javascript

/**
 * @param  {...any} fns 传入函数
 * 执行思路：
 * 1.第一次执行的时候， a = add1 , b = add2, let tmp = add1(add2(...args))
 * 2.第二次执行： a = tmp, b = add3, let tmp = add3(tmp('''args))
 * 3.第三次执行: a = tmp, b = sum, let tmp = a(sum(...args))
 * 4.最后返回结果
 *
 * 
 */
function compose (...fns) {
    return fns.reduce((a, b) => (...args) => {
        // args => 第一次： store.dispatch 
        // args => 第二次： 中间件处理函数，形参为action的函数
        return a( b(...args) )
    } )
}

// 应该这么写的 ，感觉可读性不高，遂使用上边的写法
// function compose (...fns) {
//     return fns.reduce((a, b) => (...args) => a( b(...args) ) )
// }
```

### 组件抽离
- 在`src/redux/`目录下新建文件，命名为componse

```javascript
function compose (...fns) {
    return fns.reduce((a, b) => (...args) => a( b(...args) ) )
}
export default compose
```

-  `src/redux/index.js`在该文件中导出组件componse

```javascript
import createStore from './createStore'
import bindActionCreators from './bindActionCreators'
import combineReducers from './combineReducers'
import compose from './compose'
export {
  createStore,
  bindActionCreators,
  combineReducers,
  compose
}

```

- 修改`applyMiddleware`方法如下 

> 这里有点绕，需要特别说明一下代码执行过程
>
> 1. 调用applyMiddleware(下边备注方法a)的时候拿到所有的中间件，然后返回一个函数(下边注释方法b)，这个函数接受createStore方法为参数
> 2. 方法b返回一个函数，接受一个参数reducer(用派发动作以后的处理函数)，然后再方法内部创建store，
> 3. 新建一个局部变量dispatch(用来再后边保存store的dispatch方法，方便我们自定义该方法以后派发动作)
> 4. 我们将所有的的中间件遍历处理，拿到一个处理后的函数数组ware，
> 5. 然后我们把ware传递给compose遍历处理，然后返回一个方法(store.dispatch)
> 6. 最后返回一个对象，我们首先解构store对象
> 7. 使用自己定义的dispatch覆盖store的dispatch方法，
> 8. 用户调用的时候实际调用的是我们自定义的dispatch，然后我们再自定义的dispatch中调用原先保存的store的dispatch方法

```javascript
/**
 * 挂在中间件
 * @param {function} middlerware 中间件函数
 */
function applyMiddleware (...middlerwares) { // 方法a
    return function (createStore) { // 方法 b
        return function (reducer) { // 方法 c
            // 这是原始仓库，dispatch 就是原始的dispatch
            let store = createStore(reducer)
            let dispatch; // 此dispatch指向新的dispatch方法
            // 调用传入的中间件，拿到第一个返回的函数
            let ware = middlerwares.map(middlerware => middlerware({
                getState: store.getState,
                dispatch: store.dispatch
            }))
            // ware => 中间件的next方法
            dispatch = compose(...ware)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
```

- `src/store/index.js`代码此时如下

```javascript
import reducer from './reducers';
import { createStore, applyMiddleware, compose} from '../redux' 

// 一个redux日志中间件
function logger (store) { // store， 最初始的仓库
    return function (next) { // next => store.dispatch
        return function (action) {// 自定义dispatch方法
            console.log('old', store.getState())
            next(action)
            console.log('new', store.getState())
        }
    }
}
function thunk ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return next => action => {
                if (typeof action === 'function') {
                    action(dispatch, getState)
                } else {
                    next(action)
                }
            }
    
}

function promise ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return next => action => {
                // 如果拿到的结果是一个promse，则等待结果
                if (action.then && typeof action.then === 'function') {
                    action.then(dispatch)
                } else if (action.playload && action.playload.then && typeof action.playload.then === 'function') {
                    // 如果action.payload属性存在
                    // action.payload.then 属性也存在
                    // action.payload.then 属性是一个function
                    action.playload.then(playload => {
                        dispatch({...action, playload})
                    }, playload => {
                        dispatch({...action, playload})
                    })
                } else {
                    next(action)
                }
            }
    
}

/**
 * 挂在中间件
 * @param {function} middlerware 中间件函数
 */
function applyMiddleware (...middlerwares) {
    return function (createStore) {
        return function (reducer) {
            // 这是原始仓库，dispatch 就是原始的dispatch
            let store = createStore(reducer)
            let dispatch; // 此dispatch指向新的dispatch方法
            // 调用传入的中间件，拿到第一个返回的函数
            let ware = middlerwares.map(middlerware => middlerware({
                getState: store.getState,
                dispatch: store.dispatch
            }))
            // ware => 中间件的next方法
            dispatch = compose(...ware)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}


// 自己写的库实现
let store = applyMiddleware(promise, thunk, logger)(createStore)(reducer)
export default store

// 到了这里我们完全完成了手写redux库的编写，为了方便使用，首先我们需要把applyMiddleware抽离，其次就是兼容主流的写法

```

- 抽离applyMiddleware

> `src/redux`目录创建新文件，命名为applyMiddleware
>
> 代码如下：

```javascript
import compose from './compose'
/**
 * 挂在中间件
 * @param {function} middlerware 中间件函数
 */
function applyMiddleware (...middlerwares) {
    return function (createStore) {
        return function (reducer) {
            // 这是原始仓库，dispatch 就是原始的dispatch
            let store = createStore(reducer)
            let dispatch; // 此dispatch指向新的dispatch方法
            // 调用传入的中间件，拿到第一个返回的函数
            let ware = middlerwares.map(middlerware => middlerware({
                getState: store.getState,
                dispatch: store.dispatch
            }))
            // ware => 中间件的next方法
            dispatch = compose(...ware)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
export default applyMiddleware
```

- `src/redux/index.js`在该文件中导出组件applyMiddleware

```javascript
import createStore from './createStore'
import bindActionCreators from './bindActionCreators'
import combineReducers from './combineReducers'
import compose from './compose'
import applyMiddleware from './applyMiddleware'
export {
  createStore,
  bindActionCreators,
  combineReducers,
  compose,
  applyMiddleware
}

```

- 抽离后`src/store/index.js`文件内容

```javascript
import reducer from './reducers';
import { createStore, applyMiddleware} from '../redux' 

// 一个redux日志中间件
function logger (store) { // store， 最初始的仓库
    return function (next) { // next => store.dispatch
        return function (action) {// 自定义dispatch方法
            console.log('old', store.getState())
            next(action)
            console.log('new', store.getState())
        }
    }
}
function thunk ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return next => action => {
                if (typeof action === 'function') {
                    action(dispatch, getState)
                } else {
                    next(action)
                }
            }
    
}

function promise ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return next => action => {
                // 如果拿到的结果是一个promse，则等待结果
                if (action.then && typeof action.then === 'function') {
                    action.then(dispatch)
                } else if (action.playload && action.playload.then && typeof action.playload.then === 'function') {
                    // 如果action.payload属性存在
                    // action.payload.then 属性也存在
                    // action.payload.then 属性是一个function
                    action.playload.then(playload => {
                        dispatch({...action, playload})
                    }, playload => {
                        dispatch({...action, playload})
                    })
                } else {
                    next(action)
                }
            }
    
}

/**
 * 挂在中间件
 * @param {function} middlerware 中间件函数
 */
function applyMiddleware (...middlerwares) {
    return function (createStore) {
        return function (reducer) {
            // 这是原始仓库，dispatch 就是原始的dispatch
            let store = createStore(reducer)
            let dispatch; // 此dispatch指向新的dispatch方法
            // 调用传入的中间件，拿到第一个返回的函数
            let ware = middlerwares.map(middlerware => middlerware({
                getState: store.getState,
                dispatch: store.dispatch
            }))
            // ware => 中间件的next方法
            dispatch = compose(...ware)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}


// 自己写的库实现
let store = applyMiddleware(promise, thunk, logger)(createStore)(reducer)
export default store

```

### 兼容市场主流的写法

> `let store = createStore(reducer, {}, applyMiddleware(promise, thunk, logger))`
>
> 主要修改两个文件：
>
> 1. `src/stroe/index.js`，创建store （`let store = applyMiddleware(promise, thunk, logger)(createStore)(reducer)`）修改为(`let store = createStore(reducer, {}, applyMiddleware(promise, thunk, logger))`)
> 2. 修改createStore组件，修改如下：

```javascript
/**
 * 创建state
 */
function createStore(reducer, initState, enchancer) {
  // 兼容市面主流写法, 没有什么高深的，就是对参数做了一个判断，修改了一下调用方式
  if (enchancer) {
    return enchancer(createStore)(reducer, initState)
  }
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
```

### 总结

> 到了这里，基本上学习了完整的redux库的实现的原理，恩么么 ，去学点别的东东，补充一下空空的大脑

