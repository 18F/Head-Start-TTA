import {
  UPDATE_NEED_FIELDS,
  SET_REPORT_ID
} from '../actions'

const ttaNeed = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_NEED_FIELDS:
      return {...state, ...action.fields}
    case SET_REPORT_ID:
      return {...state, contextLinkId: action.id}
    default:
      return state
  }
}

export default ttaNeed
