import React from 'react'
import { connect } from "react-redux"
import actions from '../../store/actions/counter'

class Counter extends React.Component{

    render () {
        return (<div style={{textAlign: 'center'}}>
            <p>{this.props.number}</p>
            <button onClick={this.props.increment}>+</button>
        </div>)
    }
}
// 连接store
const WrapCounter = connect(
    state => state.counter,
    actions
)(Counter)
export default WrapCounter