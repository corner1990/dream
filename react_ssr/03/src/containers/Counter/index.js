import React from 'react'

class Counter extends React.Component{
    state = {
        number: 0
    }
    render () {
        return (<div style={{textAlign: 'center'}}>
            <p>{this.state.number}</p>
            <button onClick={() => {
                let {number} = this.state
                number++;
                
                this.setState({number})
            }}>+</button>
        </div>)
    }
}

export default Counter