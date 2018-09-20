import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import Conuter from './components/Counter'
import Conuter2 from './components/Counter2'
import {Provider} from './react-redux'
ReactDOM.render(<Provider store={store}>
    <Conuter />
    <Conuter2 />
</Provider>, document.getElementById('root'));

