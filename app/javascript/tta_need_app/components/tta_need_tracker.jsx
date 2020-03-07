import React, { PureComponent, Fragment } from 'react'
import RequestSuccessMessage from 'tta_need/components/request_success_message'
import TrackerDetailsBox from '../containers/tracker_details_box'
import TrackerTimeline from '../containers/tracker_timeline'
import { OutcomesList } from '../containers/tasks'

class TTANeedTracker extends PureComponent {
  render() {
    const {
      ttaNeed,
      tasks,
      showSuccess
    } = this.props
    if (ttaNeed == null) {
      return (<p>Loading</p>)
    }
    const { id: ttaNeedId } = ttaNeed
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
            <OutcomesList ttaNeedId={ttaNeedId} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TTANeedTracker
