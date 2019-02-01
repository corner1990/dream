import * as types from '../action-types'
export interface increment {
    type: typeof types.INCREMENT
}

export interface decrement {
    type: typeof types.DECREMENT
}
// type 是用来给类型起名的
export type Action = increment | decrement;
export default {
    increment ():increment {
        return {type: types.INCREMENT}
    },
    incrementDely():any {
        return function (dispatch:any, getState:any):void {
            setTimeout(function (){
                dispatch({type: types.INCREMENT})
            }, 1000)
        }
    },
    decrement ():decrement {
        return {type: types.DECREMENT}
    }
}