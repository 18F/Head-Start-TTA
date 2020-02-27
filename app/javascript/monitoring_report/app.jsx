import React, { PureComponent, Fragment } from 'react'
import { compose } from 'redux'
import { query } from 'redux-bees'
import api from './api'
import { connect } from 'react-redux'
import { openForm } from 'tta_need/actions'
import showdown from 'showdown'
import xss from 'xss'
import MonitoringDetails from './containers/monitoring_details'
import TTANeedForm from 'tta_need/containers/tta_need_form'

class App extends PureComponent {
  renderBodyColumn(columnClass) {
    if (this.props.report == null) {
      return
    }
    const {report: {attributes: {narrative}}} = this.props
    const converter = new showdown.Converter()
    const body = {__html: xss(converter.makeHtml(narrative))}
    return (
      <div className={columnClass}>
        <h2>Monitoring Report</h2>
        <div className="font-body-md measure-2" dangerouslySetInnerHTML={body}></div>
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
  renderSuccessMessage() {
    const {showSuccess} = this.props
    if (showSuccess) {
      return (
        <div className="grid-row">
          <div className="grid-col">
            <div className="usa-alert usa-alert--success">
              <div className="usa-alert__body">
                <h3 className="usa-alert__heading">Success</h3>
                <p className="usa-alert__text">TTA Request has been submitted</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  render() {
    const {report} = this.props
    return (
      <Fragment>
        <MonitoringDetails report={report} />
        {this.renderSuccessMessage()}
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
    perform({id: props.reportId, include: 'grant,grantee,grantee.people'})
  ))
)

export default enhance(App)
