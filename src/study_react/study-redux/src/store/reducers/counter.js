import { ADD, MINUS } from "../actions-types";
let initState ={number: 0}

// 处理器
export default function reducer(state = initState, action) {
  switch (action.type) {
    // case ADD:
    //   return { number: state.number + 1 }
    //   break;
    // case MINUS:
    //   return { number: state.number - 1 }
    //   break;
    // 传参使用
    case ADD:
      return {number: state.number + (action.playload || 1)}
      break;
    case MINUS:
      return {number: state.number - (action.playload || 1)}
      break;
    default:
      return state
      break;
  }
}

