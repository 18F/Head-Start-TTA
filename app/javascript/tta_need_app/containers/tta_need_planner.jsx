import { query } from 'redux-bees'
import api from '../api'
import TTANeedPlanner from '../components/tta_need_planner'

export default query('ttaNeed', api.getNeed, (perform, props) => (
  perform({
    id: props.match.params.id,
    include: "requester,activity-reports,grantee,grantee.employees,grantee.grants,topics"
  })
))(TTANeedPlanner)
