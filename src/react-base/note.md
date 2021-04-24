### react 入门
> React.js（React）是 Facebook 推出的一个用来构建用户界面的 JavaScript 库。和Vue，以及angular为目前主流的mvvm前端框架。相比较而言，在国内vue的开发者是要多于react和angular，其中angular的开发者最少(goole在每次大版本更新的时候经常推翻之前的所有知识，从新构建，导致学习成本增加)

### 三大框架的特点

1. Vue的特点

   1. 文档比较详细，完整
   2. 门槛低，上手快
   3. 渐进式开发，对刚开始学习mvvm框架的开发这来说更容易平滑过渡
   4. 官方提供整套组件, 即大名鼎鼎的vue全家桶(Vue + Vuex + Vue Router + axios)
   5. 有成熟的UI库(element UI， antdVue, taro ui ....)
   6. 因为模板语法的约束，相对编码风格会趋于一致，不会太奔放

   ```vue
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Vue Hello World</title>
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   </head>
   <body>
       <div id="app">
           {{message}}
       </div>
       <script>
           var app = new Vue({
               el:'#app',
               data:{
                   message:'Hello world'
               }
           })
       </script>
   </body>
   </html>
   ```

   

2. Angular 的特点

   1. Google 大哥出品，有强大的迭代开发能力,（也有可能是推翻重建）
   2. 结构清晰，分工明细，model，view，controller谁在什么时候做什么事情说的很清楚，整个框架充满了DI的思路，**耦合性非常低**，对象都是被inject的，也就是说每个对象都可以轻易被替换而不影响其他对象。
   3. 对 TypeScript 支持比较好
   4. angular 扩展性也很不错(甚至和jquery都很搭)，适合开发完整的项目(相对比较稳定，需要长期维护)

   > hello world 代码量太多，这里是[传送门](https://angular.io/guide/what-is-angular)

   

3. react 特点

   1. 如JavaScript那句话，一切皆对象(style， jsx...)
   2. 第三方库很多，社区相比较其他mvvm活跃很多
   3. 同样一个问题，解决方案很多，可以选择更适合自己的状态管理（react-redux, dva, mobx, react-thunk ...）
   4. 可以做到极致的性能优化(需要在codding的过程中严格遵循react数据流)
   5. 你的js水平有多好，你写出来的react结构就有清晰
   6. 天生对TypeScript支持

   ```react
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <title>Hello World</title>
       <script src="react.development.js"></script>
       <script src="react-dom.development.js"></script>
       <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
     </head>
     <body>
       <div id="root"></div>
       <script type="text/babel">
         ReactDOM.render(
           <h1>hello world</h1>, //JSX格式
           document.getElementById("root")
         );
   
       </script>
     </body>
   </html>
   ```

### React 基础

1. JSX，是一个 JavaScript 的语法扩展(react 提供给我们的语法糖，我们可以像写HTML标签一样写js)。JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模板语言，但它具有 JavaScript 的全部功能。

   ```react
   // 普通赋值
   const el = <h1>Hello, world!</h1>; // 这里的el并不是一个html标签，而是一个react vnode
   
   // 渲染变量
   const name = 'leo';
   const el = <h1>Hello, {name}</h1>;
   
   // 动态创建 jsx
   const element = React.createElement(
     'h1',
     {className: 'greeting'},
     'Hello, world!'
   );
   
   // 简化过的结构
   const el = {
     type: 'h1',
     props: {
       className: 'greeting',
       children: 'Hello, world!'
     }
   };
   ```

2. 元素渲染

   > 元素是构成 React 应用的最小模块，描述了我们在屏幕上想看到的内容。

   ```react
   // 渲染页面
   const el = <h1>Hello, world</h1>;
   ReactDOM.render(el, document.getElementById('root'));
   
   // 更新页面
   // 多次渲染
   function  render() {
     // 如果元素在外部，就不会被重新赋值
     const time = new Date();
     // 第一个jsx 元素
     const Hello = <h2
       className='hello'
       style={{
         margin: 100
       }}
     >
       hello react &emsp;
       {time.toLocaleDateString()} { time.toLocaleTimeString() } 
     </h2>
     ReactDOM.render(
       <React.StrictMode>
         {Hello}
       </React.StrictMode>,
       document.getElementById('root')
     );
   }
   // 更新页面
   setInterval(render, 1000)
   ```

3. 函数组件与props

   ```javascript
   // 函数组件
   function  Hello(props) {
     return <h2>Hello {props.text}</h2>
   }
   // class 组件
   class HelloWord extends React.Component{
     render() {
       return <h2>Hello {this.props.text}</h2>
     }
   }
   // 组合组件
   // class 组件
   class HelloWord2 extends React.Component{
     render() {
       return (<section>
         <h2>组合组件</h2>
         <Hello {...this.props} />
       </section>)
     }
   }
   ReactDOM.render(
     <React.StrictMode>
       <Hello text='React' />
       <HelloWord text={'World'} />
       <HelloWord2 text={'World2'} />
     </React.StrictMode>,
     document.getElementById('root')
   );
   
   
   ```

4. class组件以及react的常用生命周期

   1. *componentWillMount* 组件挂载之前
   2.  componentDidMount 组件挂载之后运行
   3. shouldComponentUpdate 在组件更新之前调用，返回boolean，true更新组件，false不更新
   4. getSnapshotBeforeUpdate 获取组件上次一个的状态，拿到preProps, preState
   5. componentDidUpdate 组件更新完毕后运行
   6. componentDidUpdate 组件卸载前运行

   > 生命周期示意图 [传送门](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
   >
   > <img src="/Users/corner/Documents/dream/src/react-base/src/assets/images/lifecycle.jpg" style="zoom:50%;" />

   ```react
   import React, {Component} from 'react';
   
   class Child extends Component{
     componentWillUnmount(...props) {
       console.log('child componentWillUnmount', props)
     }
     render() {
       return (<p>child {this.props.count}</p>)
     }
   }
   /** 定义class 组件 */
   class HelloWrold extends Component {
     state = {
       count: 0
     }
     // 组件快照  
     
     // }
     // // 组件挂载之前运行
     // componentWillMount(...args) {
     //   console.log('componentWillMount', args)
     // }
     // 组件挂载完毕
     componentDidMount() {
       console.log('componentDidMount')
     }
     
      // 返回boolean，是否更新页面，性能优化使用
      shouldComponentUpdate(nextProps, nextState) {
       console.log('shouldComponentUpdate', nextProps, nextState)
       // 当count能 % 3 = 0 不更新页面
       return nextState.count % 3 !== 0
     }
     // 和 componentWillMount 不能共存
     getSnapshotBeforeUpdate(prevProps, prevState) {
       // 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
       console.log('getSnapshotBeforeUpdate', prevProps, prevState)
       // return prevProps
       // return prevState
       return [prevProps, prevState]
     }
     // 组件更新完毕
     componentDidUpdate(...args) {
       console.log('componentDidUpdate', args)
     }
     
     
    
     // 组件卸载之前调用，主要用来取消订阅，清除当前组件内部的定时器
     componentWillUnmount(...props) {
       console.log('componentWillUnmount', props)
     }
     // 捕捉错误
     componentDidCatch(err) {
       console.log('componentDidCatch', err)
     }
     /**
      * @desc 更新state
      */
     increasement = () => {
       this.setState({
         count: this.state.count + 1
       })
     }
     render() {
       return <section>
         <h1>class 组件 与生命周期</h1>
         <p>count： { this.state.count }</p>
         {/* 当count 大于等于14的时候卸载child组件 */}
         <button onClick={this.increasement}>increate btn</button>
         {this.state.count < 10 && <Child count={this.state.count} />}
       </section>
     }
   }
   
   export default HelloWrold
   
   ```

5. 事件处理

   > React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同
   >
   > - React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
   > - 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
   



   ```jsx
   import React, {Component} from 'react';
   
   /** 定义class 组件 */
   class HelloWrold extends Component {
     state = {
       count: 0
     }
     // 
     static getDerivedStateFormProps(props, state) {
       // getDerivedStateFromProps， render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
       // 它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容
       console.log('getDerivedStateFromProps', props, state)
   
     }
     /**
      * @desc 更新state
      */
     increasement = () => {
       this.setState({
         count: this.state.count + 1
       })
     }
     /**
      * @desc 更新state 传递参数
      */
     increasement2 = (count) => this.setState({ count })
     
     render() {
       return <section style={{
         margin: 30
       }}>
         <h1></h1>事件处理
         <p>count： { this.state.count }</p>
         {/* 当count 大于等于14的时候卸载child组件 */}
         <button onClick={this.increasement}>increate btn</button>
         <br />
         <br />
         <button onClick={() => this.increasement2(this.state.count + 2)}>increate + 2</button>
       </section>
     }
   }
   
   export default HelloWrold

// react 处理默认事件
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
   
   ```

6. **react 条件渲染**

   > React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

   使用场景： 需要判断显示的地方，如登录和未登录，权限空置，状态切换

   ```react
   
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
   
   
   ```

7. **列表 & Key**

   > 我们在项目开发中。列表是非常常见的，如订单列表，商品列表，tablelist等，在react中列表渲染通常使用map完成，如果需要条件渲染，配合filter实现

   ```react
   
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
   
   
   ```

   

8. 地方

9. 阿达























