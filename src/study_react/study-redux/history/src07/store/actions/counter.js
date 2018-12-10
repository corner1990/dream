/**
 * 抽离actions 单独管理
 */
import { ADD, MINUS} from '../actions-types';
import { resolve } from 'path';
import { rejects } from 'assert';
export default {
  add(payload) {
    return { type: ADD, payload}
  },
  minus(payload) {
    return { type: MINUS, payload}
  },
  thunk (payload) {
    /**
     * 把这个函数发送非仓库
     * 需要执行这个函数
     * 需要传递进来的dispatch和getState方法
     */
    return function (dispatch, getState) {
      setTimeout(()=> dispatch({ type: MINUS}), 1000)
    }
  },
  /**
   * promise调用
   * 这么写，只能处理成功的回调，不能处理失败的回调
   * @param {any} payload 任何值
   */
  promise1 (payload) {
    // 返回一个promse
    return new Promise(function (resolve, reject) {
      setTimeout(()=> resolve({ type: MINUS}), 1000)
    })
  },
  /**
   * promise参数
   * 这么写，只能处理成功的回调，不能处理失败的回调
   * @param {any} payload 任何值
   */
  playloadPromise (playload) {
    return {
      type: ADD,
      playload: new Promise(function(resolve, reject) {
        setTimeout(() => {
          if(Math.random() > 0.5) {
            resolve(playload)
          } else {
            reject(-playload)
          }
        }, 1000);
      })
    }
  }
}