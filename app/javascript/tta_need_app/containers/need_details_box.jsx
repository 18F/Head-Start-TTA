import { getRelationship } from 'redux-bees'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  const requester = getRelationship(state, props.ttaNeed, 'requester')
  const grantee = getRelationship(state, props.ttaNeed, 'grantee')
  const pocs = getRelationship(state, grantee, 'employees')
  const grants = getRelationship(state, grantee, 'grants')
  const topics = getRelationship(state, props.ttaNeed, 'topics')
  return {
    requester,
    grantee,
    pocs,
    grants,
    topics
  }
}

export default connect(mapStateToProps)
