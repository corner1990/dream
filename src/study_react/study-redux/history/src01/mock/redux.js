let appState = {
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
 * 更新
 * @param {object} action 更新类型，更新的内容
 */
function dispatch (action) {
    switch (action.type) {
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break;
        case 'UPDATE_CONTENT_TEXT':
            appState.content.text = action.text
            break;
        default:
            break;
    }
}

// 跟新试图
renderApp(appState)

// 3秒侯重新渲染
setTimeout(() => {
    dispatch({type: 'UPDATE_TITLE_COLOR', color: 'orange'})
    dispatch({type: 'UPDATE_CONTENT_TEXT', text: '新内容'})
    // 更新视图
    renderApp(appState)
}, 3000)
