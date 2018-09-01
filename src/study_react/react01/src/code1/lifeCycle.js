import React, {Component} from 'react'
import {render} from 'react-dom'
class ChildCounter extends Component{
    constructor () {
        super()
        this.state = {}
    }
    render () {
        return (<div>
            <br />
            childCounter: {this.props.num}
        </div>)
    }
    /**
     * 组件挂载，不能和getDerivedStateFromProps同时使用
     */
    // componentWillMount () {
    //     console.log('child componentWillMount')
    // }
    componentDidMount () {
        console.log('chile componentDidmout')
    }
    /**
     * 接收到新属性候触发
     * @param {Object} newProps 属性对象 
     * @return {Object} props 我们的处理后的props对象，必须返回
     */
    static getDerivedStateFromProps (newProps) {
        console.log('willReceiveProps')
        return {num: 20}
    }
    /**
     * 更新组件，替换之前的 componentWillUpdate 方法
     * @param {object} prevProps 之前的props对象
     * @param {object} prevState 之前的state对象
     */
    getSnapshotBeforeUpdate (prevProps, prevState) {
        console.log('component will upDate')
        console.log('prevProps', prevProps)
        console.log('prevState', prevState)
        // 这里返回的结果可以在componentDidUpdate通过第三个参数接收到
        return '123'
    }
    /**
     * 组件更新后，和getSnapshotBeforeUpdate 同时使用
     */
    componentDidUpdate (a, b, c) {
        console.log('view already update', c)
    }
    // /**
    //  * 当props更新的时候触发 不能和getDerivedStateFromProps同时使用
    //  * @param {object} newPros 参数
    //  */
    // componentWillReceiveProps(newPros) {
    //     console.log('newPros', newPros)
    // }
}

class Counter extends Component {
    constructor () {
        super()
        this.state = {
            num: 0
        }
        console.log('constructor')
    }
    /**
     * 组件将要挂载
     */
    componentWillMount () {
        // 这里更细数据不会重新渲染 这个方法不推荐使用了
        console.log('componentWillMount')
        this.setState({num: 2})
    }
    /**
     * 渲染
     */
    render () {
        console.log('render')
        return (<div>
            conter: {this.state.num}&emsp;<button onClick={() => {
                this.setState({num: this.state.num + 1})
                
            }}>button</button>
            <ChildCounter num={this.state.num}></ChildCounter>
        </div>)
    }
    /**
     * 组件渲染完成
     */
    componentDidMount () {
        // 在这里更新数据一定会重新渲染
        console.log('componentDidMount')
    }
    /**
     * 是否组件需要更新
     * 可以控制状态变化后，是否更新当前页面
     * 调用setState会调用该事件 这里方便做优化，可以使用immutablejs
     * @return {boolean} true 表示更新视图，false表示不更新视图
     */
    shouldComponentUpdate (nextProps, nextState) {
        // return false
        console.log('nextProps', nextProps)
        console.log('nextState', nextState)
        return true
    }
    /**
     * 更新组件
     */
    componentWillUpdate () {
        console.log('componentWillUpdate')
    }
    /**
     * 组件更新完成
     */
    componentDidUpdate () {
        console.log('componentDidUpdate')
    }
}
render(<Counter>
</Counter>, window.root)