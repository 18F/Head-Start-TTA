import React, { PureComponent, Fragment } from 'react'
import RequestSuccessMessage from 'tta_need/components/request_success_message'

class TTANeedTracker extends PureComponent {
  render() {
    const {
      ttaNeed,
      tasks,
      topics,
      grantee,
      grants,
      showSuccess
    } = this.props
    if (ttaNeed == null) {
      return (<p>Loading</p>)
    }
    const {attributes: {region}} = grants[0]
    return (
      <Fragment>
        <RequestSuccessMessage show={showSuccess} />
        <div className="grid-row grid-gap">
          <div className="grid-col-4">
            <div className="box">
              <p><strong>{region}</strong></p>
              <h2>TA Request {ttaNeed.id}</h2>
              <h4>Requested: {ttaNeed.attributes.createdAt}</h4>
            </div>
          </div>
          <div className="grid-col-8">
            <p>Tracker icons</p>
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
