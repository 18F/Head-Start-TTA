import {
  SET_REPORT_ID
} from '../actions'

const report = (state = {}, action) => {
  switch(action.type) {
    case SET_REPORT_ID:
      return {...state, id: action.id}
    default:
      return state
  }
}

export default report
