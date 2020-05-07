import { connect } from 'react-redux'
import api from '../api'
import { createPlan } from '../actions'
import ActivityPlanForm from '../components/activity_plan_form'

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = {
  createPlan
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPlanForm)
