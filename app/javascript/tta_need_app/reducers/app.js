import {
  SHOW_SUCCESS_MESSAGE
} from 'tta_need/actions'

const app = (state = {}, action) => {
  switch(action.type) {
    case SHOW_SUCCESS_MESSAGE:
      return {...state, redirect: action.url}
    default:
      return state
  }
}

export default app
