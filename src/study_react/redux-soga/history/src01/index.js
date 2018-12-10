import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/counter'
import { Provider } from 'react-redux';
import store from './store'


ReactDOM.render(<Provider>
   <Counter store = {store}></Counter> 
</Provider>, document.getElementById('root'));

