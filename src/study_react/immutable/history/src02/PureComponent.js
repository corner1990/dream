import React, { Component } from 'react';
import { is } from "immutable";
class PureComponent extends Component{
  shouldComponentUpdate (nextProps, nextState) {
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