import { connect } from 'react-redux'
import { updateNeed } from '../actions'
import SpecialistList from '../components/specialist_list'

const mapStateToProps = state => ({
  specialistTypesNeeded: state.ttaNeed.specialistTypesNeeded
})

const mapDispatchToProps = {
  updateNeed
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistList)
