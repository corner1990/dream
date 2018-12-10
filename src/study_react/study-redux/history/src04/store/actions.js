/**
 * 抽离actions 单独管理
 */
import { ADD, MINUS } from './actions-types';
export default {
  add(playload) {
    return { type: ADD, playload}
  },
  minus(playload) {
    return { type: MINUS, playload}
  }
}