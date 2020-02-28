import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { middleware as beesMiddleware } from 'redux-bees'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import initialState from 'tta_need/store'

export default createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
    beesMiddleware()
  )
)
