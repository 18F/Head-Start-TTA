import React, { PureComponent } from 'react'

class MonitoringDetailsBox extends PureComponent {
  render() {
    const { report } = this.props
    if (report == null) {
      return <p>Loading</p>
    }
    const { attributes: attrs } = report
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-8">
            <h4>Area of {attrs.status} Determination</h4>
          </div>
          <div className="grid-col-4">
            <p><strong>Category:</strong> Supervision</p>
            <p><strong>Citation:</strong> {attrs.formattedCitation}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MonitoringDetailsBox
