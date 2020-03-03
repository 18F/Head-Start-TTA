import React, { PureComponent } from 'react'

class TTANeedTracker extends PureComponent {
  render() {
    const {
      ttaNeed,
      tasks,
      topics,
      grantee,
      grants
    } = this.props
    if (ttaNeed == null) {
      return (<p>Loading</p>)
    }
    const {attributes: {region}} = grants[0]
    return (
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
    )
  }
}

export default TTANeedTracker
