import React, { PureComponent, Fragment } from 'react'
import needDetailsBox from '../containers/need_details_box'
import PlanningDetailsComponent from './planning_details_box'

class TTANeedReporter extends PureComponent {
  render() {
    const {
      ttaNeed
    } = this.props
    if (ttaNeed === null) {
      return <p>Loading...</p>
    }
    const ReportingDetailsBox = needDetailsBox(PlanningDetailsComponent)
    return (
      <Fragment>
        <h1>TTA Activity Report</h1>
        <ReportingDetailsBox ttaNeed={ttaNeed} />
      </Fragment>
    )
  }
}

export default TTANeedReporter
