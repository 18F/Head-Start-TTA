import React, { PureComponent, Fragment } from 'react'
import GranteeDetailsBox from 'grantee/components/grantee_details_box'
import MonitoringDetailsBox from './monitoring_details_box'

class MonitoringDetails extends PureComponent {
  render() {
    const {
      grant,
      grantee,
      employees,
      specialists,
      report
    } = this.props
    return (
      <Fragment>
        <GranteeDetailsBox grants={[grant]} grantee={grantee} employees={employees} specialists={specialists} />
        <MonitoringDetailsBox report={report} />
      </Fragment>
    )
  }
}

export default MonitoringDetails
