import React, { PureComponent, Fragment } from 'react'
import RequestSuccessMessage from 'tta_need/components/request_success_message'
import TrackerDetailsBox from '../containers/tracker_details_box'
import TrackerTimeline from '../containers/tracker_timeline'

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
    return (
      <Fragment>
        <RequestSuccessMessage show={showSuccess} />
        <div className="grid-row grid-gap">
          <div className="grid-col-4">
            <TrackerDetailsBox ttaNeed={ttaNeed} />
          </div>
          <div className="grid-col-8">
            <TrackerTimeline ttaNeed={ttaNeed} />
            <div className="box">
              <p>Outcome one</p>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TTANeedTracker
