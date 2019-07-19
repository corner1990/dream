# react常见面试题

### **什么是 React**

React是一个简单的javascript UI库，用于构建高效、快速的用户界面。它是一个轻量级库，因此很受欢迎。它遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效。它使用虚拟DOM来有效地操作DOM。它遵循从高阶组件到低阶组件的单向数据流。



### **React 与 Angular 有何不同？**

Angular是一个成熟的MVC框架，带有很多特定的特性，比如服务、指令、模板、模块、解析器等等。React是一个非常轻量级的库，它只关注MVC的视图部分。

Angular遵循两个方向的数据流，而React遵循从上到下的单向数据流。React在开发特性时给了开发人员很大的自由，例如，调用API的方式、路由等等。我们不需要包括路由器库，除非我们需要它在我们的项目。

### **什么是Virtual DOM及其工作原理**

React 使用 Virtual DOM 来更新真正的 DOM，从而提高效率和速度。 我们来详细讨论这些。

### **什么是 JSX**

JSX是javascript的语法扩展。它就像一个拥有javascript全部功能的模板语言。它生成React元素，这些元素将在DOM中呈现。React建议在组件使用JSX。在JSX中，我们结合了javascript和HTML，并生成了可以在DOM中呈现的react元素。

```react
import React from 'react';
​
export const Header = () => {
​
    const heading = 'TODO App'
​
    return(
        <div style={{backgroundColor:'orange'}}>
            <h1>{heading}</h1>
        </div>
    )
}
```

### **组件和不同类型**

React 中一切都是组件。 我们通常将应用程序的整个逻辑分解为小的单个部分。 我们将每个单独的部分称为组件。 通常，组件是一个javascript函数，它接受输入，处理它并返回在UI中呈现的React元素。



### **函数/无状态/展示组件**

函数或无状态组件是一个纯函数，它可接受接受参数，并返回react元素。这些都是没有任何副作用的纯函数。这些组件没有状态或生命周期方法，这里有一个例子。

```react
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
​
export const Header = () => {
    return(
        <Jumbotron style={{backgroundColor:'orange'}}>
            <h1>TODO App</h1>
        </Jumbotron>
    )
}
​
```



### **类/有状态组件**

类或有状态组件具有状态和生命周期方可能通过`setState()`方法更改组件的状态。类组件是通过扩展React创建的。它在构造函数中初始化，也可能有子组件,这里有一个例子。

```react
import React from 'react';
import '../App.css';
import { ToDoForm } from './todoform';
import { ToDolist } from './todolist';
​
export class Dashboard extends React.Component {
​
  constructor(props){
    super(props);
​
    this.state = {
​
    }
  }
  
  render() {
    return (
      <div className="dashboard"> 
          <ToDoForm />
          <ToDolist />
      </div>
    );
  }
}
```



### **受控组件**

受控组件是在 React 中处理输入表单的一种技术。表单元素通常维护它们自己的状态，而react则在组件的状态属性中维护状态。我们可以将两者结合起来控制输入表单。这称为受控组件。因此，在受控组件表单中，数据由React组件处理。

这里有一个例子。当用户在 todo 项中输入名称时，调用一个javascript函数`handleChange`捕捉每个输入的数据并将其放入状态，这样就在 `handleSubmit`中的使用数据。

```react
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
​
export class ToDoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
          <div className="todoform">
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    <span className="item">Item</span>
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" placeholder="Todo Item" />
                    </Col>
                    <Col sm={5}>
                        <Button variant="primary" type="submit">Add</Button>
                    </Col>
                </Form.Group>
            </Form>
         </div>
      );
    }
  }
```



### **非受控组件**

大多数情况下，建议使用受控组件。有一种称为非受控组件的方法可以通过使用`Ref`来处理表单数据。在非受控组件中，`Ref`用于直接从`DOM`访问表单值，而不是事件处理程序。

```react
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
​
export class ToDoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.input = React.createRef();
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.input.current.value);
      event.preventDefault();
    }
  
    render() {
      return (
          <div className="todoform">
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    <span className="item">Item</span>
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" placeholder="Todo Item" ref={this.input}/>
                    </Col>
                    <Col sm={5}>
                        <Button variant="primary" onClick={this.handleSubmit} type="submit">Add</Button>
                    </Col>
                </Form.Group>
            </Form>
         </div>
      );
    }
  }
```

### **容器组件**

容器组件是处理获取数据、订阅 redux 存储等的组件。它们包含展示组件和其他容器组件，但是里面从来没有html。

### **高阶组件**

高阶组件是将组件作为参数并生成另一个组件的组件。 Redux `connect`是高阶组件的示例。 这是一种用于生成可重用组件的强大技术。

### **Props 和 State**

**Props** 是只读属性，传递给组件以呈现UI和状态，我们可以随时间更改组件的输出。

下面是一个类组件的示例，它在构造函数中定义了`props`和`state`，每当使用`this.setState()`修改状态时，将再次调用 `render( )` 函数来更改UI中组件的输出。

**什么是 Props?**
Props 是 React 中属性的简写。它们是只读组件，必须保持纯，即不可变。它们总是在整个应用中从父组件传递到子组件。子组件永远不能将 prop 送回父组件。这有助于维护单向数据流，通常用于呈现动态生成的数据。

```react
import React from 'react';
import '../App.css';
​
export class Dashboard extends React.Component {
​
  constructor(props){
    super(props);
​
    this.state = {
        name: "some name"
    }
  }
​
  render() {
​
    // reading state
    const name = this.state.name;
​
    //reading props
    const address = this.props.address;
​
    return (
      <div className="dashboard"> 
          {name}
          {address}
      </div>
    );
  }
}
```



### **什么是PropTypes**

随着时间的推移，应用程序会变得越来越大，因此类型检查非常重要。`PropTypes`为组件提供类型检查，并为其他开发人员提供很好的文档。如果react项目不使用 Typescript，建议为组件添加 `PropTypes`。

```react
import React from 'react';
import PropTypes from 'prop-types';
​
export const UserDisplay = ({name, address, age}) => {
​
    UserDisplay.defaultProps = {
        name: 'myname',
        age: 100,
        address: "0000 onestreet"
    };
​
    return (
        <>
            <div>
                <div class="label">Name:</div>
                <div>{name}</div>
            </div>
            <div>
                <div class="label">Address:</div>
                <div>{address}</div>
            </div>
            <div>
                <div class="label">Age:</div>
                <div>{age}</div>
            </div>
        </>
    )
}
​
UserDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.objectOf(PropTypes.string),
    age: PropTypes.number.isRequired
}
```

### **组件生命周期方法**

组件在进入和离开DOM时要经历一系列生命周期方法，下面是这些生命周期方法。

### **componentWillMount()**

在渲染前调用,在客户端也在服务端，它只发生一次。

### **componentDidMount()**

在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过`this.getDOMNode()`来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用`setTimeout`, `setInterval`或者发送AJAX请求等操作(防止异部操作阻塞UI)。

### **componentWillReceiveProps()**

在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

### **shouldComponentUpdate()**

返回一个布尔值。在组件接收到新的`props`或者`state`时被调用。在初始化时或者使用`forceUpdate`时不被调用。 可以在你确认不需要更新组件时使用。

### **componentWillUpdate()**

在组件接收到新的`props`或者`state`但还没有`render`时被调用。在初始化时不会被调用。

### **componentDidUpdate()**

在组件完成更新后立即调用。在初始化时不会被调用。

### **componentWillUnMount()**

件从 DOM 中移除的时候立刻被调用。

### **getDerivedStateFromError()**

这个生命周期方法在**ErrorBoundary**类中使用。实际上，如果使用这个生命周期方法，任何类都会变成`ErrorBoundary`。这用于在组件树中出现错误时呈现回退UI，而不是在屏幕上显示一些奇怪的错误。

### **componentDidCatch()**

这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时记录错误。



**详细解释 React 组件的生命周期方法。**
一些最重要的生命周期方法是：
componentWillMount() – 在渲染之前执行，在客户端和服务器端都会执行。
componentDidMount() – 仅在第一次渲染后在客户端执行。
componentWillReceiveProps() – 当从父类接收到 props 并且在调用另一个渲染器之前调用。
shouldComponentUpdate() – 根据特定条件返回 true 或 false。如果你希望更新组件，请返回true 否则返回 false。默认情况下，它返回 false。
componentWillUpdate() – 在 DOM 中进行渲染之前调用。
componentDidUpdate() – 在渲染发生后立即调用。
componentWillUnmount() – 从 DOM 卸载组件后调用。用于清理内存空间。

### **超越继承的组合**

在React中，我们总是使用组合而不是继承。我们已经在函数式编程部分讨论了什么是组合。这是一种结合简单的可重用函数来生成高阶组件的技术。

```react
import React from 'react';
import '../App.css';
import { ToDoForm } from './todoform';
import { ToDolist } from './todolist';
​
export class Dashboard extends React.Component {
​
  render() {
    return (
      <div className="dashboard"> 
          <ToDoForm />
          <ToDolist />
      </div>
    );
  }
}
```



### **什么是Redux及其工作原理**

Redux 是 React的一个状态管理库，它基于flux。 Redux简化了React中的单向数据流。 Redux将状态管理完全从React中抽象出来。

### **它是如何工作的**

在React中，组件连接到 redux ，如果要访问 redux，需要派出一个包含 `id`和负载(payload) 的 `action`。action 中的 `payload` 是可选的，action 将其转发给 Reducer。

当`reducer`收到`action`时，通过 `swithc...case` 语法比较 `action` 中`type`。 匹配时，更新对应的内容返回新的 `state`。

当`Redux`状态更改时，连接到`Redux`的组件将接收新的状态作为`props`。当组件接收到这些`props`时，它将进入更新阶段并重新渲染 UI。

**你了解 Virtual DOM 吗？解释一下它的工作原理。**
Virtual DOM 是一个轻量级的 JavaScript 对象，它最初只是 real DOM 的副本。它是一个节点树，它将元素、它们的属性和内容作为对象及其属性。 React 的渲染函数从 React 组件中创建一个节点树。然后它响应数据模型中的变化来更新该树，该变化是由用户或系统完成的各种动作引起的。
Virtual DOM 工作过程有三个简单的步骤。
Virtual DOM 是一个轻量级的 JavaScript 对象，它最初只是 real DOM 的副本。它是一个节点树，它将元素、它们的属性和内容作为对象及其属性。 React 的渲染函数从 React 组件中创建一个节点树。然后它响应数据模型中的变化来更新该树，该变化是由用户或系统完成的各种动作引起的。
Virtual DOM 工作过程有三个简单的步骤。
每当底层数据发生改变时，整个 UI 都将在 Virtual DOM 描述中重新渲染。

**你怎样理解“在React中，一切都是组件”这句话。**
组件是 React 应用 UI 的构建块。这些组件将整个 UI 分成小的独立并可重用的部分。每个组件彼此独立，而不会影响 UI 的其余部分。

 **怎样解释 React 中 render() 的目的。**
每个React组件强制要求必须有一个 render()。它返回一个 React 元素，是原生 DOM 组件的表示。如果需要渲染多个 HTML 元素，则必须将它们组合在一个封闭标记内，例如 <form>、<group>、<div> 等。此函数必须保持纯净，即必须每次调用时都返回相同的结果。

**React组件生命周期的阶段是什么？**
React 组件的生命周期有三个不同的阶段：
初始渲染阶段：这是组件即将开始其生命之旅并进入 DOM 的阶段。
更新阶段：一旦组件被添加到 DOM，它只有在 prop 或状态发生变化时才可能更新和重新渲染。这些只发生在这个阶段。
卸载阶段：这是组件生命周期的最后阶段，组件被销毁并从 DOM 中删除。



 **什么是高阶组件（HOC）？**
高阶组件是重用组件逻辑的高级方法，是一种源于 React 的组件模式。 HOC 是自定义组件，在它之内包含另一个组件。它们可以接受子组件提供的任何动态，但不会修改或复制其输入组件中的任何行为。你可以认为 HOC 是“纯（Pure）”组件。

**你能用HOC做什么？**
HOC可用于许多任务，例如：
代码重用，逻辑和引导抽象
渲染劫持
状态抽象和控制
Props 控制



**React 中 key 的重要性是什么？**
key 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。它们通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。这些 key 必须是唯一的数字或字符串，React 只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。
React Redux



**MVC框架的主要问题是什么？**
以下是MVC框架的一些主要问题：
对 DOM 操作的代价非常高
程序运行缓慢且效率低下
内存浪费严重
由于循环依赖性，组件模型需要围绕 models 和 views 进行创建

 **解释一下 Flux**

Flux 是一种强制单向数据流的架构模式。它控制派生数据，并使用具有所有数据权限的中心 store 实现多个组件之间的通信。整个应用中的数据更新必须只能在此处进行。 Flux 为应用提供稳定性并减少运行时的错误。

![img](https://pic3.zhimg.com/v2-8225175c16a474649690d62b4da9ba02_b.jpg)

**. 什么是Redux？**
Redux 是当今最热门的前端开发库之一。它是 JavaScript 程序的可预测状态容器，用于整个应用的状态管理。使用 Redux 开发的应用易于测试，可以在不同环境中运行，并显示一致的行为。
**37. Redux遵循的三个原则是什么？**
单一事实来源：整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
状态是只读的：改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。
使用纯函数进行更改：为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。



![img](https://pic1.zhimg.com/v2-6740f0837cb0d95408f8c3a70fc37c30_b.jpg)



**你对“单一事实来源”有什么理解？**
Redux 使用 “Store” 将程序的整个状态存储在同一个地方。因此所有组件的状态都存储在 Store 中，并且它们从 Store 本身接收更新。单一状态树可以更容易地跟踪随时间的变化，并调试或检查程序。

**列出 Redux 的组件。**
Redux 由以下组件组成：
Action – 这是一个用来描述发生了什么事情的对象。
Reducer – 这是一个确定状态将如何变化的地方。
Store – 整个程序的状态/对象树保存在Store中。
View – 只显示 Store 提供的数据。

**数据如何通过 Redux 流动？**

![preview](https://pic2.zhimg.com/v2-d67b5883b72a5664eef1f3d950b056bd_r.jpg)

作者：九叶子

链接：https://zhuanlan.zhihu.com/p/68935356

来源：知乎

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

**如何在 Redux 中定义 Action？**
React 中的 Action 必须具有 type 属性，该属性指示正在执行的 ACTION 的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在 Redux 中，action 被名为 Action Creators 的函数所创建。以下是 Action 和Action Creator 的示例：
function addTodo(text) {        return {                 type: ADD_TODO,                      text     } }
**42. 解释 Reducer 的作用。**
Reducers 是纯函数，它规定应用程序的状态怎样因响应 ACTION 而改变。Reducers 通过接受先前的状态和 action 来工作，然后它返回一个新的状态。它根据操作的类型确定需要执行哪种更新，然后返回新的值。如果不需要完成任务，它会返回原来的状态。
**43. Store 在 Redux 中的意义是什么？**
Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。
**44. Redux与Flux有何不同？**



![img](https://pic3.zhimg.com/v2-491f24e0ee9f6a371759e6bc76add59e_b.jpg)

45. Redux 有哪些优点？
Redux 的优点如下：
结果的可预测性 - 由于总是存在一个真实来源，即 store ，因此不存在如何将当前状态与动作和应用的其他部分同步的问题。
可维护性 - 代码变得更容易维护，具有可预测的结果和严格的结构。
服务器端渲染 - 你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验。
开发人员工具 - 从操作到状态更改，开发人员可以实时跟踪应用中发生的所有事情。
社区和生态系统 - Redux 背后有一个巨大的社区，这使得它更加迷人。一个由才华横溢的人组成的大型社区为库的改进做出了贡献，并开发了各种应用。
易于测试 - Redux 的代码主要是小巧、纯粹和独立的功能。这使代码可测试且独立。
组织 - Redux 准确地说明了代码的组织方式，这使得代码在团队使用时更加一致和简单。
React 路由
46. 什么是React 路由？
React 路由是一个构建在 React 之上的强大的路由库，它有助于向应用程序添加新的屏幕和流。这使 URL 与网页上显示的数据保持同步。它负责维护标准化的结构和行为，并用于开发单页 Web 应用。 React 路由有一个简单的API。
47. 为什么React Router v4中使用 switch 关键字 ？
虽然 <div> 用于封装 Router 中的多个路由，当你想要仅显示要在多个定义的路线中呈现的单个路线时，可以使用 “switch” 关键字。使用时，<switch> 标记会按顺序将已定义的 URL 与已定义的路由进行匹配。找到第一个匹配项后，它将渲染指定的路径。从而绕过其它路线。
48. 为什么需要 React 中的路由？
Router 用于定义多个路由，当用户定义特定的 URL 时，如果此 URL 与 Router 内定义的任何 “路由” 的路径匹配，则用户将重定向到该特定路由。所以基本上我们需要在自己的应用中添加一个 Router 库，允许创建多个路由，每个路由都会向我们提供一个独特的视图
<switch> <route exact path=’/’ component={Home}/> <route path=’/posts/:id’ component={Newpost}/> <route path=’/posts’ component={Post}/> </switch>
49. 列出 React Router 的优点。
几个优点是：
就像 React 基于组件一样，在 React Router v4 中，API 是 'All About Components'。可以将 Router 可视化为单个根组件（<BrowserRouter>），其中我们将特定的子路由（<route>）包起来。
无需手动设置历史值：在 React Router v4 中，我们要做的就是将路由包装在 <BrowserRouter> 组件中。
包是分开的：共有三个包，分别用于 Web、Native 和 Core。这使我们应用更加紧凑。基于类似的编码风格很容易进行切换。
50. React Router与常规路由有何不同？

![img](https://pic3.zhimg.com/v2-d67b7f912ce485d1307ae24b28a4dcf2_b.jpg)

### 什么是函数式编程

函数式编程是声明式编程的一部分。javascript中的函数是第一类公民，这意味着函数是数据，你可以像保存变量一样在应用程序中保存、检索和传递这些函数。

函数式编程有些核心的概念，如下：

- 不可变性(Immutability)
- 纯函数(Pure Functions)
- 数据转换(Data Transformations)
- 高阶函数 (Higher-Order Functions)
- 递归
- 组合