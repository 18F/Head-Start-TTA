import {
  UPDATE_NEED_FIELDS,
  UPDATE_NEED_TOPICS
} from '../actions'
import { SET_REPORT_ID } from 'monitoring_report/actions'

const ttaNeed = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_NEED_FIELDS:
      return {...state, ...action.fields}
    case UPDATE_NEED_TOPICS:
      return {...state, topics: {...state.topics, [action.scope]: action.topics}}
    case SET_REPORT_ID:
      return {...state, contextLinkType: "monitoring-reports", contextLinkId: action.id}
    default:
      return state
  }
}

export default ttaNeed
