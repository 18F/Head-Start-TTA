import { compose } from 'redux'
import { query } from 'redux-bees'
import { connect } from 'react-redux'
import api from '../api'
import { createReport } from '../actions'
import ActivityReportForm from '../components/activity_report_form'

const mapDispatchToProps = (dispatch, ownProps) => ({
  createReport: (ttaNeedId, attributes) => (
    dispatch(createReport(ttaNeedId, attributes, ownProps.history))
  )
})

const enhance = compose(
  query('granteeRoles', api.getGranteeRoles),
  connect(null, mapDispatchToProps)
)

export default enhance(ActivityReportForm)
