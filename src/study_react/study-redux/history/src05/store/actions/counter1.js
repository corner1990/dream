/**
 * 抽离actions 单独管理
 */
import { ADD1, MINUS1 } from '../actions-types';

export default {
  add1(playload) {
    return { type: ADD1, playload}
  },
  minus1(playload) {
    return { type: MINUS1, playload}
  }
}