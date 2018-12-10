import React from 'react';
import {ADD, MINUS} from '../store/actions-types'
import store from '../store'
export default class Counter extends React.Component {
  state = store.getState()
  componentDidMount() {
    store.subscribe(() => this.setState({
      number: store.getState().number
    }))
  }
  render () {
    return (
      <div>
        <p>Counter: {this.state.number}</p>
        <button onClick={() => store.dispatch({ type: ADD })}>+</button>
        <button onClick={() => store.dispatch({ type: MINUS })}>-</button>
      </div>
    )
  }
  
}