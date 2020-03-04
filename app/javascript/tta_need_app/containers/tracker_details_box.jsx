import { getRelationship } from 'redux-bees'
import { connect } from 'react-redux'
import TrackerDetailsBox from '../components/tracker_details_box'

const mapStateToProps = (state, props) => {
  const grantee = getRelationship(state, props.ttaNeed, 'grantee')
  const grants = getRelationship(state, grantee, 'grants')
  const topics = getRelationship(state, props.ttaNeed, 'topics')
  return {
    grantee,
    grants,
    topics
  }
}

export default connect(mapStateToProps)(TrackerDetailsBox)
