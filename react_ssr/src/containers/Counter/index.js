import React from 'react'

class Counter extends React.Component{
    state = {
        number: 0
    }
    render () {
        return (<div style={{textAlign: 'center'}}>
            <p>{this.state.number}</p>
            <button onClick={() => {
                this.setState({number: this.state.number++})
            }}>+</button>
        </div>)
    }
}

export default Counter