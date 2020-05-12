import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { stringPresent } from 'common/utils'

class SubtaskDetails extends PureComponent {
  constructor(props) {
    super(props)
    const { task: {attributes: {status}} } = this.props
    this.state = {
      complete: (status === "complete")
    }
    this.toggleStatus = this.toggleStatus.bind(this)
  }
  toggleStatus() {
    const { complete } = this.state
    const { task, saveTask } = this.props
    this.setState({complete: !complete}, () => {
      const { complete: newStatus } = this.state
      task.attributes.status = newStatus ? "complete" : "todo"
      saveTask(task)
    })
  }
  checkIcon() {
    const { complete } = this.state
    const { planning, reporting } = this.props
    if (planning && !reporting) {
      return <FontAwesomeIcon className="fa-lg" icon={complete ? faCheckSquare : faSquare} />
    } else {
      return <FontAwesomeIcon style={{cursor: "pointer"}} onClick={this.toggleStatus} className="fa-lg" icon={complete ? faCheckSquare : faSquare} />
    }
  }
  updateNotes = (id, notes) => {
    const { setTaskNotes } = this.props
    this.setState({notes}, () => { setTaskNotes(id, notes) })
  }
  notesField() {
    const {
      reporting,
      task: {id, attributes: {notes}}
    } = this.props
    if (reporting) {
      const { notes: formNotes } = this.state
      return (
        <form className="usa-form usa-form--bottom-margin usa-form--left-margin">
          <label className="usa-label" htmlFor={`notes-${id}`} style={{marginTop: "0.5rem"}}>Notes</label>
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
    const { task: {attributes: {title}} } = this.props
    return (
      <li>
        {this.checkIcon()}
        &nbsp;
        <span style={{fontSize: "1.06rem"}}>{title}</span>
        {this.notesField()}
      </li>
    )
  }
}

export default SubtaskDetails
