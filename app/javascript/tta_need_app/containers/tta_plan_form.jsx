import { connect } from 'react-redux'
import TTAPlanForm from '../components/tta_plan_form'
import { setGranteeId } from 'tta_need/actions'

const mapStateToProps = null
const mapDispatchToProps = {
  setGranteeId
}

export default connect(mapStateToProps, mapDispatchToProps)(TTAPlanForm)
