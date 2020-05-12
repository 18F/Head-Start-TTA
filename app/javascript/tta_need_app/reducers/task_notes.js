import { TASK_NOTES } from '../actions'

const taskNotes = (state = {}, action) => {
  switch(action.type) {
    case TASK_NOTES:
      return {...state, [action.taskId]: action.notes}
    default:
      return state
  }
}

export default taskNotes
