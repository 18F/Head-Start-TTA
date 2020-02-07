import { createStore, applyMiddleware } from 'redux'
import reducers from 'tta_request_form/reducers'

const initialState = {
  app: {
    formOpen: false
  },
  report: {
    body: ""
  }
}

export default createStore(
  reducers,
  initialState
)
