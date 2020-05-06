import React, { PureComponent, Fragment } from 'react'
import RequestSuccessMessage from 'tta_need/components/request_success_message'
import needDetailsBox from '../containers/need_details_box'
import TrackerDetailsComponent from './tracker_details_box'
import TrackerTimeline from '../containers/tracker_timeline'
import { GoalsList } from '../containers/tasks'

class TTANeedTracker extends PureComponent {
  render() {
    const {
      ttaNeed,
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
          </div>
          <div className="grid-col-8">
            <TrackerTimeline ttaNeed={ttaNeed} />
            <GoalsList ttaNeedId={ttaNeedId} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TTANeedTracker
