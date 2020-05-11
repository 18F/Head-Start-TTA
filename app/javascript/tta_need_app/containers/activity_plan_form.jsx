import { compose } from 'redux'
import { query } from 'redux-bees'
import { connect } from 'react-redux'
import api from '../api'
import { createPlan } from '../actions'
import ActivityPlanForm from '../components/activity_plan_form'

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPlan: (ttaNeedId, startDate, location, format, audience) => (
    dispatch(createPlan(ttaNeedId, startDate, location, format, audience, ownProps.history))
  )
})

const enhance = compose(
  query('granteeRoles', api.getGranteeRoles),
  connect(null, mapDispatchToProps)
)

export default enhance(ActivityPlanForm)
