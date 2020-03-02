import { compose } from 'redux'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import GranteeDetailsBox from '../components/grantee_details_box'

const mapStateToProps = (state, props) => ({
  grants: getRelationship(state, props.grantee, 'grants'),
  people: getRelationship(state, props.grantee, 'people')
})

const enhance = compose(
  query('grantee', api.getGrantee, (perform, props) => (
    perform({id: props.granteeId, include: "grants,people"})
  )),
  connect(mapStateToProps)
)

export default enhance(GranteeDetailsBox)
