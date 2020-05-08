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

export const createPlan = (ttaNeedId, startDate, location, format, audience, history) => {
  return dispatch => {
    return dispatch(api.createActivityPlan({ttaNeedId}, {data: {
      type: "activity-plans",
      attributes: {
        "start-at": startDate,
        location,
        format,
        "grantee-role-ids": audience
      }
    }}).then(({status}) => {
      if (status === 201) {
        history.push(`/tta_needs/${ttaNeedId}`)
      }
    }))
  }
}
