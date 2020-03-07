import { connect } from 'react-redux'
import {
  submitRequest,
  closeForm,
  updateNeed
} from '../actions'
import TTANeedForm from '../components/tta_need_form'

const mapStateToProps = state => ({
  ttaNeed: state.ttaNeed
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNeed: (update) => dispatch(updateNeed(update)),
  closeForm: () => dispatch(closeForm()),
  submitRequest: () => dispatch(submitRequest(ownProps.history))
})

export default connect(mapStateToProps, mapDispatchToProps)(TTANeedForm)
