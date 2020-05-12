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

export const saveTask = ({id, attributes: {status, notes}}) => {
  return dispatch => {
    return dispatch(api.saveTask({id, include: "created-by,completed-by,assigned-to"}, {data: {
      type: "tasks",
      id,
      attributes: {
        status,
        notes
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

export const createReport = (ttaNeedId, attributes, history) => {
  return dispatch => {
    return dispatch(api.createActivityReport({ttaNeedId}, {data: {
      type: "activity-reports",
      attributes: {
        "start-date": attributes.startAt.toISOString(),
        "end-date": attributes.endAt.toISOString(),
        duration: attributes.duration,
        "contact-method": attributes.format,
        "grantee-role-ids": attributes.audience
      }
    }}).then(({status}) => {
      if (status === 201) {
        history.push(`/tta_needs/${ttaNeedId}`)
      }
    }))
  }
}
