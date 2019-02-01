import * as React from 'react'
import * as ReactDom from 'react-dom'
import Counter from './compontents/Counter.tsx'
import { Provider } from 'react-redux'
import store from './store'

ReactDom.render((
    <Provider store={store}>
        <Counter name="计数器"/>
    </Provider>
), document.getElementById('root'))
