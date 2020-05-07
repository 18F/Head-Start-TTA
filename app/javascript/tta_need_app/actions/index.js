import api from '../api'

export const SAVE_TASK = "SAVE_TASK"

export const createTask = (parentId, title) => {
  return dispatch => {
    return dispatch(api.createTask({parentId}, {data: {
      type: "tasks",
      attributes: {
        title
      }
    }}))
  }
}

export const saveTask = ({id, attributes: {status}}) => {
  return dispatch => {
    return dispatch(api.saveTask({id, include: "created-by,completed-by,assigned-to"}, {data: {
      type: "tasks",
      id,
      attributes: {
        status
      }
    }}))
  }
}
