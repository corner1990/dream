import * as types from '../action-types'
import axios from 'axios'
export default {
    login ({user}) {
        return function (dispatch, getState, request) {
            return request.post('/api/login', {
                data: user
            }).then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_SESSION,
                payload: data.data
            }) 
        })
        }
    },
    logout () {
        return function (dispatch, getState, request) {
            return request.get('/api/logout').then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_SESSION,
                payload: data.data
            }) 
        })
        }
    },
    getUser () {
        return function (dispatch, getState, request) {
            return request.get('/api/user').then(res=>{
                let {data} = res
                dispatch({
                    type: types.SET_SESSION,
                    payload: data.data
                }) 
            })
        }
    }
}