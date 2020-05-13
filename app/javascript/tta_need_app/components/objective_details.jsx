import React, { PureComponent, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent, shortDate } from 'common/utils'
import { SubtasksList } from '../containers/tasks'
import showdown from 'showdown'
import xss from 'xss'

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
  updateNotes = (id, notes) => {
    const { setTaskNotes } = this.props
    this.setState({notes}, () => { setTaskNotes(id, notes) })
  }
  linksDisplay() {
    const { task: {attributes: {links}} } = this.props
    if (links.length === 0) {
      return null
    } else {
      return (
        <ul className="usa-list">
          {links.map((link, index) => (
            <li key={index}><a href={link} target="_blank">{link}</a></li>
          ))}
        </ul>
      )
    }
  }
  get title() {
    const { task: {attributes: {title}} } = this.props
    const converter = new showdown.Converter()
    return {__html: xss(converter.makeHtml(title))}
  }
  notesField() {
    const {
      reporting,
      task: {id, attributes: {notes}}
    } = this.props
    if (reporting) {
      const { notes: formNotes } = this.state
      return (
        <form className="usa-form usa-form--large">
          <label className="usa-label" htmlFor={`notes-${id}`}>Notes</label>
          <textarea className="usa-textarea" id={`notes-${id}`} style={{height: "3.5rem"}} value={formNotes} onChange={(e) => { this.updateNotes(id, e.target.value) }} />
        </form>
      )
    } else if (stringPresent(notes)) {
      return (<p><em>Notes:</em> {notes}</p>)
    } else {
      return null
    }
  }
  render() {
    const {
      task: {
        id: taskId,
        attributes: {
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
        <div dangerouslySetInnerHTML={this.title}></div>
        {this.notesField()}
        <div className="grid-row">
          <div className="grid-col-8">
            <ul className="usa-list usa-list--unstyled next-steps-list">
              <SubtasksList taskId={taskId} planning={planning} reporting={reporting} taskUpdated={refetch} />
            </ul>
          </div>
          <div className="grid-col-4">
            {this.linksDisplay()}
          </div>
        </div>
        {this.showCompletion &&
          <div className="grid-row">
            <div className="grid-col">
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
