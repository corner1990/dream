import React, {Component} from 'react'
import dva, { connect} from 'dva';
import { Router, Route, Switch, Link } from 'dva/router';

let todos = [
  {id: 1, text: '1', completed: false},
  {id: 2, text: '2', completed: true},
]
let api = {
  load () {// 加载数据
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(todos)
      }, 1000);
    })
  },
  toggle (id) {// 切换展示
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo
        })
        resolve(todos)
      }, 1000);
    })
  },
  add (todo) {// 添加item
    return new Promise(resolve => {
      // 创建新的数据
      let newTodo = {
        ...todo,
        completed: false,
        id: (todos[todos.length - 1].id - 0 + 1)
      }
      // 完成数据重组
      todos = [...todos, newTodo ]
      resolve(todos)
    })
  },
  changeFilter (filterText) { // 过滤展示
    return new Promise(resolve => {
      let newTodos = null
      switch (filterText) {
        case 'completed':
          newTodos = todos.filter(item => item.completed)
          break;
        case 'uncompleted':
          newTodos = todos.filter(item => !item.completed)
          break
        default:
          newTodos = todos
          break;
      }
      resolve(newTodos)
    })

  },
  delete (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        todos = todos.filter(item => item.id !== id)
        resolve(todos)
      }, 1000);
    })
  }
}
// 1. Initialize
const app = dva();

// 2. Model
// Remove the comment and define your model.
app.model({
  namespace: 'todos',
  state: {
    list: [], // todo的数组
    filter: 'all', // 过滤的类型
  },
  reducers: {
    loaded (state, {paylaod: list}) {
      return {
        ...state,
        list
      }
    },
    changeFilterList(state, { paylaod: { list, filter}}) {
      return {
        ...state,
        list, 
        filter
      }
    }
  },
  effects: {
    *load (action, {call, put}) {
      // 请求数据
      let list = yield call(api.load)
      // 派发数据
      yield put({ type: 'loaded', paylaod: list})
    },
    // 切换id对应的状态
    *toggle ({id}, {call, put}) {
      // 不接收返回值的写法
      // yield call(api.toggle, id)
      // put({tyep: 'load'})
      // 接收返回值的写法
      let list = yield call(api.toggle, id)
      // 派发数据
      yield put({ type: 'loaded', paylaod: list })
    },
    // 模拟接口，添加数据
    *add ({todo}, {call, put}) {
      // 请求数据
      let list = yield call(api.add, todo)
      // 派发数据
      yield put({ type: 'loaded', paylaod: list})
    },
    // 修改可见状态
    *changeFilter({filter}, {call, put}) {
      let list = yield call(api.changeFilter, filter)
      // 派发数据
      yield put({ type: 'changeFilterList', paylaod: { list, filter} })
    },
    // 切换id对应的状态
    *delete({ id }, { call, put }) {
      // 接收返回值的写法
      let list = yield call(api.delete, id)
      // 派发数据
      yield put({ type: 'loaded', paylaod: list })
    },
  },
  // 订阅 在这里我们监听url变化，当切换到todos的时候，调用后台接口异步渲染数据
  subscriptions: {
    // history 操作历史，dispatch派发动作
    steup ({history, dispatch}) {
      // 当路径发生变化的时候回调用这里，并在回调函数内传入一个location对象
      history.listen(({pathname}) => {
        if (pathname === '/todos') {
          // 如果要异步执行任务的话肯定要把动作派发给effects， 
          dispatch({type: 'load'})
        }
      })
    }
  }
});

// 3. Router
const HomePage = () => <div>Hello Dva.</div>;
class Todos extends Component {
  render(){
    let { list, toggle, add, changeFilter, del} = this.props
    return (
      <div>
        <h3>todoList</h3>
        <input type="text" ref={input => this.text = input}/><button onClick={() => {
          add(this.text.value)
          this.text.value = ''
        }}>add</button>
        <ul>
          {
            list.map(item => {
              return (
                <li key={item.id} >
                  <input type="checkbox"
                    checked={item.completed}
                    onChange={() => {
                      toggle(item.id)
                    }} />
                  {item.text}
                  &emsp;<button onClick={() => {
                    del(item.id)
                  }}>del</button>
                </li>
              )
            })
          }
        </ul>
        <div>
          <button onClick={() => changeFilter('all')}>全部</button>
          <button onClick={() => changeFilter('completed')}>已完成</button>
          <button onClick={() => changeFilter('uncompleted')}>未完成</button>
        </div>
      </div>
    )
  }
}

// 动作
let actions = {
  toggle (id) {// 切换状态
    return { type: 'todos/toggle', id}
  },
  add (text) { // 添加项目
    return { type: 'todos/add', todo: {text}}
  },
  changeFilter (filter) {// 过滤展示
    return { type: 'todos/changeFilter', filter}
  },
  del(id) {// 删除元素
    return { type: 'todos/delete', id }
  },
}

let WrapTodos = connect(
  state => ({...state.todos}),
  actions
)(Todos)

app.router(({ history }) =>
  <Router history={history}>
    <div>
      <Link to="/">home</Link>&emsp;
      <Link to="/todos">todos</Link>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/todos" exact component={WrapTodos} />
      </Switch>
    </div>
  </Router>
);

// 4. Start
app.start('#root');
