import React from 'react'
import { TreeData } from '../typings';
import data from './data';
import './index.less'
import TreeNode from './tree-node'
// 限制this.props
interface Props {
  data: TreeData
}
// 组件状态
interface State {
  data: TreeData
}
interface KeyNodeMap {
  [key:string]: TreeData
}
class Tree extends React.Component<Props, State>{
  keyNodeMap!: KeyNodeMap;
  constructor(props:Props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }
  componentDidMount() {
    this.buildKeyMap()
  }
  /**
   * @desc 构建key
   */
  buildKeyMap = () => {
    let data = this.state.data
    this.keyNodeMap = {}
    this.keyNodeMap[data.key] = data // 保存根节点
    // 遍历子节点
    if (data.children && data.children.length) {
      this.walk(data.children, data)
    }
    this.setState({
      data: this.state.data
    })
  }
  /**
   * @desc 递归处理子节点
   * @param children 
   * @param parent 
   */
  walk = (children:TreeData[], parent:TreeData):void => {
    children.forEach(node => {
      this.keyNodeMap[node.key] = node // 保存根节点
      node.parent = parent
      if (node.children && node.children.length) {
        this.walk(node.children, node)
      }
    })
  }
  /**
   * @desc 展开折叠
   */
  onCollapse = (key:string) => {
    let info = this.keyNodeMap[key]
    if (info) {
      info.collapsed = !info.collapsed
      info.children = info.children || [] // 处理懒加载
    }
    this.buildKeyMap()
  }
  /**
   * @desc 选择
   */
  onChecked = (node:TreeData) => {
    node.checked = !node.checked
    /**
     * @desc 处理所有子节点的选中状态
     */
    this.childrenChecked(node, node.checked)
    this.parentChecked(node)
    this.setState({
      data: this.state.data
    })
  }
  /**
   * @desc 修改所有子节点的选中状态
   * @param node 当前node节点
   * @param checked 当前节点的状态
   */
  childrenChecked = (node:TreeData, checked:boolean) => {
    if (Array.isArray(node.children)) {
      // 处理子节点
      node.children.forEach(item => {
        item.checked = checked
        // 检查是否还有子节点，递归处理
        if (Array.isArray(item.children)){
          this.childrenChecked(item, checked)
        }
      })
    }
  }
  /**
   * @desc 修改所有子节点的选中状态
   * @param node 当前node节点
   * @param checked 当前节点的状态
   */
   parentChecked = (node:TreeData) => {
    
    if (node.parent) {
      let parent:TreeData = node.parent
      // 处理子节点
      parent.checked = parent.children?.every(item => item.checked)
      if (parent.parent) {
        /**
         * @des 递归处理父亲节点
         */
        this.parentChecked(parent)
      }
    }
  }
  render() {
    return (<div className='tree-wrap'>
      <div className="tree-nodes">
        <TreeNode
          data={this.props.data}
          onCollapse={this.onCollapse}
          onChecked={this.onChecked}
        />
      </div>
    </div>)
  }
}

export default Tree;