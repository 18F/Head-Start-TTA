import { connect } from 'react-redux'
import { getRelationship } from 'redux-bees'
import GranteeDetailsBox from '../components/grantee_details_box'

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

export default connect(mapStateToProps)(GranteeDetailsBox)
