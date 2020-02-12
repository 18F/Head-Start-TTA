import { connect } from 'react-redux'
import { getRelationship } from 'redux-bees'
import GranteeDetailsBox from '../components/grantee_details_box'

const mapStateToProps = (state, props) => ({
  grant: getRelationship(state, props.report, 'grant'),
  grantee: getRelationship(state, props.report, 'grantee'),
  state: state
  // try to switch this to a function to pull people here instead of passing state into GranteeDetailsBox
})

export default connect(
  mapStateToProps
)(GranteeDetailsBox)
