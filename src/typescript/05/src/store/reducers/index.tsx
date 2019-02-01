import { Store } from '../types'
import { Action } from '../actions/counter'
import * as types from '../action-types'
let initState:Store = {number: 0}


export default function (state:Store = initState, action:Action) {
    switch (action.type) {
        case types.INCREMENT:
            return {number: state.number + 1}
        case types.DECREMENT:
            return { number: state.number - 1 }
        default:
            return state
    }
}