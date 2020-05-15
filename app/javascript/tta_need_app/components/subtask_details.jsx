import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { stringPresent } from 'common/utils'

class SubtaskDetails extends PureComponent {
  constructor(props) {
    super(props)
    const { task: {attributes: {status, notes, links}} } = this.props
    this.state = {
      complete: (status === "complete"),
      notes,
      links
    }
    this.toggleStatus = this.toggleStatus.bind(this)
    this.updateLink = this.updateLink.bind(this)
    this.addLink = this.addLink.bind(this)
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
  updateLink(id, index, link) {
    const newLinks = [...this.state.links]
    newLinks.splice(index, 1, link)
    const { setTaskLinks } = this.props
    this.setState({links: newLinks}, () => { setTaskLinks(id, newLinks) })
  }
  addLink(e) {
    e.preventDefault()
    const { links } = this.state
    this.setState({links: [...links, ""]})
  }
  linksDisplay() {
    const { reporting, task: {id: taskId} } = this.props
    const { links } = this.state
    if (!reporting && links.length === 0) {
      return null
    } else if (reporting) {
      const divId = `task-${taskId}-materials`
      return (
        <div className="usa-accordion usa-accordion--bordered">
          <h5 className="usa-accordion__heading">
            <button className="usa-accordion__button" aria-expanded="false" aria-controls={divId}>Supplemental Materials and Resources</button>
          </h5>
          <div id={divId} className="usa-accordion__content" hidden={true}>
            <form className="usa-form">
              {links.map((link, index) => (
                <input key={index} type="text" className="usa-input" value={link} onChange={(e) => { this.updateLink(taskId, index, e.target.value) }} />
              ))}
              <p style={{margin: 0}}><a href="#" onClick={this.addLink}>Add {links.length === 0 ? "a" : "another"} link</a></p>
              <button className="usa-button usa-button--outline" type="button" onClick={() => alert("Tell us what you would have attached here")}>Add attachment</button>
            </form>
          </div>
        </div>
      )
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
  notesField() {
    const {
      reporting,
      task: {id}
    } = this.props
    const { notes } = this.state
    if (reporting) {
      return (
        <form className="usa-form usa-form--bottom-margin usa-form--left-margin">
          <label className="usa-label" htmlFor={`notes-${id}`} style={{marginTop: "0.5rem"}}>Task Notes</label>
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
    const { task: {attributes: {title}} } = this.props
    return (
      <li>
        {this.checkIcon()}
        &nbsp;
        <span style={{fontSize: "1.06rem"}}>{title}</span>
        {this.linksDisplay()}
        {this.notesField()}
      </li>
    )
  }
}

export default SubtaskDetails
