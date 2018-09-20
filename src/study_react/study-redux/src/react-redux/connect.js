import React, {Component} from 'react';
import {Consumer} from './context'
import { bindActionCreators } from '../redux';
/**
 * connect 实现的是仓库和组件的链接
 * mapStateToProps 是一个函数 把状态映射为一个属性对象
 * mapDispatchToProps 是一个函数，把dispatch方法映射为一个属性对象
 */
export default function (mapStateToProps, mapDispatchToProps) {
     return function (Compon) {
         // 在这个组件实现仓库和组件的链接
         class Propxy extends Component{
             state = mapStateToProps(this.props.store.getState())
            
            componentDidMount () {
                // 组件挂在之后订阅世界
                this.unsubscribe = this.props.store.subscribe(() => {
                     this.setState(mapStateToProps(this.props.store.getState()))
                 })
             }
             componentWillUnmount () {
                 // 组件卸载之前关闭订阅
                 this.unsubscribe()
             }
             render () {
                 let actions = {}
                 // 如果是一个mapDispatchToProps 是一个函数，执行后得到属性对象
                 if (typeof mapDispatchToProps === 'function') {
                     actions = mapDispatchToProps(this.props.store.dispatch)
                 } else {
                    // 如果是mapDispatchToProps是一个对象，需要我们自己绑定
                    actions = bindActionCreators(mapDispatchToProps, this.props.store.dispatch)
                 }
                 return <Compon {...this.state} {...actions} />
             }
         }
         return () => (
             <Consumer>
                {
                    value => {
                        return <Propxy store={value.store} />
                    }              
                }
             </Consumer>
         );
     }
 }