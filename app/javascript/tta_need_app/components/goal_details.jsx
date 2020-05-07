import React, { PureComponent, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'
import { ObjectivesList } from '../containers/tasks'
import { shortDate } from 'common/utils'

class GoalDetails extends PureComponent {
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
      planning,
      refetch
    } = this.props
    const { complete } = this.state
    let completedByName = "someone"
    if (completedBy) {
      completedByName = completedBy.attributes.name
    }
    return (
      <div className="box box--bottom-padded">
        <h3>TTA Goal</h3>
        <p className="task-metadata">TTA Goal created by {createdByName} on: {shortDate(createdAt)}</p>
        <p>{title}</p>
        {stringPresent(notes) &&
          <p><em>Notes:</em> {notes}</p>
        }
        {complete &&
          <Fragment>
            <FontAwesomeIcon className="fa-lg" icon={faCheckCircle} style={{color: "green"}} />
            <p className="task-metadata" style={{display: "inline-block", marginLeft: "0.5em"}}>
              Marked complete by {completedByName} on: {shortDate(completedAt)}
            </p>
          </Fragment>
        }
        <hr />
        {!planning && subtasksComplete && !complete &&
          <Fragment>
            <div className="grid-row">
              <div className="grid-col-8">
                <h4 style={{marginTop: "0.75rem"}}>Is this goal complete?</h4>
              </div>
              <div className="grid-col-4">
                <button className="usa-button" onClick={this.markComplete}>Yes</button>
                <button className="usa-button usa-button--secondary" onClick={() => alert("What should happen now?")}>No</button>
              </div>
            </div>
            <hr />
          </Fragment>
        }
        {planning && <h4>How will you meet this goal?</h4>}
        <ObjectivesList taskId={taskId} planning={planning} taskUpdated={refetch} />
      </div>
    )
  }
}

export default GoalDetails
