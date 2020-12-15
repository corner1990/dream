
import './App.css';

function App(props) {
  /**
   * @desc 发布事件
   */
  const setChange = () => {
    props.setGlobalState({status: 'App1'})
  }
  // 接收事件
  const onChange = (...args) => {
    console.log('onchange App1', ...args)
  }
  /**
   * @desc app2 出发event
   */
  const triggerEvent = () => {
    props.event.trigger('app2listener', 'app1 trigger')
  }
  /**
   * @desc app2监听event
   * @param  {...any} args 
   */
  const listener = (...args) => {
    console.log('app1 listenter', args)
  }
  // 微应用时才运行
  if (window.__POWERED_BY_QIANKUN__) {
    props.onGlobalStateChange(onChange)
    props.event.listen('app1listener', listener)
  }
  return (
    <div className="App1">
      <header className="App-header1">
          Learn React111
      </header>
      <div>
        <button onClick={setChange}>setChange</button>
      </div>
      <p>
         <button onClick={triggerEvent}>triggerEvent</button>
       </p>
    </div>
  );
}

export default App;
