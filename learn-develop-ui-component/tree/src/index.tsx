import React from 'react'
import ReactDOM from 'react-dom'
import Tree from './components/tree'
import data from './components/data'

ReactDOM.render(<Tree data={data} />, document.querySelector('#root'))