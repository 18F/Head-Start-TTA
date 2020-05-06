import React, { PureComponent } from 'react'

class ObjectiveForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {title: ""}
    this.updateTask = this.updateTask.bind(this)
    this.keyUp = this.keyUp.bind(this)
    this.createTask = this.createTask.bind(this)
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
    const { parentId, createTask } = this.props
    const { title } = this.state
    createTask(parentId, title).then(() => this.setState({title: ""}))
  }
  formSubmission(event) {
    event.preventDefault()
  }
  render() {
    const { title } = this.state
    return (
      <form className="usa-form usa-form--large" onSubmit={this.formSubmission}>
        <label className="usa-label" htmlFor="new-objective-title">Objective:</label>
        <input type="text" className="usa-input" id="new-objective-title" value={title} onChange={this.updateTask} onKeyUp={this.keyUp} autoComplete="off" />
        <button className="usa-button" type="button" onClick={this.createTask}>Save</button>
      </form>
    )
  }
}

export default ObjectiveForm
