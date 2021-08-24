import React from 'react'
import { TreeData } from '../typings'
import closedFolder from '../assets/icons/closed-folder.png'
import openedFolder from '../assets/icons/opened-folder.png'
import fileIcon from '../assets/icons/file.png'
interface Props {
  data: TreeData,
  onCollapse:(x: string) => void
  onChecked:(node:TreeData) => void
}
class TreeNode extends React.Component<Props>{
  constructor(props:Props) {
    super(props)
  }
  /**
   * @desc 切换选中状态
   */
  checked = () => {
    const { data, onChecked } = this.props
    // 调用父组件传递过来的函数
    onChecked(data)
  }
  render() {
    const {
      data: { name, children, key, collapsed, checked },
      onCollapse,
      onChecked 
    } = this.props
    let showChildren = false // 是否展示子节点
    let caret = null // 剪头
    let icon = null // 图标
    if (children) {// children 有值
      if (children.length) {
        caret = (<span
          className={`collapse ${collapsed? 'caret-right' : 'caret-down'}`}
          onClick={() => onCollapse(key)}
        >
        </span>)
        icon = openedFolder
      } else {
        caret = null
        icon = fileIcon
      }
      
    } else {// children 没有内容
      caret = (<span
        className="collapse caret-right"
        onClick={() => onCollapse(key)}
      >
        
      </span>)
      icon = closedFolder
    }

    return (<div className='tree-node'>
      <div className="inner">
        { caret }
        <div className="content">
          <input type="checkbox" checked={checked} onChange={this.checked} />
          <span>
            <img src={icon} alt="" style={{width: 20, verticalAlign: 'middle', marginRight: 4}} />
            {name}
          </span>
        </div>
      </div>
      {
        (!collapsed && Array.isArray(children) && children.length) ? <div className="children">
          {
            children.map((item:TreeData) => {
              return <TreeNode
                key={item.key}
                data={item}
                onCollapse={onCollapse}
                onChecked={onChecked}
              ></TreeNode>
            })
          }
        </div> : ''
      }
      
    </div>)
  }
}

export default TreeNode