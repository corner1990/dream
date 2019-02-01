import *  as React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/counter'
import { Store } from '../store/types'
// 定义接口 规定props属性对象
interface Props {
    name: string,
    number: number,
    incrementDely: any,
    increment: any,
    decrement: any
}
// 定义State 对象
// interface State {
//     number: number
// }

class Couter extends React.Component<Props>{
    render () {
        let {number, increment, decrement, incrementDely} = this.props
        return (
            <div>
                <h3>{this.props.name}</h3>
                <button onClick={decrement}>-</button>
                <p>{number}</p>
                <button onClick={increment}>+</button>
                <button onClick={incrementDely}>+ dely 1s </button>
            </div>
        )
    }
}

let mapStateToProps = function (state:Store):Store {
    return state
}
export default connect(mapStateToProps, actions)(Couter)