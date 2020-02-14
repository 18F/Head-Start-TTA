import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { middleware as beesMiddleware } from 'redux-bees'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const initialState = {
  app: {
    formOpen: false
  },
  report: {
    narrative: "",
    id: "",
    isFetching: false
  },
  ttaNeed: {
    narrative: "",
    indicator: "OHS Monitoring Report",
    specialistTypesNeeded: [{value: "GS", label: "Grantee Specialist"}],
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
