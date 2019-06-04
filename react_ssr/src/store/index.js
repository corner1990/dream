import { createStore, applyMiddleware } from 'redux'
// import saga from 'redux-saga'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
import clientRequest from '../client/request'
import createServerRequest from '../server/request'

// 添加req参数
export function getServerStore (ctx) {
    return createStore(
        reducers,
        applyMiddleware(thunk.withExtraArgument(createServerRequest(ctx)), logger)
    )
}

export function getClientStore () {
    let initState = window.content.state
    return createStore(
        reducers,
        initState,
        applyMiddleware(thunk.withExtraArgument(clientRequest), logger)
    )
}