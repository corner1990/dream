import React from 'react'
import {render} from 'react-dom'

// 效验props属性
import PropTypes from 'prop-types'
class Person extends React.Component{
    constructor () {
        super()
        this.state = {date: new Date().toLocaleTimeString()}
    }
    // es6不支持静态属性，只有静态方法
    static propTypes = {
        name: PropTypes.string,
        gender: PropTypes.oneOf(['男', '女']),
        hobby: PropTypes.arrayOf(PropTypes.string),
        pos: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        salary (props, property) {
            if (props[property] > 3000) throw new Error('salary to big')
        }
    }
    static defaultProps = {
        name: 'hello world'
    }
    // 组件挂载完成以后触发
    componentDidMount () {
        console.log('componentDidMount')
        // react中提供了一个setState方法可以更新状态
        // 会将这个对象原有的状态进行合并，合并后重新渲染页面
        
    }
    // 每个组件都有一个自己的render方法，会将render方法的返回值作为结果进行渲染
    // 在render方法中可以通过this.props获取属性
    render () {
        console.log('render props')
        return (
            <React.Fragment>
                <div>{this.props.name}</div>
            </React.Fragment>
        )
    }
}
//默认渲染
// let person = {
//     name: 'leo',
//     age: 16
// }
// render(<Person {...person}></Person>, window.root)

// 渲染默认值
// render(<Person></Person>, window.root)

// 测试属性
let person = {
    name: 200,
    age: 16,
    getder: '男',
    hobby: ['睡觉', '看书', '打豆豆'],
    pos: {
        x: 100,
        y: 200
    },
    salary: 50000 
}
render(<Person {...person}></Person>, window.root)

