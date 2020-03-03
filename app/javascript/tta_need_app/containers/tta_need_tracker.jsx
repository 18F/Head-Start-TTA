import { compose } from 'redux'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import TTANeedTracker from '../components/tta_need_tracker'

const mapStateToProps = (state, props) => {
  const tasks = getRelationship(state, props.ttaNeed, 'tasks')
  const grantee = getRelationship(state, props.ttaNeed, 'grantee')
  const topics = getRelationship(state, props.ttaNeed, 'topics')
  const grants = getRelationship(state, grantee, 'grants')
  return {
    tasks,
    grantee,
    grants,
    topics
  }
}
const mapDispatchToProps = null

const enhance = compose(
  query('ttaNeed', api.getNeed, (perform, props) => (
    perform({id: props.match.params.id, include: "tasks,grantee,grantee.grants,topics"})
  )),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TTANeedTracker)
