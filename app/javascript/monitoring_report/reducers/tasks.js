import {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK
} from '../actions'

const tasks = (state = [], action) => {
  switch(action.type) {
    case ADD_TASK:
      return [...state, {title: "", key: (state[state.length - 1].key + 1)}]
    case UPDATE_TASK:
      let toUpdate = [...state]
      toUpdate[action.index].title = action.title
      return toUpdate
    case REMOVE_TASK:
      if (state.length === 1) {
        return state
      }
      let toRemove = [...state]
      toRemove.splice(action.index, 1)
      return toRemove
    default:
      return state
  }
}

export default tasks
