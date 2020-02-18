import {
  SET_APP_CONFIG,
  TOGGLE_REQUEST_FORM,
  SHOW_SUCCESS_MESSAGE
} from '../actions'

const app = (state = {}, action) => {
  switch(action.type) {
    case SET_APP_CONFIG:
      return {...state, ...action.config}
    case TOGGLE_REQUEST_FORM:
      return {...state, formOpen: action.value, showSuccess: false}
    case SHOW_SUCCESS_MESSAGE:
      return {...state, showSuccess: true}
    default:
      return state
  }
}

export default app
