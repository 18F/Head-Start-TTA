import React, { PureComponent } from 'react'
import { shortDate } from 'common/utils'
import moment from 'moment'

class TrackerTimeline extends PureComponent {
  render() {
    const {
      ttaNeed: {attributes: {createdAt}},
      activityReports
    } = this.props
    if (activityReports.length == 0) {
      return (
        <ul className="usa-list">
          <li>TTA Request Submitted<br />{shortDate(createdAt)}</li>
          <li>Today</li>
          <li>Specialist Assigned</li>
          <li>Travel Approved</li>
          <li>Activities</li>
          <li>Closout Review</li>
        </ul>
      )
    }
    return (
      <ul className="usa-list">
        <li>TTA Request Submitted<br />{shortDate(createdAt)}</li>
        <li>Specialist Assigned<br />{shortDate(moment(createdAt).add(1, 'week'))}</li>
        <li>Travel Approved<br />{shortDate(moment(createdAt).add(2, 'weeks'))}</li>
        {activityReports.map(({id, attributes: {startDate, contactMethod}}) => (
          <li key={id}>{contactMethod} Activity<br />{shortDate(startDate)}</li>
        ))}
        <li>Today</li>
        <li>Site Visit Activity<br />{shortDate(moment().add(1, 'week'))}</li>
        <li>Closout Review</li>
      </ul>
    )
  }
}

export default TrackerTimeline
