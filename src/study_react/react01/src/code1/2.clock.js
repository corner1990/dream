// 闹钟组件
import React from 'react'
import {render} from 'react-dom'

// 类组件 需要有自己的状态，需要继承父类组件
class Clock extends React.Component{
    constructor () {
        super()
        this.state = {date: new Date().toLocaleTimeString()}
    }
    // 组件挂载完成以后触发
    componentDidMount () {
        console.log('componentDidMount')
        // react中提供了一个setState方法可以更新状态
        // 会将这个对象原有的状态进行合并，合并后重新渲染页面
        setInterval(()=>{
            this.setState( {date: new Date().toLocaleTimeString()})
        }, 1000)
    }
    // 每个组件都有一个自己的render方法，会将render方法的返回值作为结果进行渲染
    // 在render方法中可以通过this.props获取属性
    render () {
        console.log('render')
        return (
            <React.Fragment>
                <p>{this.props.title}</p>
                <div>{this.state.date}</div>
            </React.Fragment>
        )
    }
}

render(<Clock title='当前时间'></Clock>, window.root)
