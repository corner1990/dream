/**
 * 是一个组件，用来接收store，经在经过他的手，通过context api传递给所有的子组件
 */
import React, {Component} from 'react'
import {Provider as StoreProvider, Consumer} from './context'
import PropTypes  from 'prop-types'
export default class Provider extends Component{
    // 如果有人想使用这个组件，必须提供一个redux仓库属性
    static propTypes = {
        store: PropTypes.object.isRequired
    }
    render () {
        let value = {store: this.props.store}
        return (
            <StoreProvider value = {value}>
                {this.props.children}
            </StoreProvider>
        )
    }
}