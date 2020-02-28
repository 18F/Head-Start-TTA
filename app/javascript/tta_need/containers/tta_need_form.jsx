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

const mapDispatchToProps = {
  updateNeed,
  closeForm,
  submitRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TTANeedForm)
