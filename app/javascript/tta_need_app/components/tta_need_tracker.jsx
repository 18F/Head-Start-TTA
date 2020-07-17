import React, { PureComponent, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import RequestSuccessMessage from 'tta_need/components/request_success_message'
import needDetailsBox from '../containers/need_details_box'
import TrackerDetailsComponent from './tracker_details_box'
import TrackerTimeline from '../containers/tracker_timeline'
import { GoalsList } from '../containers/tasks'
import ActivityReport from '../containers/activity_report'

class TTANeedTracker extends PureComponent {
  render() {
    const {
      ttaNeed,
      activityReports,
      showSuccess
    } = this.props
    if (ttaNeed == null) {
      return (<p>Loading</p>)
    }
    const { id: ttaNeedId } = ttaNeed
    const TrackerDetailsBox = needDetailsBox(TrackerDetailsComponent)
    return (
      <Fragment>
        <h1>TTA Need Progress Tracker</h1>
        <RequestSuccessMessage show={showSuccess} />
        <div className="grid-row grid-gap">
          <div className="grid-col-4">
            <TrackerDetailsBox ttaNeed={ttaNeed} />
            <Link to={`/tta_needs/${ttaNeedId}/plan`} className="usa-button">Create Activity Plan</Link>
          </div>
          <div className="grid-col-8" id="main-content">
            <TrackerTimeline ttaNeed={ttaNeed} />
            <Route path="/tta_needs/:ttaNeedId/reports/:reportId" render={routeParams => (
              <ActivityReport {...routeParams} ttaNeed={ttaNeed} />
            )} />
            {activityReports &&
              <GoalsList activitiesCompleted={activityReports.length > 0} ttaNeedId={ttaNeedId} />
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TTANeedTracker
