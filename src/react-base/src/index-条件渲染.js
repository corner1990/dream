
import React from 'react';
import ReactDOM from 'react-dom';

function Login(props) {
  return (<section>
    <h2>Login page</h2>
    <button className='btn btn-primary' onClick={props.login}>登陆</button>
  </section>)
}
function  HomePage(props) {
  return (<section className='home'>
    <h2 className='title'>home page</h2>
    <p className='sub-title'>wellcome </p>
    <button className='btn btn-primary' onClick={props.loginOut}>退出登录</button>
  </section>)
}
// 函数组件
class App extends React.Component{
  state = {
    isLogin: false
  }
  /**
   * @desc 登录
   */
  login = () => {
    this.setState({
      isLogin: true
    })
  }
  loginOut = () => {
    this.setState({
      isLogin: false
    })
  }
  /**
   * @desc 代码拆分
   */
  getPages = () => {
    // 代码抽离， 元素变量
    let com = this.state.isLogin ? <HomePage loginOut={this.loginOut} /> : <Login login={this.login}></Login>
    return com
  }
  render() {
    return (<section style={{
      padding: 50,
      backgroundColor: '#0bc',
      minHeight: 800,
      color: 'white',
      fontSize: 32
    }} className='container'>
    <h1>App Component</h1>
    {/* 三目运算符 */}
    <h3>您 { this.state.isLogin ? '已经登录' : '还没有登录' }</h3>
    {/* {
      this.state.isLogin ? <HomePage loginOut={this.loginOut} /> : <Login login={this.login}></Login>
    } */}
    { this.getPages() }
    </section>)
  }
}
// 组合组件
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

