import api from '../api'

export const SAVE_TASK = "SAVE_TASK"

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
