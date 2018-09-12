### React.CreateContext

> 跨组件传递的内容组件，该组件导出两个对象Provider 提供数据, Consumer， 消费数据

### 简单的使用

```javascript
// 创建上下文
let {Provider, Consumer} = React.createContext()

// 假设我们有很多个组件，我们只需要在父组件使用Provider提供数据，然后我们就可以在子组件任何位置使用Consumer拿到数据，不存在跨组件的问题
// 提供数据
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
let {Provider, Consumer} = React.createContext()
// 父组件
function Parent (props) {
    return (
        <div>
            <div>Parent: </div>
           <Son></Son>
        </div>
    )
}
// 子组件
function Son (props) {
    return (
        <div>
            <div>Son: </div>
            <Child></Child>
        </div>
        
    )
}
// 孙子组件
function Child (props) {
    return (
        <Consumer>
            {value => <div>
                value: {value}
            </div>}
        </Consumer>
    )
}
ReactDOM.render(<Provider value="1">
    <Parent />
</Provider>, document.getElementById('root'));

```

### 简单理解

> 思路：
>
> 	1.自己新建两个组件Provider,Consumer
>
> 	2.Provider有一个参数value
>
> 	3.在Provider组件内遍历子组件，
>
> 	4.如果组件是Consumer的话，就返回一个组件，并将value作为值传递给新创建的子组件Consumer

```javascript
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Provider extends Component{
    /**
     * 处理渲染子组件Consumer
     * @param {object} obj 需要循环的子组件 
     * @param {anything} value 定义的任何值
     */
    initChild (obj, value) {
        if (Array.isArray(obj)) {
            // 这里应该是递归调用，实现深度组建的处理
            // 这里仅作为简单的理解（其实是我写不出来，哈哈哈哈）
            obj = obj.map(child => {
                return this.initChild(child, value)
            })
        } else {
            // 如果组件是Consumer 就克隆一个新的组件返回，
            // 因为这里拿到的Consumer是一个对象，并不能直接使用，所以需要使用 React.cloneElement克隆一个新的对象返回
            if (obj.type.name === 'Consumer') return React.cloneElement(obj, {value})
        }
        
        return obj
    }
    render () {
        // 拿到子元素
        let {children, value} = this.props
        children = this.initChild(children, value)
       
        // 先判断子组件是一个还是数组，假如是数组，则遍历处理
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
       
    }
}

class Consumer extends Component{
    render () {
        return this.props.children(this.props.value)
    }
}
// 这里使用自己写的组件
ReactDOM.render(<Provider value="1">
    <Consumer>
        {
            value => <div>{value}</div>
        }
    </Consumer>
    <div>1-1</div>
    <Consumer>
        {value => `2-${value}`}
    </Consumer>
</Provider>, document.getElementById('root'));

```

### 总结

> 一定要敢写，虽然不一定写的出来，但是肯定会有收获。。。。。。