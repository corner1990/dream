import React, { Component } from 'react'

export default function WithStyles (OriginalCompanent, styles) {
  class ProxyCompent extends Component {
    componentWillMount () {
      if (this.props.staticContext) {
        // 获取css
        this.props.staticContext.csses.props(styles._getCss())
      }
    }
    render () {
      return (<OriginalCompanent {...props} />)
    }
  }

  return ProxyCompent
}