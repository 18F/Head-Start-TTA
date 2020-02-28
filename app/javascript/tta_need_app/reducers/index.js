import { combineReducers } from 'redux'
import { reducer as bees } from 'redux-bees'
import { ttaNeed, tasks } from 'tta_need/reducers'

export default combineReducers({
  ttaNeed,
  tasks,
  bees
})
