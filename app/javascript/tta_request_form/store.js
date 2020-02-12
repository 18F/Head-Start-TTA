import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { middleware as beesMiddleware } from 'redux-bees'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'tta_request_form/reducers'

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
    specialistTypesNeeded: [],
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
