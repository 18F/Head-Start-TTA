import {
  TOGGLE_REQUEST_FORM,
  SHOW_SUCCESS_MESSAGE
} from 'tta_need/actions'

const app = (state = {}, action) => {
  switch(action.type) {
    case TOGGLE_REQUEST_FORM:
      return {...state, formOpen: action.value, showSuccess: false}
    case SHOW_SUCCESS_MESSAGE:
      return {...state, showSuccess: true}
    default:
      return state
  }
}

export default app
