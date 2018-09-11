import React, {Component} from 'react';
import {WithRouter} from '../react-router-dom'
//  const Header = (props) => {
//     console.log('this', this)
//     return (
//         <h3><a onClick={() => this.props.history.push('/')}>管理系统</a></h3>
//     )
// }
class Header extends Component{
    
    render () {
        console.log('this', this)
        return (<h3>
            <a onClick={() => {this.props.history.push('/')}}>管理系统</a>
        </h3>)
    }
}

export default WithRouter(Header)

