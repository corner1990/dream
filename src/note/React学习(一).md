# React学习(一)

> [这里传送门](https://react.docschina.org/docs/add-react-to-a-new-app.html)
>
> 先很火，自己也来看看，学习一下如何使用

### 安装

> react官网为我们提供了脚手架工具，我们可以很简单的创建出一个react的项目骨架，个别同学的npm速度太慢的话可以考虑使用[nrm](https://www.npmjs.com/package/nrm),或者[yarn](https://yarnpkg.com/zh-Hans/docs/getting-started),肯定能很大程度的提高你的幸福感

```javascript
// 安装
npm install -g create-react-app
// 新建项目
create-react-app my-app
// 进入新建项目牡蛎
cd my-app
// 启动项目
npm start

// 做完以上 我们就启动了一个简单的react项目，可以在浏览器输入localhost:3000查看效果
// 接卸来将学习react的基本语法,以及组建等等
```

### 基本语法 

> 为了方便学习,我们需要把目录内部的`src`文件夹下的所有的文件删除,然后自己新建一个index.js,并在`src`目录下新建一个`code`目录,保存文件,`index.js`只作为入口文件

- 文档目录

```javascript
// 目前为止,目录结构是酱紫的
my-app
│   README.md   
│	.gitignore
│	package.json
│
└───src
│   │   inde.js
│   │
│   └───code
│       │   1.js
│       │   ...
│   
└───node_modules
│   │   file021.txt
│   │   file022.txt

```

- 基本语法使用

> 写一个hello world

```javascript
// my-app/src/code/1.js
// 引入文件
import React from 'react'
import {render} from 'react-dom'

let el = <h1 title="hello">hello world</h1>
// 代码为了保证格式，写在一个括号里，防止出现意外问题

// my-app/src/index.js 引入文件
import './code1/1'
```

> 渲染列表

```javascript
// my-app/src/code/1.js
// 引入文件
import React from 'react'
import {render} from 'react-dom'

// 代码为了保证格式，写在一个括号里，防止出现意外问题
let el = (
    <div>
        <li>1</li>
        <li>2</li>
    </div>
)


render(el, document.querySelector('#root'))
// my-app/src/index.js 引入文件
import './code1/1'
```

> 代码为了保证格式，写在一个括号里，防止出现意外问题

```javascript
// my-app/src/code/1.js
// 引入文件
import React from 'react'
import {render} from 'react-dom'


// 某些情况下我们不需要包裹标签，为了防止报错，可以使用React.Fragment标签，可以有效减少无用的dom嵌套
let el = (
    <React.Fragment>
        <li>1</li>
        <li>2</li>
    </React.Fragment>
)

// 可以直接渲染数组
let el = [
    <li>1</li>,
    <li>2</li>
]

render(el, document.querySelector('#root'))
// my-app/src/index.js 引入文件
import './code1/1'
```

> 可以直接渲染数组

```javascript
// my-app/src/code/1.js
// 引入文件
import React from 'react'
import {render} from 'react-dom'

// 可以直接渲染数组
let el = [
    <li>1</li>,
    <li>2</li>
]

render(el, document.querySelector('#root'))
// my-app/src/index.js 引入文件
import './code1/1'
```

### jsx和html不一样的特殊属性

- `class -> className <h2 className="hello">hello world</h2>`
- `style -> 对象形式  <span style={{color: '#06c'}}>span</span>`
- `for -> hrmlFor  <label htmlFor="userName">userName</label>`

### 区分是js还是html是根据

> html :  <;
>
> js:  {;
>
> 可以有效的防止csrf

```javascript
// my-app/src/code/1.js
// 引入文件
import React from 'react'
import {render} from 'react-dom'

let str = '<h3>h3</h3>' // 防止xss攻击
<div dangerouslySetInnerHTML={{__html: str}}></div>
let el = (
    <React.Fragment>
        <h2 className="hello">hello world</h2>
        {/*注释*/}
        <span style={{color: '#06c'}}>span</span><br />
        <label htmlFor="userName">userName: </label>
        <input type="text" id="userName"/>
        <div dangerouslySetInnerHTML={{__html: str}}></div>
    </React.Fragment>
)
render(el, document.querySelector('#root'))

// my-app/src/index.js 引入文件
import './code1/1'
```

### 表达式的用法

- 表达式可以进行取值，必须有返回值可以
- null 或者void 0 都是一个合法的jsx元素
- 可以实现三元判断

```javascript
// my-app/src/code/1.js
// 引入文件
import React from 'react'
import {render} from 'react-dom'

let fn = () => '嗯嘛嘛'
let el = (
    <div>
        {(() => 'hello world') ()}
        <p>{fn()}</p>
        <p>{123 + '456' + 789}</p>
        <p>{true ? 'true' : 'false'}</p>
    </div>
)

render(el, document.querySelector('#root'))
console.log(el)

// my-app/src/index.js 引入文件
import './code1/1'
```

### 组件

>  复用，提高可维护性
>
>  组件的组成 react元素组成，组件就是一个函数
>
> 组件(函数组件， 类组件)属性，状态
>
> 组件名必须大写, 组件也是react元素

- 函数组件
  + 函数组建中 没有自己的状态
  + 函数组建中没有this
  + 没有生命周期

```javascript
// 闹钟组件
import React, {Component} from 'react'
import {render} from 'react-dom'

// 组件名必须大写
// 组件也是react元素
function Clock (props) {
    return <p>当前时间：{props.time} </p>
}

let wrap = <div>
	<Clock time={new Date().toLocaleTimeString()}></Clock>
</div>
// 动态刷新页面
setInterval(() => {
    render(<div>
        <Clock time={new Date().toLocaleTimeString()}></Clock>
        </div>, window.root)
}, 1000)

// my-app/src/index.js 引入文件

// 引用闹钟组件
import './code1/clock'
```

- 类组件

> 需要有自己的状态，需要继承父类组件

```javascript
// 闹钟组件
import React from 'react'
import {render} from 'react-dom'

// 类组件 需要有自己的状态，需要继承父类组件
class Clock extends React.Component{
    constructor () {
        super()
        this.state = {date: new Date().toLocaleTimeString()}
    }
    // 组件挂载完成以后触发
    componentDidMount () {
        console.log('componentDidMount')
        // react中提供了一个setState方法可以更新状态
        // 会将这个对象原有的状态进行合并，合并后重新渲染页面
        setInterval(()=>{
            this.setState( {date: new Date().toLocaleTimeString()})
        }, 1000)
    }
    // 每个组件都有一个自己的render方法，会将render方法的返回值作为结果进行渲染
    // 在render方法中可以通过this.props获取属性
    render () {
        console.log('render')
        return (
            <React.Fragment>
                <p>{this.props.title}</p>
                <div>{this.state.date}</div>
            </React.Fragment>
        )
    }
}

render(<Clock title='当前时间'></Clock>, window.root)
       
// my-app/src/index.js 引入文件
// 类组件
import './code1/2.clock'   
```

### 属性效验[`prop-types`](https://www.npmjs.com/package/prop-types)

> 依赖`prop-types`组件,需要自己安装

```javascript
import React from 'react'
import {render} from 'react-dom'

// 效验props属性
import PropTypes from 'prop-types'
class Person extends React.Component{
    constructor () {
        super()
        this.state = {date: new Date().toLocaleTimeString()}
    }
    // es6不支持静态属性，只有静态方法
    // 具体的使用方法可以看文档,这里是简单的属性校验
    static propTypes = {
        // 字符串
        name: PropTypes.string,
        // 数组,指定选项
        gender: PropTypes.oneOf(['男', '女']),
        // 数组,item的type
        hobby: PropTypes.arrayOf(PropTypes.string),
        // 校验对象
        pos: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        //使用function返回结果
        salary (props, property) {
            if (props[property] > 3000) throw new Error('salary to big')
        }
    }
    static defaultProps = {
        name: 'hello world'
    }
    // 组件挂载完成以后触发
    componentDidMount () {
        console.log('componentDidMount')
        // react中提供了一个setState方法可以更新状态
        // 会将这个对象原有的状态进行合并，合并后重新渲染页面
        
    }
    // 每个组件都有一个自己的render方法，会将render方法的返回值作为结果进行渲染
    // 在render方法中可以通过this.props获取属性
    render () {
        console.log('render props')
        return (
            <React.Fragment>
                <div>{this.props.name}</div>
            </React.Fragment>
        )
    }
}
//默认渲染
// let person = {
//     name: 'leo',
//     age: 16
// }
// render(<Person {...person}></Person>, window.root)

// 渲染默认值
// render(<Person></Person>, window.root)

// 测试属性
let person = {
    name: 200,
    age: 16,
    getder: '男',
    hobby: ['睡觉', '看书', '打豆豆'],
    pos: {
        x: 100,
        y: 200
    },
    salary: 50000 
}
render(<Person {...person}></Person>, window.root)

// my-app/src/index.js 引入文件
// 属性效验
import './code1/props.validate'
```

### state

> setState 是批量更新，不一定是同步的,有的时候更新不是同步的,所以需要拿到上一个状态在进行处理

```javascript
import React from 'react'
import ReactDOM, {render} from 'react-dom'

class States extends React.Component{
    constructor () {
        super()
        this.state = {
            num: 0
        }
    }
    render () {
        return (
            <React.Fragment>
                <div>
                    {this.state.num}
                </div>
                <button onClick={this.fn}>add</button>&emsp;
                <button onClick={this.remove}>删除组件</button>
            </React.Fragment>
        )
    }
    fn = () => {// es7的写法，这么写，能保证this永远是当前实例
        // setState 是批量更新，不一定是同步的
        this.setState((prevState) => ({num: prevState.num + 1}))
        this.setState((prevState) => ({num: prevState.num + 1}))
    }
    // 组件销毁之前调用
    componentWillUnmount () {
        // 在这里处理异步事件
    }
    remove = () => {
        // 卸载组件
        ReactDOM.unmountComponentAtNode(window.root)
    }
}

render(<States></States>, window.root)
       
// my-app/src/index.js 引入文件
import './code1/state'   
```

### 生命周期

> 每一个组件从创建,挂在,跟新,卸载,销毁,会有不同的状态,以及在新的版本中新增的方法,这里做一个见到那的记录

```javascript
// 在code目录创建新的js文件lifeCircle.js
// 内容如下
import React, {Component} from 'react'
import {render} from 'react-dom'
class ChildCounter extends Component{
    constructor () {
        super()
        this.state = {}
    }
    render () {
        return (<div>
            <br />
            childCounter: {this.props.num}
        </div>)
    }
    /**
     * 组件挂载，不能和getDerivedStateFromProps同时使用
     */
    // componentWillMount () {
    //     console.log('child componentWillMount')
    // }
    componentDidMount () {
        console.log('chile componentDidmout')
    }
    /**
     * 接收到新属性候触发
     * @param {Object} newProps 属性对象 
     * @return {Object} props 我们的处理后的props对象，必须返回
     */
    static getDerivedStateFromProps (newProps) {
        console.log('willReceiveProps')
        return {num: 20}
    }
    /**
     * 更新组件，替换之前的 componentWillUpdate 方法
     * @param {object} prevProps 之前的props对象
     * @param {object} prevState 之前的state对象
     */
    getSnapshotBeforeUpdate (prevProps, prevState) {
        console.log('component will upDate')
        console.log('prevProps', prevProps)
        console.log('prevState', prevState)
        // 这里返回的结果可以在componentDidUpdate通过第三个参数接收到
        return '123'
    }
    /**
     * 组件更新后，和getSnapshotBeforeUpdate 同时使用
     */
    componentDidUpdate (a, b, c) {
        console.log('view already update', c)
    }
    // /**
    //  * 当props更新的时候触发 不能和getDerivedStateFromProps同时使用
    //  * @param {object} newPros 参数
    //  */
    // componentWillReceiveProps(newPros) {
    //     console.log('newPros', newPros)
    // }
}

class Counter extends Component {
    constructor () {
        super()
        this.state = {
            num: 0
        }
        console.log('constructor')
    }
    /**
     * 组件将要挂载
     */
    componentWillMount () {
        // 这里更细数据不会重新渲染 这个方法不推荐使用了
        console.log('componentWillMount')
        this.setState({num: 2})
    }
    /**
     * 渲染
     */
    render () {
        console.log('render')
        return (<div>
            conter: {this.state.num}&emsp;<button onClick={() => {
                this.setState({num: this.state.num + 1})
                
            }}>button</button>
            <ChildCounter num={this.state.num}></ChildCounter>
        </div>)
    }
    /**
     * 组件渲染完成
     */
    componentDidMount () {
        // 在这里更新数据一定会重新渲染
        console.log('componentDidMount')
    }
    /**
     * 是否组件需要更新
     * 可以控制状态变化后，是否更新当前页面
     * 调用setState会调用该事件 这里方便做优化，可以使用immutablejs
     * @return {boolean} true 表示更新视图，false表示不更新视图
     */
    shouldComponentUpdate (nextProps, nextState) {
        // return false
        console.log('nextProps', nextProps)
        console.log('nextState', nextState)
        return true
    }
    /**
     * 更新组件
     */
    componentWillUpdate () {
        console.log('componentWillUpdate')
    }
    /**
     * 组件更新完成
     */
    componentDidUpdate () {
        console.log('componentDidUpdate')
    }
}
render(<Counter>
</Counter>, window.root)
       
 // my-app/src/index.js 引入文件
import './code1/lifeCircle.js' 
```

### 跨组件信息传递

> 使用context.js ,创建一个对象,该对象提一个两个属性.Provider提供数据,Consumer消费数据
>
> 该api的好处就是可以跨组件传递消息,而且还可一定义命名空间, 方便我们定义不同的上下文

- 简单的上下文使用

```javascript
// 在code目录创建js文件,如下
// my-app/src/code/content.api.js

//这里是文件内容
import React, {Component} from 'react'
import {render} from 'react-dom'

// 创建一个上下文,并拿到对象提供的,Provider,Consumer属性
// 单个上下文
const {Provider, Consumer} = React.createContext()

// 父组件
class Parent extends Component{
    constructor () {
        super()
        this.state = {name: 'leo', age: 18, gender: '男'}
    }
    render () {
        return(
            // 定义数据 
            // 并且通过value将数据传递出去,value是不能改变的,写其他的无效
            <Provider value={this.state}>
            <div>
                parent <br />
                <Children></Children>
            </div>
            </Provider>
        )
    }
}

// 子组件
class Children extends Component{
    constructor () {
        super()
    }
    render () {
        return(
            // 消费数据
            // 这里消费数据,写法是通过一个方法,这个方法会接受一个value的传参数,
            // 就是上边我们定义数据是写的value
            <Consumer>
            {value => {
                 // 拿到数据 渲染到子组件
                console.log('value', value)
                return(<div>
                    Children: {value.name} <br />
                    <GrandSon></GrandSon>
                </div>)
            }}
            </Consumer>
        )
    }
}

// 孙子组件
class GrandSon extends Component{
    constructor () {
        super()
    }
    render () {
        return(
            <Consumer>
            {value => {
                return (
                    <div>
                        GrandSon: {value.age} <br />
                    </div>
                )
            }}
            
            </Consumer>
        )
    }
}
render(<Parent></Parent>, window.root)
       
 // my-app/src/index.js 引入文件
import './code1/context.api.js' 
```

- 多个上下文的写法

  > 我们先创建不同的上下文,然后使用的时候使用不同的上下文访问他的(Provider, Consumer) 属性,具体写法看下边的代码块

```javascript

const ParentContext = React.createContext()
const ChildrenContext = React.createContext()
// 父组件
class Parent extends Component{
    constructor () {
        super()
        this.state = {name: 'leo', age: 18, gender: '男'}
    }
    render () {
        return(
            // 定义数据 
            <ParentContext.Provider value={this.state}>
            <div>
                parent <br />
                <Children></Children>
            </div>
            </ParentContext.Provider>
        )
    }
}

// 儿子组件
class Children extends Component{
    constructor () {
        super()
    }
    render () {
        return(
            // 消费数据
            // 定义多个context
            <ChildrenContext.Provider value={{name: 'Perter'}}>
            <ParentContext.Consumer>
            {value => {
                console.log('value', value)
                return(<div>
                    Children: {value.name} <br />
                    <GrandSon></GrandSon>
                </div>)
            }}
            </ParentContext.Consumer>
            </ChildrenContext.Provider>
        )
    }
}
// 孙子组件
class GrandSon extends Component{
    constructor () {
        super()
    }
    render () {
        return(
            // 消费不同的Context
            <ChildrenContext.Consumer>
            {value => {
                return (
                    <div>
                        GrandSon: {value.name} <br />
                    </div>
                )
            }}
            
            </ChildrenContext.Consumer>
        )
    }
}

render(<Parent></Parent>, window.root)
```

### 总结

> 以上是简单的react语法,在index.js引用新文件的时候需要把引入别的文件的语句注释或者删除,然后方便看效果, 都是很简单的语法,没有高深的东西, 静静是做一个记录,方便自己回头查阅