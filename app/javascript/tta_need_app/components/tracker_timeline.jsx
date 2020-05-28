import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
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
import { findIndex } from 'lodash'

class TrackerTimeline extends PureComponent {
  activityIcon(method) {
    if (method === "Virtual") {
      return faLaptop
    } else if (method === "Site Visit" || method === "On-site") {
      return faUsers
    } else {
      return faPhoneVolume
    }
  }
  specialistAssignedStep(date) {
    const { requestedBy: {attributes: {role}} } = this.props
    if (role === "Early Childhood Specialist") {
      return null
    } else {
      return (
        <li>
          <FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faUserPlus} />
          <br />Specialist Assigned<br />{shortDate(date)}
        </li>
      )
    }
  }
  get timelineEntries() {
    const {
      ttaNeed: {id: ttaNeedId},
      activityPlans,
      activityReports
    } = this.props
    let entries = activityPlans.map(({id, attributes: {startAt, format}}) => ({
      startAt,
      id,
      ui: (
        <Fragment>
          <FontAwesomeIcon className="fa-2x" icon={this.activityIcon(format)} /><br />
          <Link to={`/tta_needs/${ttaNeedId}/plan/${id}/report`}>
            {format} Activity<br />{shortDate(startAt)}
          </Link>
        </Fragment>
      )
    }))
    let todayIndex = findIndex(entries, ({startAt}) => (moment(startAt).isAfter(moment())))
    entries.splice(todayIndex, 0, {id: 0, ui: <Fragment><FontAwesomeIcon className="tracker-today fa-2x" icon={faCalendarAlt} /><br />Today<br />&nbsp;<br />&nbsp;</Fragment>})
    return (<Fragment>{entries.map(({id, ui}) => (<li key={id}>{ui}</li>))}</Fragment>)
  }
  render() {
    const {
      ttaNeed: {id: ttaNeedId, attributes: {createdAt}},
      activityPlans
    } = this.props
    if (activityPlans === null) {
      return <p>Loading...</p>
    }
    return (
      <ul className={`pizza-tracker ${activityPlans.length < 4 ? "pizza-tracker--large" : ""}`}>
        <li><FontAwesomeIcon className="tracker-past-activity fa-2x" icon={faCommentAlt} /><br />TTA Need Submitted<br />{shortDate(createdAt)}</li>
        {this.specialistAssignedStep(createdAt)}
        {activityPlans.length === 0 &&
          <Fragment>
            <li><FontAwesomeIcon className="tracker-today fa-2x" icon={faCalendarAlt} /><br />Today<br />&nbsp;<br />&nbsp;</li>
            <li><FontAwesomeIcon className="fa-2x" icon={faEllipsisH} /><br />Activities<br />&nbsp;<br />&nbsp;</li>
          </Fragment>
        }
        {activityPlans.length > 0 && this.timelineEntries}
        <li><FontAwesomeIcon className="fa-2x" icon={faFileContract} /><br />Closeout Review<br />&nbsp;</li>
      </ul>
    )
    // return (
    //   <ul className="pizza-tracker">
    //     {activityReports.map(({id, attributes: {startDate, contactMethod}}) => (
    //       <li key={id}>
    //         <FontAwesomeIcon className="tracker-past-activity fa-2x" icon={this.activityIcon(contactMethod)} /><br />
    //         <Link to={`/tta_needs/${ttaNeedId}/reports/${id}`}>
    //           {contactMethod} Activity<br />{shortDate(startDate)}
    //         </Link>
    //       </li>
    //     ))}
    //     <li><FontAwesomeIcon className="tracker-today fa-2x" icon={faCalendarAlt} /><br />Today<br/>&nbsp;<br/>&nbsp;</li>
    //     <li><FontAwesomeIcon className="fa-2x" icon={faFileContract} /><br />Closeout Review<br/>&nbsp;</li>
    //   </ul>
    // )
  }
}

export default TrackerTimeline
