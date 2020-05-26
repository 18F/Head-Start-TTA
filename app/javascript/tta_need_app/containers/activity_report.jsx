import { connect } from 'react-redux'
import { getEntity } from 'redux-bees'
import ActivityReport from '../components/activity_report'

const mapStateToProps = (state, props) => ({
  activityReport: getEntity(state, {type: "activity-reports", id: props.match.params.reportId})
})

export default connect(mapStateToProps)(ActivityReport)
