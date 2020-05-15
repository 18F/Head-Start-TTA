import { TASK_NOTES, TASK_LINKS } from '../actions'

const taskDetails = (state = {}, action) => {
  switch(action.type) {
    case TASK_NOTES:
      return {...state, [action.taskId]: {...state[action.taskId], notes: action.notes}}
    case TASK_LINKS:
      return {...state, [action.taskId]: {...state[action.taskId], links: action.links}}
    default:
      return state
  }
}

export default taskDetails
