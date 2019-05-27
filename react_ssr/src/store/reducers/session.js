import * as types from '../action-types'

let initState = {
    user: null, // 当前登录庄户
    msg: null, // 消息
}

export default function (state = initState, action) {
    switch (action.type) {
        case types.SET_SESSION:
        return action.payload;
    default:
        return state;
    }
}