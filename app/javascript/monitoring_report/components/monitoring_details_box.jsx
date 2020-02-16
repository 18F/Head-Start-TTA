import React, { PureComponent } from 'react'
import showdown from 'showdown'
import xss from 'xss'
import moment from 'moment'

class MonitoringDetailsBox extends PureComponent {
  get formattedCitation() {
    const {report: {attributes: {citationDetails}}} = this.props
    const converter = new showdown.Converter()
    return {__html: xss(converter.makeHtml(citationDetails))}
  }
  render() {
    if (this.props.report == null) {
      return <p>Loading</p>
    }
    const { report: {attributes: report} } = this.props
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-8">
            <h4>Area of {report.status} Determination</h4>
            <p><strong>Citation:</strong> {report.formattedCitation}</p>
            <div className="measure-2" dangerouslySetInnerHTML={this.formattedCitation}></div>
          </div>
          <div className="grid-col-4">
            <p><strong>Report Date:</strong> {moment(report.reportDate).format("MMMM D, YYYY")}</p>
            <p><strong>Due Date:</strong> {moment(report.dueDate).format("MMMM D, YYYY")}</p>
            <p><strong>Timeframe for Correction:</strong> {report.timeframe}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MonitoringDetailsBox
