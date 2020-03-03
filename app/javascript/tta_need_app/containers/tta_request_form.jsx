import { connect } from 'react-redux'
import TTARequestForm from '../components/tta_request_form'
import { setGranteeId } from 'tta_need/actions'

const mapStateToProps = null
const mapDispatchToProps = {
  setGranteeId
}

export default connect(mapStateToProps, mapDispatchToProps)(TTARequestForm)
