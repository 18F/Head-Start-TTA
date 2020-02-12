import { createStore, applyMiddleware } from 'redux'
import reducers from 'tta_request_form/reducers'

const initialState = {
  app: {
    formOpen: false
  },
  report: {
    body: "",
    id: ""
  },
  ttaNeed: {
    narrative: "",
    indicator: "OHS Monitoring Report",
    specialistTypesNeeded: [],
    tasks: []
  }
}

export default createStore(
  reducers,
  initialState
)
