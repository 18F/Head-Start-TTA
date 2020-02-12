import { combineReducers } from 'redux'
import { reducer as bees } from 'redux-bees'
import app from './app'
import report from './report'
import ttaNeed from './tta_need'

export default combineReducers({
  app,
  report,
  ttaNeed,
  bees
})
