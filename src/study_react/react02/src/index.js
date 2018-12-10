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
            obj = obj.map(child => {
                return this.initChild(child, value)
            })
        } else {
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
