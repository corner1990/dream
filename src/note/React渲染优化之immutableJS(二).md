# React渲染优化之immutableJS(二)

> 在上一节实现了简单的性能优化，但是因为需要一次深拷贝和属性对比，性能还是不好，遂这里使用Facebook大神写的immutable.js进行进一步优化

### `immutable.js`  JavaScript的不可变集合

> 每次修改都会返回一个新的对象，上一个对象始终会保持在哪里，他提供一些常用的数据类型， 供我们使用，常见的数据类型如下：

- `List`：有序索引集，类似于 JavaScript 中的 `Array`。
-  `Map`：类似于 JavaScript 中的 `Object`。 

> 这里只展示两个最常用的数据类型，想知道更多的类型，可以去[immutabl官网](https://facebook.github.io/immutable-js/) 查看

- 简单的做法

```javascript
let immutable = require('immutable')
let {Map, List} = immutable


let obj1 = Map({name: 'leo', age: 12)
console.log(obj1) // Map { "name": "leo", "age": 12 }
                
let obj2 = obj1.set('name', 'hello')
// 简单的用法， 返回的对象和之前的对象是不一样的，以下案例为证
console.log(obj2) // Map { "name": "hello", "age": 12 }
console.log(obj1 === obj2) // false

```

- 属性会共享

```javascript
let immutable = require('immutable')
let {Map, List, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')

// 属性会共享
console.log(obj1.home === obj2.home) // true
// 获取对象的属性数量
console.log(obj1.size) // 3
console.log(obj1.count()) // 3
```




- map的痛点

> 虽然map很好用，但是map只能执行一层，我们对2级更新属性会报错，需要是使用fromjs来处理对象
>
> 设置值 一层使用set，多层使用setIn
>
> /取值：一层使用get，多层使用getIN

```javascript
let immutable = require('immutable')
let {Map, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')
let obj3 = obj1.setIn(['home', 'name'], 'new Name')

console.log(obj3) // Map { "name": "leo", "age": 12, "home": Map { "name": "new Name" } }
console.log(obj3.getIn(['home', 'name'])) // new Name
```

- 跟新值，update

```javascript
let immutable = require('immutable')
let {Map, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')
let obj3 = obj1.setIn(['home', 'name'], 'new Name')
let obj4 = obj3.update('age', val => val + 1)

console.log(obj3) // Map { "name": "leo", "age": 12, "home": Map { "name": "new Name" } }
console.log(obj3.getIn(['home', 'name'])) // new Name
console.log(obj4) // Map { "name": "leo", "age": 13, "home": Map { "name": "new Name" } }

```

- 删除某个属性

```javascript
let immutable = require('immutable')
let {Map, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')
let obj3 = obj1.setIn(['home', 'name'], 'new Name')
let obj4 = obj3.update('age', val => val + 1)
let obj5 = obj4.delete('age')

console.log(obj5) // Map { "name": "leo", "home": Map { "name": "new Name" } }
```

- 清空对象

```javascript
let immutable = require('immutable')
let {Map, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')
let obj3 = obj1.setIn(['home', 'name'], 'new Name')
let obj4 = obj3.update('age', val => val + 1)
let obj5 = obj4.delete('age')
let obj6 = obj4.clear()

console.log(obj6) // Map {}
```

- 合并对象 merge

```javascript
let immutable = require('immutable')
let {Map, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')
let obj3 = obj1.setIn(['home', 'name'], 'new Name')
let obj4 = obj3.update('age', val => val + 1)
let obj5 = obj4.delete('age')
let obj6 = obj4.clear()
let obj7 = obj6.merge({name: 'world', gender: 'man'})

console.log(obj7) // Map { "name": "world", "gender": "man" }
```

- 类型转换

```javascript
let immutable = require('immutable')
let {Map, fromJS} = immutable

let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })
let obj2 = obj1.set('name', 'hello')
let obj3 = obj1.setIn(['home', 'name'], 'new Name')
let obj4 = obj3.update('age', val => val + 1)
let obj5 = obj4.delete('age')
let obj6 = obj4.clear()
let obj7 = obj6.merge({name: 'world', gender: 'man'})

console.log(obj7.toJS()) // { name: 'world', gender: 'man' }
console.log(obj7.toJSON()) // { name: 'world', gender: 'man' }
console.log(obj7.toObject()) // { name: 'world', gender: 'man' }
```

### `immutable.js list`数据类型的简单使用

> 操作方法和数组类似

```javascript
let immutable = require('immutable')
let { Map, List, fromJS } = immutable

let arr1 = List([1, 2, 3])
let arr2 = arr1.push(4)
let arr3 = arr2.pop()
let arr4 = arr3.map(item => item * 2)
let arr5 = arr4.filter(item => item < 5)

console.log(arr5) // List [ 2, 4 ]

let arr6 = arr5.update(1, val => val * 100)
console.log(arr6)  // List [ 2, 400 ]

let arr7 = arr6.delete(0)
console.log(arr7) // List [ 400 ]

let arr8 = arr7.push(12)
console.log(arr8) // List [ 400, 12 ]

let arr9 = arr8.last()
console.log(arr9) // 12

```

### `immutable.js` 对比方法

```javascript
let {is, Map} = require('immutable')
let obj1 = Map({name: 'hello', age: 12})
let obj2 = Map({name: 'hello', age: 12})

console.log(Object.is(obj1, obj2)) // false
// immutable的is方法比较的是值
console.log(is(obj1, obj2)) // true
```



### `PureComponent`组件修改

```javascript
import React, { Component } from 'react';
import { is } from "immutable";
class PureComponent extends Component{
  shouldComponentUpdate (nextProps, nextState) {
    // return !_.isEqual(nextState, this.state) 删除这一行
    // 拿到新老状态， 在后边进行比对
    let oldState = this.state || {}
    let newState = nextState ? nextState : {}
    // 如果属性键不同，直接更新页面
    let keys = Object.keys(newState)
    if (Object.keys(oldState).length !== keys.length) return true;
    for (var i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      // 如果说属性值不一样，说明需要更新状态
      if(!is(newState[key], oldState[key])) return true
    }
    return false
  }

}

export default PureComponent
```

### `index.js`组件修改

```javascript
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PureComponent from './PureComponent';
import _ from 'lodash'
let immutable = require('immutable')
let { Map, List, fromJS } = immutable
// PureComponent 组件优化的原理是重写了shouldComponentUpdate，如果说老的状态对象昂和新的状态对戏那个不是一个对戏那个的话才会刷新页面
/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
class Counter extends PureComponent{
  state = {
    counter: Map({ number: 0})
  }
  handleClick = event => {
    // 优化的深拷贝，实现了节约内存
    // let state = _.cloneDeep(this.state) 删除此行
    let amount = this.amount.value ? Number(this.amount.value) : 0
    // 新增下边这个状态
    let newState = { ...this.state, counter: this.state.counter.update('number', val => val + amount)}

    this.setState(newState)
  }
  render () {
    console.log('render')
    return (
      <div>
        <p>{this.state.counter.get('number')}</p>
        <input ref={input => this.amount = input}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'));
```

### 总结

> 通过简单的处理，就会很大程度的提高性能解决