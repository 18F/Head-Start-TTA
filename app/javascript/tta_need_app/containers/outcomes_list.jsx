import { query } from 'redux-bees'
import api from '../api'
import OutcomesList from '../components/outcomes_list'

const connect = query('tasks', api.getTasks, (perform, props) => (
  perform({
    ttaNeedId: props.ttaNeedId,
    include: "created-by,assigned-to,completed-by"
  })
))
export default connect(OutcomesList)
