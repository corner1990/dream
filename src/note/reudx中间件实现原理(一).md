# reudx中间件原理(一)

> 恩么么，很多时候我们需要在状态变更前和状态变更后做一些处理，我们管这些中间处理的组件为中间件(也不知道对不对，我自己下边的)，不管怎么说，我们不仅要会用，还要懂得其中的原理，接下来让我解开redux中间件的神秘面纱哈哈哈哈哈哈

### 基础代码搭建

> 这里的使用之前几篇文文章写的代码，[传送门](https://github.com/corner1990/dream/tree/master/src/study_react/study-redux/history/src06),在这个基础上，我一点点的拓展思路，慢慢的完成组件的编写。

### 基本原理

> 有一个死的写法，即使首先是嵌套了三个函数，里边的两个函数都是返回值，
>
> 这个三个函数，第一个函数的参数是store，第二个函数的参数是dispatch，第三个函数的参数是action，也是就是我们需要触发的动作

- 打开目录`src/store/index.js`
- 改写代码如下

```javascript
import reducer from './reducers';
import { createStore} from '../redux' 
let store = createStore(reducer)

// 模拟中间件原理
let dispatch = store.dispatch
store.dispatch = action => {
    console.log(store.getState())
    dispatch(action)
    console.log(store.getState())
}
// 这里就是一个简单的logger组件
// 具体思路就是： 
// 1.创建仓库
// 2.新建一个遍历保存store的dispatch
// 3.自定义一个dispatch方法覆盖store上的dispatch方法，在这个方法里调用处理我们的需要的逻辑，并且在函数内部调用原来的dispatch
```

- `applyMiddleware`方法

> 我们绑定组件需要一个公用方法，来处理绑定的逻辑

```javascript
/**
 * 挂在中间件
 * @param {function} middlerware 中间件函数
 */
function applyMiddleware (middlerware) {
    return function (createStore) {
        return function (reducer) {
            // 这是原始仓库，dispatch 就是原始的dispatch
            let store = createStore(reducer)
            let dispatch; // 此dispatch指向新的dispatch方法
            // 调用传入的中间件，拿到第一个返回的函数
            let ware = middlerware({
                getState: store.getState,
                dispatch: store.dispatch
            })
            // 调用中间见返回的函数，并把store.dispatch传过去，返回一个新的方法
            dispatch = ware(store.dispatch)
            // 解析老的store, 覆盖dispatch方法
            return {
                ...store,
                dispatch
            }
        }
    }
}
```



- `logger`组件

```javascript
import reducer from './reducers';
import { createStore} from '../redux' 
let store = createStore(reducer)

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
// 这样子我们就可以使用logger组件在控制台打印出结果
let store = applyMiddleware(logger)(createStore)(reducer)
```

### 函数调用`thunk`组件

> 很多时候我们不需要直接更改状态，而是在执行一个方法，然后再这个方法内部更新状态，这个样子之前的代码就无法满足我们的需求，只能做一个改写，大概步骤如下

- 添加新的action， 打开`src/store/actions/counter.js`，添加下面的代码

```javascript
thunk (payload) {
    /**
     * 把这个函数发送非仓库
     * 需要执行这个函数
     * 需要传递进来的dispatch和getState方法
     */
    return function (dispatch, getState) {
      setTimeout(()=> dispatch({ type: MINUS}), 1000)
    }
  },
```

- 在components里添加按钮,打开`src/componments/counter.js`，添加按钮

```javascript
<button onClick={() => this.props.thunk(1)}>thunk</button>
```

- 在`src/stroe/index.js`写一个新建的方法，代码如下

```javascript
function thunk ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，
    // 并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return function (next) { // next => store.dispatch
        return function (action) {// 自定义dispatch方法
            if (typeof action === 'function') {
                action(dispatch, getState)
            } else {
                next(action)
            }
        }
    }
    
}
let store = applyMiddleware(thunk)(createStore)(reducer)
// 到这里，我们就完成了dispatch的时候传递一个异步函数的处理，但是发现这个写法很不美观，只好简单的改造成下边的样子
```

- 优化`thunk`函数

```javascript
// 优化后的thunk函数
function thunk ({dispatch, getState}) {
    return next => action => {
                if (typeof action === 'function') {
                    action(dispatch, getState)
                } else {
                    next(action)
                }
            }
}
// 到目前看起来还不错，但是作为一个潮流的菜鸟，当然是喜欢使用pormise的，这个理明显不可以，这种事情也是完全不能忍得，所以只能辛苦一下自己，写一下处理promise的逻辑了
```

### 兼容`promsie`逻辑

> 这里主要是通过判断对象是否拥有then属性，并且then属性是一个方法，那就默认是要给promise对象

- 在`src/componments/counter.js`添加按钮

```javascript
<button onClick={() => this.props.promise1(1)}>promse</button>
```

- 添加新的action，打开`src/store/actions/counter.js`,最后边添加如下代码

```javascript
/**
   * promise调用
   * 这么写，只能处理成功的回调，不能处理失败的回调
   * @param {any} payload 任何值
   */
  promise1 (payload) {
    // 返回一个promse
    return new Promise(function (resolve, reject) {
      setTimeout(()=> resolve({ type: MINUS}), 1000)
    })
  }
```

- 在`src/stroe/index.js`中添加新的中间件

```javascript
function promise ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return next => action => {
                // 如果拿到的结果是一个promse，则等待结果
                if (action.then && typeof action.then === 'function') {
                    action.then(dispatch)
                } else {
                    next(action)
                }
            }
    
}
let store = applyMiddleware(promise)(createStore)(reducer)
// 到了这里，在页面上点击promise按钮就可以看到效果，但是美中不足的就是这个不支持处理reject的逻辑，怎么办，当然是继续改啦，
```

### 完善`promsie`的兼容处理

- 在`src/componments/counter.js`添加按钮

```javascript
<button onClick={() => this.props.playloadPromise(1)}>playloadPromise</button>
```

- 添加新的action，打开`src/store/actions/counter.js`,最后边添加如下代码

```javascript
 /**
   * promise参数
   * 这么写，只能处理成功的回调，不能处理失败的回调
   * @param {any} payload 任何值
   */
  playloadPromise (playload) {
    return {
      type: ADD,
      playload: new Promise(function(resolve, reject) {
        setTimeout(() => {
          if(Math.random() > 0.5) {
            resolve(playload)
          } else {
            reject(-playload)
          }
        }, 1000);
      })
    }
  }
```

- 在`src/stroe/index.js`中添做一个对promise组件简单的修改

```javascript
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
                        console.log('1', {...action, playload})
                        dispatch({...action, playload})
                    }, playload => {
                        console.log('2', {...action, playload})
                        dispatch({...action, playload})
                    })
                } else {
                    next(action)
                }
            }
    
}
```

### 总结

> 到了这里，基本上完成了组建的编写，但是还有一个大问题，就是不能够多个组件一起使用，这个目前解决不了，只有改天了，最后的最后，附上以上内容的[完整代码](https://github.com/corner1990/dream/tree/master/src/study_react/study-redux/history/src07)

