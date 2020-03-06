import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'
import { ObjectivesList } from '../containers/tasks'

class OutcomeDetails extends PureComponent {
  complete() {
    const { task: {attributes: {status}} } = this.props
    return status === "complete"
  }
  render() {
    const {
      task: {
        id: taskId,
        attributes: {
          status,
          title,
          notes,
          createdAt,
          dueDate,
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
        <div className="grid-row">
          <div className="grid-col">
            <h3>Anticipated Outcome</h3>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col-1" style={{textAlign: "center"}}>
            <FontAwesomeIcon className="fa-2x" icon={faUser} />
          </div>
          <div className="grid-col">
            <p style={{marginTop: 0, color: "slategray"}}>Outcome created by {createdByName} on: {moment(createdAt).format("M/D/YYYY")}</p>
            <p>{title}</p>
            {stringPresent(notes) &&
              <p>{notes}</p>
            }
          </div>
        </div>
        <hr />
        {subtasksComplete &&
          <Fragment>
            <p>No outstanding objectives for this outcome</p>
            <div className="grid-row">
              <div className="grid-col-8">
                <h4 style={{marginTop: "0.75rem"}}>Is this outcome complete?</h4>
              </div>
              <div className="grid-col-4">
                <button className="usa-button" onClick={() => alert("Done!")}>Yes</button>
                <button className="usa-button usa-button--secondary" onClick={() => alert("More to do!")}>No</button>
              </div>
            </div>
            <hr />
          </Fragment>
        }
        <ObjectivesList taskId={taskId} />
      </div>
    )
  }
}

export default OutcomeDetails
