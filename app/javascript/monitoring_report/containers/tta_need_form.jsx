import { connect } from 'react-redux'
import {
  submitRequest
} from '../actions'
import TTANeedForm from '../components/tta_need_form'

const mapStateToProps = (state, props) => ({
  ttaNeed: state.ttaNeed
})

const mapDispatchToProps = dispatch => ({
  submitRequest: () => { dispatch(submitRequest()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TTANeedForm)
