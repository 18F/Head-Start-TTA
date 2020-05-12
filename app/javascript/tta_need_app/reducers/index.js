import { combineReducers } from 'redux'
import { reducer as bees } from 'redux-bees'
import { ttaNeed, tasks } from 'tta_need/reducers'
import app from './app'
import taskNotes from './task_notes'

export default combineReducers({
  app,
  taskNotes,
  ttaNeed,
  tasks,
  bees
})
