import React, { PureComponent, Fragment } from 'react'
import { compose } from 'redux'
import { query } from 'redux-bees'
import api from './api'
import { connect } from 'react-redux'
import { openForm } from 'tta_need/actions'
import { renderMarkdown } from 'common/utils'
import MonitoringDetails from './containers/monitoring_details'
import TTANeedForm from 'tta_need/containers/tta_need_form'
import RequestSuccessMessage from 'tta_need/components/request_success_message'

class App extends PureComponent {
  renderBodyColumn(columnClass) {
    if (this.props.report == null) {
      return
    }
    const {report: {attributes: {narrative}}} = this.props
    return (
      <div className={columnClass}>
        <h2>Monitoring Report</h2>
        <div className="font-body-md measure-2" dangerouslySetInnerHTML={renderMarkdown(narrative)}></div>
      </div>
    )
  }
  renderReportBody() {
    const {
      formOpen,
      openForm,
      report
    } = this.props
    if (formOpen) {
      return (
        <div className="grid-row box--split">
          {this.renderBodyColumn("grid-col")}
          <TTANeedForm report={report} />
        </div>
      )
    } else {
      return (
        <div className="grid-row">
          {this.renderBodyColumn("grid-col-10")}
          <div className="grid-col-2" style={{marginTop: "1rem"}}>
            <button className="usa-button" onClick={() => { openForm() }}>Request TTA</button>
          </div>
        </div>
      )
    }
  }
  render() {
    const {
      report,
      showSuccess
    } = this.props
    return (
      <Fragment>
        <MonitoringDetails report={report} />
        <RequestSuccessMessage show={showSuccess} />
        {this.renderReportBody()}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  formOpen: state.app.formOpen,
  showSuccess: state.app.showSuccess,
  reportId: state.report.id
})

const mapDispatchToProps = {
  openForm
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  query('report', api.getMonitoringReport, (perform, props) => (
    perform({id: props.reportId, include: 'grant,grantee,grantee.employees,grantee.specialists'})
  ))
)

export default enhance(App)
