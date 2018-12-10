import React, {Component} from 'react'
import {render} from 'react-dom'
// 创建一个上下文对象
// Provider 提供数据
// Consumer 消费数据
// 单个上下文
// const {Provider, Consumer} = React.createContext()

// class Parent extends Component{
//     constructor () {
//         super()
//         this.state = {name: 'leo', age: 18, gender: '男'}
//     }
//     render () {
//         return(
//             // 定义数据 
//             <Provider value={this.state}>
//             <div>
//                 parent <br />
//                 <Children></Children>
//             </div>
//             </Provider>
//         )
//     }
// }
// class Children extends Component{
//     constructor () {
//         super()
//     }
//     render () {
//         return(
//             // 消费数据
//             <Consumer>
//             {value => {
//                 console.log('value', value)
//                 return(<div>
//                     Children: {value.name} <br />
//                     <GrandSon></GrandSon>
//                 </div>)
//             }}
//             </Consumer>
//         )
//     }
// }
// class GrandSon extends Component{
//     constructor () {
//         super()
//     }
//     render () {
//         return(
//             <Consumer>
//             {value => {
//                 return (
//                     <div>
//                         GrandSon: {value.age} <br />
//                     </div>
//                 )
//             }}
            
//             </Consumer>
//         )
//     }
// }


// 多个上下文
const ParentContext = React.createContext()
const ChildrenContext = React.createContext()

class Parent extends Component{
    constructor () {
        super()
        this.state = {name: 'leo', age: 18, gender: '男'}
    }
    render () {
        return(
            // 定义数据 
            <ParentContext.Provider value={this.state}>
            <div>
                parent <br />
                <Children></Children>
            </div>
            </ParentContext.Provider>
        )
    }
}
class Children extends Component{
    constructor () {
        super()
    }
    render () {
        return(
            // 消费数据
            // 定义多个context
            <ChildrenContext.Provider value={{name: 'Perter'}}>
            <ParentContext.Consumer>
            {value => {
                console.log('value', value)
                return(<div>
                    Children: {value.name} <br />
                    <GrandSon></GrandSon>
                </div>)
            }}
            </ParentContext.Consumer>
            </ChildrenContext.Provider>
        )
    }
}
class GrandSon extends Component{
    constructor () {
        super()
    }
    render () {
        return(
            // 消费不同的Context
            <ChildrenContext.Consumer>
            {value => {
                return (
                    <div>
                        GrandSon: {value.name} <br />
                    </div>
                )
            }}
            
            </ChildrenContext.Consumer>
        )
    }
}

render(<Parent></Parent>, window.root)