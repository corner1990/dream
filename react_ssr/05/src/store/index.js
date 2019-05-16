import { createStore, applyMiddleware } from 'redux'
// import saga from 'redux-saga'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
export function getServerStore () {
    return createStore(
        reducers,
        applyMiddleware(thunk, logger)
    )
}


export function getClientStore () {
    let initState = window.content.state
    return createStore(
        reducers,
        initState,
        applyMiddleware(thunk, logger)
    )
}