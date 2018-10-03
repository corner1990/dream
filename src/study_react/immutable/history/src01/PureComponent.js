import React, { Component } from 'react';
import _ from 'lodash'
class PureComponent extends Component{
  shouldComponentUpdate (nextProps, nextState) {
    return !_.isEqual(nextState, this.state)
  }

}

export default PureComponent