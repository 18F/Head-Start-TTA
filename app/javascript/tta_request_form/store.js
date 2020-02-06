import { createStore, applyMiddleware } from 'redux'
import reducers from 'tta_request_form/reducers'

const initialState = {
  app: {}
}

export default createStore(
  reducers,
  initialState
)
