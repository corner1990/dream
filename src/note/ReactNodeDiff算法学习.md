# React node diff算法学习

### 前言 

> 一直都知道node diff算法很火，最近刚好有时间，有机会出来学习一点点浅薄的知识，这里做一个简单的笔记 证明我学过。。。

### 学习环境搭建

- 使用`create-react-app` 初始化一个项目
- 删除src目录下所哟肚饿文件
- 自己新建一个index.js文件

### 第一步

> 创建Element对象

- index.js新增代码如如下

  ```javascript
  // 这个是虚拟dom要渲染的列表对象
  let vertualDom1 = createElement('ul', {class: 'list'}, [
      createElement('li', {class: 'item'}, ['a']),
      createElement('li', {class: 'item'}, ['b']),
      createElement('li', {class: 'item'}, ['c'])
  ])
  ```

- 再src目录下新建一个element.js文件

  - 该文件提供如下方法：create Element，render，renderDom

  - 首先实现createElement方法：

    ```javascript
    // 虚拟对象类
    export class Element {
        constructor (type, props, children) {
            this.type = type
            this.props = props
            this.children = children
        }
    }
    
    // 创建虚拟dom
    export const createElement = (type, props, children) => (new Element(type, props, children))
    ```

- 现在再index.js导入创建对象方法，实现 创建虚拟对象

  ```javascript
  // 这个是虚拟dom要渲染的列表对象
  let vertualDom1 = createElement('ul', {class: 'list'}, [
      createElement('li', {class: 'item'}, ['a']),
      createElement('li', {class: 'item'}, ['b']),
      createElement('li', {class: 'item'}, ['c'])
  ])
  console.log(vertualDom) //虚拟dom
  ```

### 第二步虚拟dom转化为真实dom

- 在element文件内实现render方法,以下是element.js内新增的内容

```javascript
/**
 * 
 * @param {Element dom} node dom元素
 * @param {string} key 
 * @param {*} val 
 */
function setAttr(node, key, value) {
    switch(key) {
        case 'value':
        // node是一个input或者textarea的时候直接设置value
        if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
            node.value = value
        } else {
            node.setAttribute(key, value)
        }
        break;
        case 'style':
            node.style.cssText = value
        break;
        default:
            node.setAttribute(key, value)
        break;
    }
}
// render 可以将vnode转化成真是dom
export const render = (elObj) => {
    let el = document.createElement(elObj.type)
    for (let key in elObj.props) {
        // 设置属性的方法
        setAttr(el, key, elObj.props[key])
    }
    // 处理子元素，如果是虚拟dom，继续渲染，如果不是，继续徐然
    elObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child)
        // 添加子元素到当前元素
        el.appendChild(child)
    });
    return el;
}
```

- 在index.js页面导入render方法，将虚拟dom转换为真实dom

```javascript
import { createElement, render } from './element'

let vertualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
])

let el = render(vertualDom1) // 虚拟dom转化为真实dom
console.log(el)
```

### 第三部，将真实dom渲染至页面

- element.js文件实现renderDom方法，进行dom渲染

  ```JavaScript
  // 新增如下代码
  export const renderDom = (el, target) => {
      target.appendChild(el)
  }
  ```

- index.js新增代码如下

  ```javascript
  import { createElement, render } from './element'
  
  let vertualDom1 = createElement('ul', {class: 'list'}, [
      createElement('li', {class: 'item'}, ['a']),
      createElement('li', {class: 'item'}, ['b']),
      createElement('li', {class: 'item'}, ['c'])
  ])
  
  let el = render(vertualDom1) // 虚拟dom转化为真实dom
  // console.log(el)
  
  // 渲染页面
  renderDom(el, window.root)
  ```

### 第四部，实现diff算法

> 为了方便处理。这里使用的是深度优先的遍历算法，然后可能变更的类型定义为不同类型，如：

- `const ATTRS = 'ATTRS'` 属性发生变化
- `const TEXT = 'TEXT'` 文本节点发生变化
- `const REMOVE = 'REMOVE'`节点被删除
- `const REPLACE = 'REPLACE'节点被替换`

```
							a
						 /    \
					    c      d
					  /  \    /  \
					 e   f    g   k
// 遍历的顺序如下：
start => a => c => e => f => d => g => k => end;
```

> 深度优先算法的简单步骤如下：
>
> 1.遍历a,发现又子节点，然后遍历a的子节点
>
> 2.遍历子节点c，发现c还有子节点，然后遍历c的子节点
>
> 3.发现c的子节点e没有子节点，遍历到了这里继续遍历e的兄弟节点
>
> 4.遍历e兄弟节点f，发现f没有子节点，也没有兄弟接节点，然后遍历c的兄弟节点d
>
> 5.遍历d的子节点g，发现没有节点了，然后遍历g兄弟节点k

- 在src下新建文件diff, 代码如下：

  ```javascript
  
  const ATTRS = 'ATTRS'
  const TEXT = 'TEXT'
  const REMOVE = 'REMOVE'
  const REPLACE = 'REPLACE'
  let Index = 0;
  
  function diff (oldTree, newTree) {
      let patches = {}
      let index = 0; // 为了避免index变化，使用唯一的下标
      walk(oldTree, newTree, Index, patches)
      return patches
  }
  
  // 子节点对比
  function diffChildren (oldChildren, newChildren, index, patches) {
      // 比较老的第一个和新的第一个
      oldChildren.forEach((child, idx) => {
          // 索引不应该是idx
          // index 每次调用都应该增加， 每次传递给walk的时候是递增的, 所有的人都基于一个index来实现
          // walk(child, newChildren[idx], ++index, patches)
          walk(child, newChildren[idx], ++Index, patches)
      });
  }
  
  // 属性对比
  function diffAttr (oldAttrs, newAttrs) {
      let patch = {}
      for (let key in oldAttrs) {
          if (oldAttrs[key] !== newAttrs[key]) {
              patch[key] = newAttrs[key] // 有可能是undefined
          }
      }
  
      // 判断是否有新增属性， （老街店没哟新节点的属性）
      for (let key in newAttrs) {
          if (!oldAttrs.hasOwnProperty(key)) {
              patch[key] = oldAttrs[key] 
          }
      }
      return patch
  }
  function isString (node) {
      return Object.prototype.toString.call(node) === '[object String]'
  }
  
  // 递归树 比较后的结果放入补丁包
  function walk (oldNode, newNode, index, patches) {
      let currentPatch = []
      if (!newNode) {
          currentPatch.push({type: REMOVE, index})
      } else
      // 文本节点是否变化
      if (isString(oldNode) && isString(newNode)) {
          if (oldNode !== newNode) {
              currentPatch.push({type: TEXT, text: newNode})
          }
      } else  if (oldNode.type === newNode.type) {
          // 比较属性是否有更改
          let attrs = diffAttr(oldNode.props, newNode.props)
          if (Object.keys(attrs).length > 0) {
              currentPatch.push({type: ATTRS, attrs})
          }
  
          // 如果有儿子节点， 遍历子节点
          diffChildren(oldNode.children, newNode.children, index, patches)
      } else if(newNode) {
          // 说明节点被替换了
          currentPatch.push({type: REPLACE, newNode})
      }
      // 当前补丁包中有改动，才在大的补丁包中保存不同之处
      if(currentPatch.length) {
          patches[index] = currentPatch
      }
  }
  
  
  
  export default diff
  ```

- index.js修改

> 新增虚拟dom，和老的dom进行匹配，拿到需要更新的补丁包

```javascript
import { createElement, render, renderDom } from './element'
import diff from './diff'

let vertualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
])
// 新增
let vertualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('div', {class: 'item'}, ['3'])
])

// console.log(vertualDom) //虚拟dom
let el = render(vertualDom1) // 虚拟dom转化为真实dom
// console.log(el)

// 渲染页面
renderDom(el, window.root)

// DOM Diff是比较两个虚拟DOM的区别， 比较两个对象的区别
// dom Diff的作用，根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom
let patchs = diff(vertualDom1, vertualDom2)
console.log(patchs)
// 打印内容大概如下
{0: Array(1), 2: Array(1), 5: Array(1)}
0: [{…}]
2: [{…}]
5: Array(1)
0:
newNode: Element
children: ["3"]
props: {class: "item"}
type: "div"
__proto__: Object
type: "REPLACE"
__proto__: Object
length: 1
__proto__: Array(0)
__proto__: Object
```

> 到了这里，就可以在控制台拿到需要更新的补丁包，是一个数组，里边保存的是需要改动的类型

### 第五步，实现更新dom

- 在src目录下新建patch.js文件，在这里我们进行打补丁

  > 思路还是和之前一样，对dom树行遍历，

```javascript
import { render, Element, setAttr } from './element'
let allPatchs;
let index = 0;
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'

function patch (node, patchs) {
    // 给某个元素打补丁
    allPatchs = patchs
    let index = 0; // 默认那个需要打补丁
    
    walk(node)
}

/**
 * 补丁包更新
 * @param {object} node 虚拟dom元素
 * @param {Array} patches 补丁包
 */
function doPatch (node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case ATTRS:
            for (let key in patches.attrs) {
                let val = patches.attrs
                if (val) { // 如果有属性的话重新复制
                    setAttr(node ,key , val)
                } else { // 如果为空的话删除属性
                    node.removeAttribute(key)
                }
            }
            break
            case TEXT:
            node.textContent = patch.text
            break
            case REMOVE:
            break
            case REPLACE:
                let newNode = (patch.newNode  instanceof Element) ?
                    render(patch.newNode) :
                    document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode, node)
            break
            default:
            break
        }
    })
}

/**
 * 
 * @param {object} node 需要对比的dom节点
 */
function walk (node) {
    // 拿到补丁
    let currentPatch = allPatchs[index++]
    // 拿到子节点，进行深度遍历
    let childNodes = node.childNodes
    childNodes.forEach(child => {
        walk(child)
    });
    // 如果有可用的补丁包吗直接打补丁
    if (currentPatch && currentPatch.length > 0) {
        doPatch(node, currentPatch)
    }
}
export default patch

```

- index.js引入path方法，更新dom

```javascript
import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'
let vertualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
])

let vertualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('div', {class: 'item'}, ['3'])
])

// console.log(vertualDom) //虚拟dom
let el = render(vertualDom1) // 虚拟dom转化为真实dom
// console.log(el)

// 渲染页面
renderDom(el, window.root)

// DOM Diff是比较两个虚拟DOM的区别， 比较两个对象的区别
// dom Diff的作用，根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom
let patchs = diff(vertualDom1, vertualDom2)
// console.log(patchs)

// 给元素打补丁,重新更是视图
patch(el, patchs)

// 如果平级元素有互换 那会导致重新渲染
// 新增节点也不会被更新
// index 实现换位置
```

### 最后

> 还有几个遗留问题：
>
> 1.如果平级元素有互换 那会导致重新渲染
>
> 2.新增节点也不会被更新
>
> 3.index 实现换位置
>
> 虽然还缺这么多，但是也算对node diff有一个简单的认识了，这些遗留的问题，以后再说，总有一天都会解决的