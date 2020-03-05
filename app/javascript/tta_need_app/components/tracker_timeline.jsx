import React, { PureComponent } from 'react'

class TrackerTimeline extends PureComponent {
  render() {
    const {
      ttaNeed,
      activityReports
    } = this.props
    return (
      <ul className="usa-list">
        {activityReports.map(({id, attributes: {startDate, contactMethod}}) => (
          <li key={id}>{startDate} - {contactMethod}</li>
        ))}
      </ul>
    )
  }
}

export default TrackerTimeline
