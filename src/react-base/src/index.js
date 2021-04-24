
import React from 'react';
import ReactDOM from 'react-dom';

// 函数组件
class App extends React.Component{
  state = {
    list: [
      '不怕变成自己厌恶的人，我怕的是，过的还不如他们。',
  　　'无论受了多少委屈。我只会把它憋在心里。不是不想说，只是不知道该怎么说，能和谁说。',
  　　'思念很长，所以一日如两年，时间很短，所以两年如一日。',
  　　'你是不是又在苦心翻找一句话，只为给那个人看。',
  　　'越是在黑暗的时候，我们越要集中精神去寻找光明。',
  　　'恋爱是人生解脱的叛徒。——叔本华《爱与生的苦恼》',
  　　'别让你的过去决定了你的未来。——《蚁人》',
  　　'一个人拥有此生此世是不够的，他还应该拥有诗意的世界。——王小波',
  　　'拼了命地不让身边的人难过，却发现，受伤的原来是我自己。',
  　　'越长大越不敢依赖别人，因为人心易变，自己给的，才叫安全感。',
    ],
    filterType: 1, // 1: 显示全部， 2, 显示下标为偶数，3. 显示下标为奇数
  }
  getItems = () => {
    let { list } = this.state
    return list.map((item, key) => {
      return <p key={key}>{key + 1}. {item}</p>
    })
  }
  filter = filterType => {
    let list = [
      '不怕变成自己厌恶的人，我怕的是，过的还不如他们。',
  　　'无论受了多少委屈。我只会把它憋在心里。不是不想说，只是不知道该怎么说，能和谁说。',
  　　'思念很长，所以一日如两年，时间很短，所以两年如一日。',
  　　'你是不是又在苦心翻找一句话，只为给那个人看。',
  　　'越是在黑暗的时候，我们越要集中精神去寻找光明。',
  　　'恋爱是人生解脱的叛徒。——叔本华《爱与生的苦恼》',
  　　'别让你的过去决定了你的未来。——《蚁人》',
  　　'一个人拥有此生此世是不够的，他还应该拥有诗意的世界。——王小波',
  　　'拼了命地不让身边的人难过，却发现，受伤的原来是我自己。',
  　　'越长大越不敢依赖别人，因为人心易变，自己给的，才叫安全感。',
    ]
    list = list.filter((item, key) => {
      // 这里有是三个条，默认显示全部，所以只需要两个判单，谢判断的 时候为了方便阅读，可以将代码条件拆封写
      if (filterType === 1 & key % 2 !== 0) return false
      if (filterType === 2 && key % 2 === 0) return false 
      return true
    })
    this.setState({
      filterType,
      list
    })
  }
  render() {
    return (<section style={{
      padding: 50,
      backgroundColor: '#0bc',
      minHeight: 800,
      color: 'white',
      fontSize: 20
    }} className='container'>
    <h1>App Component</h1>
    <div className='btn-wrap'>
      <button className='btn btn-primary' onClick={() => this.filter(0)}>全部</button> &emsp;&emsp;
      <button className='btn btn-primary' onClick={() => this.filter(1)}>下标为奇数</button> &emsp;&emsp;
      <button className='btn btn-primary' onClick={() => this.filter(2)}>下标为偶数</button>
    </div>
    <br />
    { this.getItems() }
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

