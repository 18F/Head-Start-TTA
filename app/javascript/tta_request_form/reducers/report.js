import {
  SET_BODY
} from 'tta_request_form/actions'

const report = (state = {}, action) => {
  switch(action.type) {
    case SET_BODY:
      return {...state, body: action.body}
    default:
      return state
  }
}

export default report
