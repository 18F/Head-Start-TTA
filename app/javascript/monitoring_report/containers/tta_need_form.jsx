import { connect } from 'react-redux'
import {
  closeForm
} from '../actions'
import TTANeedForm from '../components/tta_need_form'

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = dispatch => ({
  closeForm: () => { dispatch(closeForm()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TTANeedForm)
