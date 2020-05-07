import api from '../api'

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

export const createPlan = (ttaNeedId, start_date, location, format, audience) => {
  return {type: "WOAH", value: "TODO"}
  // return dispatch => {
  //   return dispatch(api.createActivityPlan({ttaNeedId}, {data: {
  //     type: "activity-plans",
  //     attributes: {
  //
  //     }
  //   }}))
  // }
}
