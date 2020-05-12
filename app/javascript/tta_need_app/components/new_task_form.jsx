import React, { PureComponent } from 'react'
import { stringPresent } from 'common/utils'
import { filter } from 'lodash'

class NewTaskForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      links: [""]
    }
    this.updateTask = this.updateTask.bind(this)
    this.keyUp = this.keyUp.bind(this)
    this.createTask = this.createTask.bind(this)
    this.addLink = this.addLink.bind(this)
  }
  updateTask({target: {value}}) {
    this.setState({title: value})
  }
  keyUp({key}) {
    if (key === "Enter") {
      this.createTask()
    }
  }
  createTask() {
    const { createTask } = this.props
    const { title, links } = this.state
    const filteredLinks = filter(links, (l) => (stringPresent(l)))
    createTask(title, filteredLinks).then(() => this.setState({title: "", links: [""]}))
  }
  formSubmission(event) {
    event.preventDefault()
  }
  updateLink(index, link) {
    const newLinks = [...this.state.links]
    newLinks.splice(index, 1, link)
    this.setState({links: newLinks})
  }
  addLink(e) {
    e.preventDefault()
    const { links } = this.state
    this.setState({links: [...links, ""]})
  }
  render() {
    const { title, links } = this.state
    const { label } = this.props
    return (
      <div className="box box--bottom-padded">
        <form className="usa-form usa-form--large" onSubmit={this.formSubmission}>
          <label className="usa-label" htmlFor="new-objective-title">{label}:</label>
          <input type="text" className="usa-input" id="new-objective-title" value={title} onChange={this.updateTask} onKeyUp={this.keyUp} autoComplete="off" />
          <label className="usa-label" htmlFor="new-objective-links-0">Links</label>
          {links.map((link,index) => (
            <input key={index} type="text" className="usa-input" id={`new-objetive-links-${index}`} value={link} onChange={(e) => { this.updateLink(index, e.target.value) }} />
          ))}
          <p style={{margin: 0}}><a href="#" onClick={this.addLink}>Add another link</a></p>
          <button className="usa-button usa-button--outline" type="button" onClick={() => alert("Tell us what you would have attached here")}>Add attachment</button>
          <br />
          <button className="usa-button" type="button" onClick={this.createTask}>Save</button>
        </form>
      </div>
    )
  }
}

export default NewTaskForm
