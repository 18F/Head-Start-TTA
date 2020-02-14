import { compose } from 'redux'
import { query } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import {
  submitRequest,
  updateNeed
} from '../actions'
import TTANeedForm from '../components/tta_need_form'

const mapStateToProps = (state, props) => ({
  ttaNeed: state.ttaNeed
})

const mapDispatchToProps = dispatch => ({
  updateNeed: fields => ( dispatch(updateNeed(fields)) ),
  submitRequest: () => ( dispatch(submitRequest()) )
})

const enhance = compose(
  query('topics', api.getTopics),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TTANeedForm)
