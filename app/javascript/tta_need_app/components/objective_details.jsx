import React, { PureComponent, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { stringPresent, renderMarkdown, shortDate } from 'common/utils'
import { SubtasksList } from '../containers/tasks'

class ObjectiveDetails extends PureComponent {
  constructor(props) {
    super(props)
    const { task: {attributes: {status, notes, links}} } = this.props
    this.state = {
      complete: (status === "complete"),
      notes,
      links
    }
    this.markComplete = this.markComplete.bind(this)
    this.updateLink = this.updateLink.bind(this)
    this.addLink = this.addLink.bind(this)
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
    return subtasksComplete && !complete && (reporting || (!planning && activitiesCompleted))
  }
  updateNotes = (id, notes) => {
    const { setTaskDetails } = this.props
    const { links } = this.state
    this.setState({notes}, () => { setTaskDetails(id, notes, links) })
  }
  updateLink(id, index, link) {
    const { notes, links } = this.state
    const newLinks = [...links]
    newLinks.splice(index, 1, link)
    const { setTaskDetails } = this.props
    this.setState({links: newLinks}, () => { setTaskDetails(id, notes, newLinks) })
  }
  addLink(e) {
    e.preventDefault()
    const { links } = this.state
    this.setState({links: [...links, ""]})
  }
  linksDisplay() {
    const { reporting, planning, task: {id: taskId} } = this.props
    const { links } = this.state
    if (reporting || planning) {
      const divId = `task-${taskId}-materials`
      return (
        <Fragment>
          <h4>Supplemental Materials and Resources</h4>
          <form className="usa-form">
            {links.map((link, index) => (
              <input key={index} type="text" className="usa-input" value={link} onChange={(e) => { this.updateLink(taskId, index, e.target.value) }} />
            ))}
            <p style={{margin: 0}}><a href="#" onClick={this.addLink}>Add {links.length === 0 ? "a" : "another"} link</a></p>
            <button className="usa-button usa-button--outline" type="button" onClick={() => alert("Tell us what you would have attached here")}>Add attachment</button>
          </form>
        </Fragment>
      )
    } else if (links.length === 0) {
      return null
    } else {
      return (
        <Fragment>
          <h4>Supplemental Materials</h4>
          <ul className="usa-list">
            {links.map((link, index) => (
              <li key={index}><a href={link} target="_blank" rel="noopener">{link}</a></li>
            ))}
          </ul>
        </Fragment>
      )
    }
  }
  get title() {
    const { task: {attributes: {title}} } = this.props
    return renderMarkdown(title)
  }
  notesField() {
    const {
      reporting,
      task: {id}
    } = this.props
    const { notes } = this.state
    if (reporting) {
      return (
        <form className="usa-form usa-form--large">
          <label className="usa-label" htmlFor={`notes-${id}`}>Objective Notes <span className="usa-hint">(Optional)</span></label>
          <textarea className="usa-textarea" id={`notes-${id}`} style={{height: "3.5rem"}} value={notes} onChange={(e) => { this.updateNotes(id, e.target.value) }} />
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
      activitiesCompleted,
      refetch
    } = this.props
    let completedByName = "someone"
    if (completedBy) {
      completedByName = completedBy.attributes.name
    }
    const { complete } = this.state
    return (
      <Fragment>
        <h3>Objective:</h3>
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
        <div className="grid-row">
          <div className="grid-col-8">
            <h4 className="hinted">Tasks</h4>
            <p className="usa-hint">What specific steps and actions will happen at the activity to make progress on this objective?</p>
            <ul className="usa-list usa-list--unstyled next-steps-list">
              <SubtasksList taskId={taskId} planning={planning} reporting={reporting} activitiesCompleted={activitiesCompleted} taskUpdated={refetch} />
            </ul>
          </div>
          <div className="grid-col-4">
            {this.linksDisplay()}
          </div>
        </div>
        {this.notesField()}
        {this.showCompletion &&
          <div className="grid-row">
            <div className="grid-col usa-form">
              <button className="usa-button" onClick={this.markComplete}>Mark objective complete</button>
            </div>
          </div>
        }
        <hr />
      </Fragment>
    )
  }
}

export default ObjectiveDetails
