import React, { PureComponent, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent, renderMarkdown, shortDate } from 'common/utils'
import { ObjectivesList } from '../containers/tasks'

class GoalDetails extends PureComponent {
  constructor(props) {
    super(props)
    const { task: {attributes: {status}} } = this.props
    this.state = {
      complete: (status === "complete")
    }
    this.markComplete = this.markComplete.bind(this)
  }
  get title() {
    const { task: {attributes: {title}} } = this.props
    return renderMarkdown(title)
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
      reporting,
      activitiesCompleted
    } = this.props
    const { complete } = this.state
    return activitiesCompleted && subtasksComplete && !complete && (reporting || !planning)
  }
  render() {
    const {
      task: {
        id: taskId,
        attributes: {
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
    const { complete } = this.state
    let completedByName = "someone"
    if (completedBy) {
      completedByName = completedBy.attributes.name
    }
    return (
      <div className="box box--bottom-padded">
        <h2 className="hinted">Goal:</h2>
        <p className="usa-hint">Goals are broad statements that describe how TTA will support grantee's wants and needs</p>
        <p className="task-metadata">Goal created by {createdByName} on: {shortDate(createdAt)}</p>
        <div dangerouslySetInnerHTML={this.title}></div>
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
        {this.showCompletion &&
          <Fragment>
            <div className="grid-row">
              <div className="grid-col">
                <button className="usa-button" onClick={this.markComplete}>Mark goal complete</button>
              </div>
            </div>
            <hr />
          </Fragment>
        }
        {planning && !reporting &&
          <Fragment>
            <h3 className="hinted">Define Activity Objectives - How will you meet this goal?</h3>
            <p className="usa-hint">
              Describe your objectives for this activity. What must be accomplished to achive this goal?<br />
              They should be specific, measurable, attainable, realistic, and time-bound (SMART)
            </p>
          </Fragment>
        }
        <ObjectivesList taskId={taskId} planning={planning} reporting={reporting} taskUpdated={refetch} />
      </div>
    )
  }
}

export default GoalDetails
