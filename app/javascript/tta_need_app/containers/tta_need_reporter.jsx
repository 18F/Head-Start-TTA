import { compose } from 'redux'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import TTANeedReporter from '../components/tta_need_reporter'

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = {}

const enhance = compose(
  query('ttaNeed', api.getNeed, (perform, props) => (
    perform({
      id: props.match.params.ttaNeedId,
      include: "requester,grantee,grantee.employees,grantee.grants,topics"
    })
  )),
  query('activityPlan', api.getActivityPlan, (perform, props) => (
    perform({id: props.match.params.planId})
  )),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TTANeedReporter)
