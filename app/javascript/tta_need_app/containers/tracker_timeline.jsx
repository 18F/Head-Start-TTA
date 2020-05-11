import { connect } from 'react-redux'
import { getRelationship } from 'redux-bees'
import TrackerTimeline from '../components/tracker_timeline'

const mapStateToProps = (state, props) => ({
  activityPlans: getRelationship(state, props.ttaNeed, 'activityPlans'),
  activityReports: getRelationship(state, props.ttaNeed, 'activityReports')
})

export default connect(mapStateToProps)(TrackerTimeline)
