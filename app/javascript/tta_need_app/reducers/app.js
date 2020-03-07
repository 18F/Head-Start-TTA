import {
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE
} from 'tta_need/actions'

const app = (state = {}, action) => {
  switch(action.type) {
    case SHOW_SUCCESS_MESSAGE:
      return {...state, showSuccess: true}
    case HIDE_SUCCESS_MESSAGE:
      return {...state, showSuccess: false}
    default:
      return state
  }
}

export default app
