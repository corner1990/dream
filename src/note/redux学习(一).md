# redux学习(一)

> 这里是官方的简介：
>
> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。 (如果你需要一个 WordPress 框架，请查看 [Redux Framework](https://reduxframework.com/)。)
>
> 可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个[时间旅行调试器可以编辑后实时预览](https://github.com/gaearon/redux-devtools)。
>
> Redux 除了和 [React](https://facebook.github.io/react/) 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。
>
> 为了方便理解redux的原理，在这里做一个叫简单的学习

### 新建目录结构

> 考虑这里是学习redux，遂将后边的命名都取为redux，感觉这样子中心思想明确一些

```
├── mock
|   ├── redux.html
|   └── redux.js
```

### 文件内容

- redux.html 内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="title"></div>
    <div id="content"></div>
    <script src="redux.js"></script>
</body>
</html>
```

- redux.js 内容
  - 实现思路：
  - 假设我们有一个数据对象(APPState)
  - 我们有一个渲染内容的方法(renderApp)
  - 还有两个渲染具体内容的方法(renderTitle, renderContent)
  - 两个action(UPDATE_CONTENT_TEXT, UPDATE_TITLE_COLOR)
  - 一个派发事件的方法(dispatch)
  - 代码的是思路如下，页面加载以后我们第一次渲染页面，然后在三秒后更新页面数据

```javascript
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

```

### 总结 

> 以上是简单的代码雏形，我们到了这里，搭起了简单的代码框架，接下来的几张，将继续完成整个redux库的编写