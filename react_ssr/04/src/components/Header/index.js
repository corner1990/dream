import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render () {
        return (
            <nav className={"navbar navbar-inverse navbar-fixed-top"}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">SSR</a>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/counter">计数器</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}