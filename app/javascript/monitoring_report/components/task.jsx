import React, { PureComponent } from 'react'

class Task extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {title: props.title}
    this.updateTask = this.updateTask.bind(this)
  }
  updateTask(event) {
    const { target: {value} } = event
    this.setState({title: value})
    const { updateTask } = this.props
    updateTask(value)
  }
  render() {
    const { removeTask, allowRemove } = this.props
    const { title } = this.state
    return (
      <div className="task">
        <input type="text" className="usa-input" value={title} onChange={this.updateTask} />
        {allowRemove &&
          <button className="usa-button usa-button--secondary" type="button" onClick={removeTask}>Remove objective</button>
        }
      </div>
    )
  }
}

export default Task
