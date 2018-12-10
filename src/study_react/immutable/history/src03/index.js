// import React,{Component, PureComponent} from 'react';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import {Provider} from 'react-redux'
import Counter from './Counter'

ReactDOM.render(<Provider store={store}>
  <Counter />
</Provider>, document.getElementById('root'));

