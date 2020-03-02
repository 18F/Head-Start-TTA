import api from '../api'
import { saveTasks } from './tasks'

export const TOGGLE_REQUEST_FORM = "TOGGLE_REQUEST_FORM"
export const UPDATE_NEED_FIELDS = "UPDATE_NEED_FIELDS"
export const UPDATE_NEED_TOPICS = "UPDATE_NEED_TOPICS"
export const SHOW_SUCCESS_MESSAGE = "TTA_NEED_SUCCESSFULLY_CREATED"

export const openForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: true
})

export const closeForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: false
})

export const setGranteeId = granteeId => updateNeed({granteeId})

export const submitRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    const {
      ttaNeed: {
        granteeId,
        startDate,
        narrative,
        indicator,
        purpose,
        specialistTypesNeeded,
        topics,
        contextLinkId,
        contextLinkType
      }
    } = state
    const specialistTypesValues = specialistTypesNeeded.map(s => s.value)
    let topicData = []
    specialistTypesValues.forEach(t => {
      topicData = [...topicData, ...topics[t].map(s => ({type: "topics", id: s.value}))]
    })
    dispatch(api.createNeed({granteeId}, {data: {
      type: "tta-needs",
      attributes: {
        'start-date': startDate,
        narrative,
        indicator,
        purpose,
        'specialist-types-needed': specialistTypesValues
      },
      relationships: {
        "context-link": {
          data: {type: contextLinkType, id: contextLinkId}
        },
        topics: {
          data: topicData
        }
      }
    }})).then(({
      status,
      body: {
        data: {
          id,
          links: {self: ttaNeedUrl}
        }
      }
    }) => {
      if (status === 201) {
        dispatch(saveTasks(id)).then(() => dispatch(needCreated(ttaNeedUrl)))
      }
    })
  }
}

const needCreated = url => ({
  type: SHOW_SUCCESS_MESSAGE,
  url
})

export const updateNeed = fields => ({
  type: UPDATE_NEED_FIELDS,
  fields
})

export const updateTopics = (scope, topics) => ({
  type: UPDATE_NEED_TOPICS,
  scope,
  topics
})
