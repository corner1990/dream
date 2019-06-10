import * as types from '../action-types'
import axios from 'axios'
export default {
    getHomeList () {
        return function (dispatch, getState, request) {
            return request.get('/api/users').then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_HOME_LIST,
                payload: data
            }) 
        })
        }
    }
}