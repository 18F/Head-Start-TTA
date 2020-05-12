import React, { PureComponent, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'
import { SubtasksList } from '../containers/tasks'
import { shortDate } from 'common/utils'

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
  get showCompletion() {
    const {
      task: {attributes: {subtasksComplete}},
      planning,
      reporting
    } = this.props
    const { complete } = this.state
    return subtasksComplete && !complete && (reporting || !planning)
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
      planning,
      reporting,
      refetch
    } = this.props
    let completedByName = "someone"
    if (completedBy) {
      completedByName = completedBy.attributes.name
    }
    const { complete } = this.state
    return (
      <Fragment>
        <h4>Objective:</h4>
        <p className="task-metadata">Created by {createdByName} on: {shortDate(createdAt)}</p>
        {complete &&
          <Fragment>
            <FontAwesomeIcon className="fa-lg" icon={faCheckCircle} style={{color: "green"}} />
            <p className="task-metadata" style={{display: "inline-block", marginLeft: "0.5em"}}>
              Marked complete by {completedByName} on: {shortDate(completedAt)}
            </p>
          </Fragment>
        }
        <p>{title}</p>
        {stringPresent(notes) && <p><em>Notes:</em> {notes}</p>}
        <ul className="usa-list usa-list--unstyled next-steps-list">
          <SubtasksList taskId={taskId} planning={planning} reporting={reporting} taskUpdated={refetch} />
        </ul>
        {this.showCompletion &&
          <div className="grid-row">
            <div className="grid-col-3 grid-offset-10">
              <button className="usa-button" onClick={this.markComplete}>Mark complete</button>
            </div>
          </div>
        }
        <hr />
      </Fragment>
    )
  }
}

export default ObjectiveDetails
