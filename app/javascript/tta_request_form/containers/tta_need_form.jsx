import { compose } from 'redux'
import { query, getRelationship } from 'redux-bees'
import { connect } from 'react-redux'
import {
  closeForm
} from '../actions'
import api from 'tta_request_form/api'
import TTANeedForm from '../components/tta_need_form'

const mapStateToProps = (state, props) => ({
  grant: getRelationship(state, props.report, 'grant'),
  grantee: getRelationship(state, props.report, 'grantee')
})

const mapDispatchToProps = dispatch => ({
  closeForm: () => { dispatch(closeForm()) }
})

const enhance = compose(
  query('report', api.getMonitoringReport, (perform, props) => (
    perform({id: props.reportId, include: 'grant,grantee'})
  )),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TTANeedForm)
