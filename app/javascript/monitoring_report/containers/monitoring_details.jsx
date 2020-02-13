import { connect } from 'react-redux'
import { getRelationship } from 'redux-bees'
import MonitoringDetails from '../components/monitoring_details'

const mapStateToProps = (state, props) => {
  const grant = getRelationship(state, props.report, 'grant')
  const grantee = getRelationship(state, props.report, 'grantee')
  const people = getRelationship(state, grantee, 'people')
  return {
    grant,
    grantee,
    people
  }
}

export default connect(mapStateToProps)(MonitoringDetails)
