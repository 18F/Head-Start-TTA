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
    const allowRemove = tasks.length !== 1
    return (
      <div className="box">
        {tasks.map((t, i) => (
          <Task key={t.key} allowRemove={allowRemove} title={t.title} updateTask={value => updateTask(value, i)} removeTask={() => removeTask(i)} addTask={addTask} />
        ))}
        <button className="usa-button" type="button" onClick={addTask}>Add outcome</button>
      </div>
    )
  }
}

export default TaskList
