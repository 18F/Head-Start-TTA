import { combineReducers } from 'redux'
import { reducer as bees } from 'redux-bees'
import { ttaNeed, tasks } from 'tta_need/reducers'
import app from './app'
import taskDetails from './task_details'

export default combineReducers({
  app,
  taskDetails,
  ttaNeed,
  tasks,
  bees
})
