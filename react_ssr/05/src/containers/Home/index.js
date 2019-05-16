import React, {Component} from 'react';
import { connect } from 'react-redux'
import actions from '../../store/actions/home'

class Home extends Component {
    componentDidMount () {
        // 获取数据 在本地切换的时候需要异步加载数据
        if (this.props.list.length === 0) {
            this.props.getHomeList()
        }
    }
    render () {
        return (<div className="row">
            <h1>Home</h1>
            <ul className="list-group">
                {this.props.list.map(item => <li key={item.id} className="list-group-item">{item.name}</li>)
                }
            </ul>
        </div>)
    }
}
Home = connect(
    state => state.home,
    actions
)(Home)

// 此方法是用来异步加载数据， 并且放到仓库中去
Home.loadData = function (store) {
    // dispatch的返回值就是action
    return store.dispatch(actions.getHomeList())
}
export default Home;