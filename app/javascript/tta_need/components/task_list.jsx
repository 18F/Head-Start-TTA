import React, { PureComponent } from 'react'
import Task from './task'

class TaskList extends PureComponent {
  render() {
    const {
      tasks,
      updateTask,
      removeTask,
      addTask
    } = this.props
    return (
      <div className="box">
        {tasks.map((t, i) => (
          <Task key={t.key} allowRemove={tasks.length !== 1} title={t.title} updateTask={value => { updateTask(value, i) }} removeTask={() => { removeTask(i) }} />
        ))}
        <button className="usa-button" type="button" onClick={addTask}>Add outcome</button>
      </div>
    )
  }
}

export default TaskList
