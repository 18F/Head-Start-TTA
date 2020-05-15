import api from '../api'
import { trim, map, filter } from 'lodash'
import { stringPresent } from 'common/utils'

export const TASK_DETAILS = "TASK_DETAILS"

export const createTask = (parentId, title, links) => {
  return dispatch => {
    return dispatch(api.createTask({parentId}, {data: {
      type: "tasks",
      attributes: {
        title,
        links
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

export const setTaskDetails = (taskId, notes, links) => ({
  type: TASK_DETAILS,
  taskId,
  details: {
    notes,
    links
  }
})

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
        dispatch(saveTasks()).then(() => {
          history.push(`/tta_needs/${ttaNeedId}`)
        })
      }
    }))
  }
}

const saveTasks = () => {
  return (dispatch, getState) => {
    const { taskDetails } = getState()
    return Promise.all(
      map(taskDetails, ({notes, links}, id) => {
        const trimmed = trim(notes)
        const filteredLinks = filter(links, (l) => stringPresent(l))
        return dispatch(api.saveTask({id, include: "created-by,completed-by,assigned-to"}, {data: {
          type: "tasks",
          id,
          attributes: {
            notes: trimmed,
            links: filteredLinks
          }
        }}))
      })
    )
  }
}
