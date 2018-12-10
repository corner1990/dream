import { ADD, MINUS } from '../store/actions-types'
export default {
  add () {
    return {type: ADD}
  },
  minus() {
    return { type: MINUS }
  }
}