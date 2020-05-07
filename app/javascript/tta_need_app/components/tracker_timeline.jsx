import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCommentAlt,
  faUserPlus,
  faPlane,
  faLaptop,
  faUsers,
  faPhoneVolume,
  faCalendarAlt,
  faFileContract,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import { shortDate } from 'common/utils'
import moment from 'moment'

class TrackerTimeline extends PureComponent {
  activityIcon(method) {
    if (method === "Virtual") {
      return faLaptop
    } else if (method === "Site Visit") {
      return faUsers
    } else {
      return faPhoneVolume
    }
  }
  render() {
    const {
      ttaNeed: {attributes: {createdAt}},
      activityReports
    } = this.props
    if (activityReports.length == 0) {
      return (
        <ul className="pizza-tracker pizza-tracker--large">
          <li><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faCommentAlt} /><br />TTA Request Submitted<br />{shortDate(createdAt)}</li>
          <li><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faUserPlus} /><br />Specialist Assigned<br />{shortDate(createdAt)}</li>
          <li><FontAwesomeIcon className="tracker-today fa-2x" icon={faCalendarAlt} /><br />Today<br />&nbsp;<br />&nbsp;</li>
          <li><FontAwesomeIcon className="fa-2x" icon={faPlane} /><br />Travel Approved<br />&nbsp;</li>
          <li><FontAwesomeIcon className="fa-2x" icon={faEllipsisH} /><br />Activities<br />&nbsp;<br />&nbsp;</li>
          <li><FontAwesomeIcon className="fa-2x" icon={faFileContract} /><br />Closeout Review<br />&nbsp;</li>
        </ul>
      )
    }
    return (
      <ul className="pizza-tracker">
        <li><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faCommentAlt} /><br />TTA Request Submitted<br />{shortDate(createdAt)}</li>
        <li><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faUserPlus} /><br />Specialist Assigned<br />{shortDate(moment(createdAt).add(1, 'week'))}</li>
        <li><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faPlane} /><br />Travel Approved<br />{shortDate(moment(createdAt).add(2, 'weeks'))}</li>
        {activityReports.map(({id, attributes: {startDate, contactMethod}}) => (
          <li key={id}><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={this.activityIcon(contactMethod)} /><br />{contactMethod} Activity<br />{shortDate(startDate)}</li>
        ))}
        <li><FontAwesomeIcon className="tracker-today fa-2x" icon={faCalendarAlt} /><br />Today<br/>&nbsp;<br/>&nbsp;</li>
        <li><FontAwesomeIcon className="fa-2x" icon={faUsers} /><br />Site Visit Activity<br />{shortDate(moment().add(1, 'week'))}</li>
        <li><FontAwesomeIcon className="fa-2x" icon={faFileContract} /><br />Closeout Review<br/>&nbsp;</li>
      </ul>
    )
  }
}

export default TrackerTimeline
