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

export default connect(mapStateToProps, mapDispatchToProps)(TTANeedForm)
