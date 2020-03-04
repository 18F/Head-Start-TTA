import { connect } from 'react-redux'
import { getRelationship } from 'redux-bees'
import MonitoringDetails from '../components/monitoring_details'

const mapStateToProps = (state, props) => {
  const grant = getRelationship(state, props.report, 'grant')
  const grantee = getRelationship(state, props.report, 'grantee')
  const employees = getRelationship(state, grantee, 'employees')
  const specialists = getRelationship(state, grantee, 'specialists')
  return {
    grant,
    grantee,
    employees,
    specialists
  }
}

export default connect(mapStateToProps)(MonitoringDetails)
