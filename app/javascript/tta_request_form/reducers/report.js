import {
  SET_REPORT_DETAILS
} from 'tta_request_form/actions'

const report = (state = {}, action) => {
  switch(action.type) {
    case SET_REPORT_DETAILS:
      return {...state, ...action.details}
    default:
      return state
  }
}

export default report
