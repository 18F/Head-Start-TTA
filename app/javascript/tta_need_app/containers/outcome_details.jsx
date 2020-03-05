import { getRelationship } from 'redux-bees'
import { connect } from 'react-redux'
import OutcomeDetails from '../components/outcome_details'

const mapStateToProps = (state, props) => ({
  createdBy: getRelationship(state, props.task, 'createdBy'),
  assignedTo: getRelationship(state, props.task, 'assignedTo'),
  completedBy: getRelationship(state, props.task, 'completedBy')
})

export default connect(mapStateToProps)(OutcomeDetails)
