import React from 'react'
import ReactDOM, {render} from 'react-dom'

class States extends React.Component{
    constructor () {
        super()
        this.state = {
            num: 0
        }
    }
    render () {
        return (
            <React.Fragment>
                <div>
                    {this.state.num}
                </div>
                <button onClick={this.fn}>add</button>&emsp;
                <button onClick={this.remove}>删除组件</button>
            </React.Fragment>
        )
    }
    fn = () => {// es7的写法，这么写，能保证this永远是当前实例
        // setState 是批量更新，不一定是同步的
        this.setState((prevState) => ({num: prevState.num + 1}))
        this.setState((prevState) => ({num: prevState.num + 1}))
    }
    // 组件销毁之前调用
    componentWillUnmount () {
        // 在这里处理异步事件
    }
    remove = () => {
        // 卸载组件
        ReactDOM.unmountComponentAtNode(window.root)
    }
}

render(<States></States>, window.root)