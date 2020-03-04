import { compose } from 'redux'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import TTANeedTracker from '../components/tta_need_tracker'

const mapStateToProps = (state, props) => ({
  tasks: getRelationship(state, props.ttaNeed, 'tasks'),
  showSuccess: state.app.showSuccess
})

const enhance = compose(
  query('ttaNeed', api.getNeed, (perform, props) => (
    perform({
      id: props.match.params.id,
      include: "requester,tasks,grantee,grantee.employees,grantee.grants,topics"
    })
  )),
  connect(mapStateToProps)
)

export default enhance(TTANeedTracker)
