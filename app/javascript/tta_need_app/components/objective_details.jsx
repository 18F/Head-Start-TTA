import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'
import { SubtasksList } from '../containers/tasks'

class ObjectiveDetails extends PureComponent {
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
    let completedByName = "someone"
    if (completedBy) {
      completedByName = completedBy.attributes.name
    }
    const { complete } = this.state
    return (
      <div className="box">
        <h4>Objective:</h4>
        <p className="task-metadata">Created by {createdByName} on: {moment(createdAt).format("M/D/YYYY")}</p>
        {complete &&
          <Fragment>
            <FontAwesomeIcon className="fa-lg" icon={faCheckCircle} style={{color: "green"}} />
            <p className="task-metadata" style={{display: "inline-block", marginLeft: "0.5em"}}>
              Marked complete by {completedByName} on: {moment(completedAt).format("M/D/YYYY")}
            </p>
          </Fragment>
        }
        <p>{title}</p>
        {stringPresent(notes) && <p><em>Notes:</em> {notes}</p>}
        <hr />
        {subtasksComplete && !complete &&
          <Fragment>
            <p>No outstanding action items for this objective</p>
            <div className="grid-row">
              <div className="grid-col-8">
                <h4 style={{marginTop: "0.75rem"}}>Is this objective complete?</h4>
              </div>
              <div className="grid-col-4">
                <button className="usa-button" onClick={this.markComplete}>Yes</button>
                <button className="usa-button usa-button--secondary" onClick={() => alert("What should happen now?")}>No</button>
              </div>
            </div>
            <hr />
          </Fragment>
        }
        <ul className="usa-list usa-list--unstyled next-steps-list">
          <SubtasksList taskId={taskId} taskUpdated={refetch} />
        </ul>
      </div>
    )
  }
}

export default ObjectiveDetails
