import React, { PureComponent } from 'react'
import { longDate, renderMarkdown } from 'common/utils'

class MonitoringDetailsBox extends PureComponent {
  render() {
    if (this.props.report == null) {
      return <p>Loading</p>
    }
    const { report: {attributes: {
      status,
      formattedCitation,
      citationDetails,
      reportDate,
      dueDate,
      timeframe
    }} } = this.props
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-8">
            <h4>Area of {status} Determination</h4>
            <p><strong>Citation:</strong> {formattedCitation}</p>
            <div className="measure-2" dangerouslySetInnerHTML={renderMarkdown(citationDetails)}></div>
          </div>
          <div className="grid-col-4">
            <p><strong>Report Date:</strong> {longDate(reportDate)}</p>
            <p><strong>Due Date:</strong> {longDate(dueDate)}</p>
            <p><strong>Timeframe for Correction:</strong> {timeframe}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MonitoringDetailsBox
