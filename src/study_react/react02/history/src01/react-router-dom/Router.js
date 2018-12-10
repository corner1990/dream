import React, {Component} from 'react';
import {Consumer} from './context'
export default class Route extends Component{
    render () {
        return (
            <Consumer>
                {
                    value => {
                        let {location: {pathname}} = value // 拿到hash 进行比较
                        // 拿到传入的path，组件，并手动大写(组件需要首字母大写)
                        let {path, component: Component} = this.props
                        if (pathname === path) {
                            return <Component></Component>
                        } else {
                            return null
                        }
                    }
                }
            </Consumer>
        )
    }
}