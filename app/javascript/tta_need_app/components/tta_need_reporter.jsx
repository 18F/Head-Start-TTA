import React, { PureComponent, Fragment } from 'react'
import needDetailsBox from '../containers/need_details_box'
import PlanningDetailsComponent from './planning_details_box'
import ActivityReportForm from '../containers/activity_report_form.jsx'

class TTANeedReporter extends PureComponent {
  render() {
    const {
      ttaNeed,
      activityPlan,
      history
    } = this.props
    if (ttaNeed === null || activityPlan === null) {
      return <p>Loading...</p>
    }
    const { id: ttaNeedId } = ttaNeed
    const ReportingDetailsBox = needDetailsBox(PlanningDetailsComponent)
    return (
      <Fragment>
        <h1>TTA Activity Report</h1>
        <ReportingDetailsBox ttaNeed={ttaNeed} />
        <ActivityReportForm ttaNeed={ttaNeed} activityPlan={activityPlan} history={history} />
      </Fragment>
    )
  }
}

export default TTANeedReporter
