import { combineReducers } from 'redux'
import { reducer as bees } from 'redux-bees'
import { ttaNeed, tasks } from 'tta_need/reducers'
import app from './app'

export default combineReducers({
  app,
  ttaNeed,
  tasks,
  bees
})
