import React, { PureComponent } from 'react'

class Task extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {title: props.title}
    this.updateTask = this.updateTask.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
  }
  updateTask({target: {value}}) {
    this.setState({title: value})
    const { updateTask } = this.props
    updateTask(value)
  }
  addNewTask({key}) {
    if (key === "Enter") {
      const { addTask } = this.props
      addTask()
    }
  }
  render() {
    const { removeTask, allowRemove } = this.props
    const { title } = this.state
    return (
      <div className="task">
        <div className="task-row">
          <input type="text" className="usa-input" value={title} onChange={this.updateTask} onKeyUp={this.addNewTask} />
        </div>
        {allowRemove &&
          <button className="usa-button usa-button--secondary" type="button" onClick={removeTask}>Remove outcome</button>
        }
      </div>
    )
  }
}

export default Task
