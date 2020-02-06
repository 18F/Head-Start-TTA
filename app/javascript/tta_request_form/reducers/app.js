import {
  SET_APP_CONFIG,
  TOGGLE_REQUEST_FORM
} from 'tta_request_form/actions'

const app = (state = {}, action) => {
  switch(action.type) {
    case SET_APP_CONFIG:
      return {...state, ...action.config}
    case TOGGLE_REQUEST_FORM:
      return {...state, formOpen: action.value}
    default:
      return state
  }
}

export default app
