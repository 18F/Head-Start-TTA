import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'
import { ObjectivesList } from '../containers/tasks'

class OutcomeDetails extends PureComponent {
  constructor(props) {
    super(props)
    const { task: {attributes: {status}} } = this.props
    this.state = {
      complete: (status === "complete")
    }
    this.markComplete = this.markComplete.bind(this)
  }
  markComplete() {
    const { task, saveTask } = this.props
    this.setState({complete: true}, () => {
      saveTask({...task, attributes: {...task.attributes, status: "complete"}})
    })
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
      completedBy,
      refetch
    } = this.props
    const { complete } = this.state
    let completedByName = "someone"
    if (completedBy) {
      completedByName = completedBy.attributes.name
    }
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
            <p className="task-metadata">Outcome created by {createdByName} on: {moment(createdAt).format("M/D/YYYY")}</p>
            <p>{title}</p>
            {stringPresent(notes) &&
              <p><em>Notes:</em> {notes}</p>
            }
          </div>
        </div>
        {complete &&
          <Fragment>
            <FontAwesomeIcon className="fa-lg" icon={faCheckCircle} style={{color: "green"}} />
            <p className="task-metadata" style={{display: "inline-block", marginLeft: "0.5em"}}>
              Marked complete by {completedByName} on: {moment(completedAt).format("M/D/YYYY")}
            </p>
          </Fragment>
        }
        <hr />
        {subtasksComplete && !complete &&
          <Fragment>
            <p>No outstanding objectives for this outcome</p>
            <div className="grid-row">
              <div className="grid-col-8">
                <h4 style={{marginTop: "0.75rem"}}>Is this outcome complete?</h4>
              </div>
              <div className="grid-col-4">
                <button className="usa-button" onClick={this.markComplete}>Yes</button>
                <button className="usa-button usa-button--secondary" onClick={() => alert("What should happen now?")}>No</button>
              </div>
            </div>
            <hr />
          </Fragment>
        }
        <ObjectivesList taskId={taskId} taskUpdated={refetch} />
      </div>
    )
  }
}

export default OutcomeDetails
