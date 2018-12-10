# React渲染优化之immutableJS(一)

> 我们都知道react是数据变更以后就会刷新页面，但是如果我们只是变了某一个数据，然后整个页面都刷新的话，那会很消耗浏览器的性能，我门能做的，就是减少不必要的刷新，具体怎么做，我们一步步的来

### 项目搭建

- 这里使用`create-react-app stduy_immutable`初始化项目
- 项目初始化完成之后，进入`src`目录，删除所有文件，自己新建一个`index.js`
- 先来一个简单的计数器demo，手写基础代码如下：

```javascript
import React,{Component} from 'react';
import _ from 'lodash'
import ReactDOM from 'react-dom';

/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
class Counter extends Component{
  state = {
    counter: { number: 0}
  }
  handleClick = event => {
    let state = this.state
    // 每次生成新的对象, 这样子PureComponent组件才会刷新页面
    let amount = this.amount.value ? Number(this.amount.value) : 0
    state.counter.number = state.counter.number + amount
    this.setState(state)
  }
  render () {
    console.log('render')
    return (
      <div>
        <p>{this.state.counter.number}</p>
        <input ref={input => this.amount = input}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'));
```

- 使用示例

  > 如以上代码，我们在浏览器打开以后，不输入任何数字，点击的时候默认值为0，说明是不需要刷新页面的，但是我们通过组件`render`里打印的日志看到，页面在我们每次点击都有重新渲染页面，这肯定不是我们需要的。下边我们做一个简单的优化

### `PureComponent`组件

> 官方提供了一个优化渲染的`PureComponent` 组件，`PureComponent`优化的原理是重写了`shouldComponentUpdate`，如果说老的状态对象和新的状态对像不是一个对象的话才会刷新页面，我们可以从`react`结构出来， 
>
> `import {PureComponent} from 'react'`
>
> 但是呢，别高薪的太早，这个是有缺陷的，你会发现这货只渲染一次，在就不渲染了，我们修改代码测试一下

```javascript
import React,{Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
class Counter extends PureComponent{
  state = {
    counter: { number: 0}
  }
  handleClick = event => {
    let state = this.state
    // 每次生成新的对象, 这样子PureComponent组件才会刷新页面
    let amount = this.amount.value ? Number(this.amount.value) : 0
    state.counter.number = state.counter.number + amount
    this.setState(state)
  }
  render () {
    console.log('render')
    return (
      <div>
        <p>{this.state.counter.number}</p>
        <input ref={input => this.amount = input}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'));

```

> 通过上边的代码测试，我们发现即使数据更新，也不会触发渲染了，此时此刻，我们只能自己动手，丰衣足食了。来来来，撸起袖子自己重写一个`PureComponent`组件

### 自己改写`PureComponent`组件

- 在当前目录新建一个js文件，命名为`PureComponent.js`
- 在`PureComponent.js`写一个组件，内容如下

```javascript
// 在我们渲染页面，也就是setState的时候会先调用shouldComponentUpdate方法，该方法返回一个布尔值，true的话刷新页面，false的时候不刷新页面，知道这个就很好办了，
// 页面引入lodash来做对象比对
import React, { Component } from 'react';
import _ from 'lodash'
class PureComponent extends Component{
  shouldComponentUpdate (nextProps, nextState) {
    // 判断对象的属性和属性值是否相同，并将结果值返回
    return !_.isEqual(nextState, this.state)
  }

}

export default PureComponent
```

- `index.js`的修改如下

```javascript
import React,{Component} from 'react';
import _ from 'lodash'
import ReactDOM from 'react-dom';
import PureComponent from './PureComponent';
// PureComponent 组件优化的原理是重写了shouldComponentUpdate，如果说老的状态对象昂和新的状态对戏那个不是一个对戏那个的话才会刷新页面
/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
class Counter extends PureComponent{
  state = {
    counter: { number: 0}
  }
  handleClick = event => {
    // 每次生成新的对象, 这样子PureComponent组件才会刷新页面
    let state = _.cloneDeep(this.state)
    let amount = this.amount.value ? Number(this.amount.value) : 0
    state.counter.number = state.counter.number + amount
    this.setState(state)
  }
  render () {
    console.log('render')
    return (
      <div>
        <p>{this.state.counter.number}</p>
        <input ref={input => this.amount = input}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'));


```

### 总结

> 通过以上简单的处理，就解决了页面渲染的问题，但是又引出了一个新的问题，就是每次更新state的时候都需要做一个深拷贝，这个样子及其消耗性能，这个问题留下一篇文章处理



