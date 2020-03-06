import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'
import { SubtasksList } from '../containers/tasks'

class ObjectiveDetails extends PureComponent {
  complete() {
    const { task: {attributes: {status}} } = this.props
    return status === "complete"
  }
  render() {
    const {
      task: {
        id: taskId,
        attributes: {
          title,
          notes,
          createdAt,
          completedAt,
          subtasksComplete
        }
      },
      createdBy: {
        attributes: {
          name: createdByName
        }
      },
      assignedTo,
      completedBy
    } = this.props
    return (
      <div className="box">
        <h4>Objective:</h4>
        <p className="task-metadata">Created by {createdByName} on: {moment(createdAt).format("M/D/YYYY")}</p>
        {this.complete() &&
          <Fragment>
            <FontAwesomeIcon className="fa-lg" icon={faCheckCircle} style={{color: "green"}} />
            <p className="task-metadata" style={{display: "inline-block", marginLeft: "0.5em"}}>
              Marked complete by {completedBy.attributes.name} on: {moment(completedAt).format("M/D/YYYY")}
            </p>
          </Fragment>
        }
        <p>{title}</p>
        {stringPresent(notes) && <p><em>Notes:</em> {notes}</p>}
        <hr />
        {subtasksComplete && !this.complete() &&
          <Fragment>
            <p>No outstanding action items for this objective</p>
            <div className="grid-row">
              <div className="grid-col-8">
                <h4 style={{marginTop: "0.75rem"}}>Is this objective complete?</h4>
              </div>
              <div className="grid-col-4">
                <button className="usa-button" onClick={() => alert("Done!")}>Yes</button>
                <button className="usa-button usa-button--secondary" onClick={() => alert("More to do!")}>No</button>
              </div>
            </div>
            <hr />
          </Fragment>
        }
        <ul className="usa-list usa-list--unstyled next-steps-list">
          <SubtasksList taskId={taskId} />
        </ul>
      </div>
    )
  }
}

export default ObjectiveDetails
