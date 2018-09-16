/**
 * 渲染数据
 * @param {object} appState  state对象
 */
function renderApp (appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}
/**
 * 渲染标题
 * @param {object} state 数据内容
 */
function renderTitle (state) {
    let el = document.querySelector('#title')
    el.innerHTML = state.text
    el.style.color = state.color
}
/**
 * 渲染内容
 * @param {object} state 数据内容
 */
function renderContent (state) {
    let el = document.querySelector('#content')
    el.innerHTML = state.text
    el.style.color = state.color
}

// 规定 如果想要修改appState只能荣国dispatch方法
// action是一个动作{type: 'UPDATE_TITLE_COLOR', color: 'orange'}
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR' // 更新标题颜色
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT' // 更新标题内容文本


/**
 * 创建state
 */
function createStore (reducer) {
    let state;
    let listeners = [] // 订阅数组

    // 监听函数
    function  subscribe(listener) {
        listeners.push(listener)
        // 返回一个函数，可以取消订阅
        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }
    /**
     * 获取store
     */
    function getState () {
        // 做一个克隆，防止对象被修改
        return JSON.parse(JSON.stringify(state))
    }

    function dispatch (action) {
        state = reducer(state, action)
        // 状态更新以后，执行所有的监听函数
        listeners.forEach(fn => fn())
    }
    // 需要主动调用一次dispatch进行初始化
    dispatch({'type': '@@INIT'})
    return {
        getState,
        dispatch,
        subscribe
    }
}
// 创建新的state时使用的对象
let initState = {
    title: {
        color: 'red',
        text: '标题'
    },
    content: {
        color: 'green',
        text: '内容'
    }
}
/**
 * 处理器
 * @param {object} state 状态对象
 * @param {object} action 需要修改的类型和值
 * @return {object} newState 返回新的state对象
 */
function reducer(state = initState, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state, // 解构原来的状态
                title: { // 解构拿到title对象并重新赋值
                    ...state.title,
                    color: action.color // 覆盖color属性
                }
            }
            break;
        case 'UPDATE_CONTENT_TEXT':
            return {
                ...state, // 解构原来的状态
                content: { // 解构拿到title对象并重新赋值
                    ...state.content,
                    text: action.text // 覆盖color属性
                }
            }
            break;
        default:
            return state;
    }
}

let store = createStore(reducer)

// 渲染视图
function render () {
    // 跟新试图
    renderApp(store.getState())
}
render()
store.subscribe(render)

// 3秒侯重新渲染
setTimeout(() => {
    // // dispatch({type: 'UPDATE_TITLE_COLOR', color: 'orange'})
    // // dispatch({type: 'UPDATE_CONTENT_TEXT', text: '新内容'})
    // // 更新视图
    // renderApp(store.getState())

    store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'orange'})
    store.dispatch({type: 'UPDATE_CONTENT_TEXT', text: '新内容'})
    // 更新视图 
    // renderApp(store.getState())
}, 3000)
