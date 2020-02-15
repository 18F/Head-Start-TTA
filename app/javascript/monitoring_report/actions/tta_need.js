import { getEntity, getRelationship } from 'redux-bees'
import api from '../api'
import { saveTasks } from './tasks'

export const TOGGLE_REQUEST_FORM = "TOGGLE_REQUEST_FORM"
export const UPDATE_NEED_FIELDS = "UPDATE_NEED_FIELDS"

export const openForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: true
})

export const closeForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: false
})

export const submitRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    const {
      ttaNeed: {
        startDate,
        narrative,
        indicator,
        specialistTypesNeeded,
        topics,
        contextLinkId,
        contextLinkType
      }
    } = state
    const report = getEntity(state, {type: contextLinkType, id: contextLinkId})
    const {id: granteeId} = getRelationship(state, report, 'grantee')
    dispatch(api.createNeed({granteeId}, {data: {
      type: "tta-needs",
      attributes: {
        'start-date': startDate,
        narrative,
        indicator,
        'specialist-types-needed': specialistTypesNeeded.map(s => s.value),
        topics: topics.map(t => t.value)
      },
      relationships: {
        "context-link": {
          data: {type: contextLinkType, id: contextLinkId}
        }
      }
    }})).then(({status, body: {data: {id}}}) => {
      if (status === 201) {
        dispatch(saveTasks(id))
      }
    })
    dispatch(closeForm())
  }
}

export const updateNeed = fields => ({
  type: UPDATE_NEED_FIELDS,
  fields
})
