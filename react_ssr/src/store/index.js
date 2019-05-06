import { createStore, applyMiddleware } from 'redux'
// import saga from 'redux-saga'
import logger from 'redux-logger'
import reducers from './reducers'
export function getServerStore () {
    return createStore(
        reducers,
        applyMiddleware(logger)
    )
}


export function getClientStore () {
    return createStore(
        reducers,
        applyMiddleware(logger)
    )
}