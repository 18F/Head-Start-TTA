import { compose } from 'redux'
import { query } from 'redux-bees'
import api from '../api'
import TTANeedReporter from '../components/tta_need_reporter'

const enhance = compose(
  query('ttaNeed', api.getNeed, (perform, props) => (
    perform({
      id: props.match.params.ttaNeedId,
      include: "requester,grantee,grantee.employees,grantee.grants,topics"
    })
  )),
  query('activityPlan', api.getActivityPlan, (perform, props) => (
    perform({id: props.match.params.planId})
  ))
)

export default enhance(TTANeedReporter)
