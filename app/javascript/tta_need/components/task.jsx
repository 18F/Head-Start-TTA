import React, { PureComponent } from 'react'

class Task extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {title: props.task.title}
    this.updateTask = this.updateTask.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
  }
  updateTask({target: {value}}) {
    this.setState({title: value})
    const { updateTask } = this.props
    updateTask(value)
  }
  addNewTask({key}) {
    const {title} = this.state
    if (key === "Enter" && title !== "") {
      const { addTask } = this.props
      addTask()
    }
  }
  render() {
    const { removeTask, allowRemove, task: {key} } = this.props
    const { title } = this.state
    return (
      <div className="task">
        <div className="task-row">
          <label>
            Goal <span className="visually-hidden">{key}</span>
            <input autoFocus={allowRemove} type="text" className="usa-input" value={title} onChange={this.updateTask} onKeyUp={this.addNewTask} />
          </label>
        </div>
        {allowRemove &&
          <button className="usa-button usa-button--secondary" type="button" onClick={removeTask}>Remove goal <span className="visually-hidden">{key}</span></button>
        }
      </div>
    )
  }
}

export default Task
