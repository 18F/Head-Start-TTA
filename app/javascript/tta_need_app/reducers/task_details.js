import { TASK_DETAILS } from '../actions'

const taskDetails = (state = {}, action) => {
  switch(action.type) {
    case TASK_DETAILS:
      return {...state, [action.taskId]: action.details}
    default:
      return state
  }
}

export default taskDetails
