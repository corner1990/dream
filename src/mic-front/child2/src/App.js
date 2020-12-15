
import './App.css';

function App(props) {
  /**
   * @desc 发布事件
   */
  const setChange = () => {
    props.setGlobalState({status: 'App2'})
  }
  // 接收事件 应用被挂载后 
  const onChange = (...args) => {
    console.log('onchange App2', ...args)
  }
  

  /**
   * @desc app2 出发event
   */
  const triggerEvent = () => {
    props.event.trigger('app1listener', 'app2 trigger')
  }
  /**
   * @desc app2监听event
   * @param  {...any} args 
   */
  const listener = (...args) => {
    console.log('app2 listenter', args)
  }
  if (window.__POWERED_BY_QIANKUN__) {
    props.onGlobalStateChange(onChange)
    props.event.listen('app2listener', listener)
  }
  return (
    <div className="App2">
      <header className="App-header2">
       child 2
       <p>
         <button onClick={setChange}>setChange</button>
       </p>
       <p>
         <button onClick={triggerEvent}>triggerEvent</button>
       </p>
      </header>
    </div>
  );
}

export default App;
