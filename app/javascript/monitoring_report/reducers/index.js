import { combineReducers } from 'redux'
import { reducer as bees } from 'redux-bees'
import app from './app'
import report from './report'
import { ttaNeed, tasks } from 'tta_need/reducers'

export default combineReducers({
  app,
  report,
  ttaNeed,
  tasks,
  bees
})
