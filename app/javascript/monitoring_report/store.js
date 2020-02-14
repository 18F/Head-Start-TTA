import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { middleware as beesMiddleware } from 'redux-bees'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const initialState = {
  app: {
    formOpen: true
  },
  report: {
    id: ""
  },
  ttaNeed: {
    startDate: "",
    narrative: "",
    indicator: "OHS Monitoring Report",
    specialistTypesNeeded: [{value: "GS", label: "Grantee Specialist"}],
    topics: [{}],
    contextLinkId: "",
    contextLinkType: "monitoring-reports",
    tasks: []
  }
}

export default createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
    beesMiddleware()
  )
)
