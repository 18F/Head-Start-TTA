import React, { PureComponent, Fragment } from 'react'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import { createTask, saveTask } from '../actions'
import GoalDetails from '../components/goal_details'
import NewTaskForm from '../components/new_task_form'
import ObjectiveDetails from '../components/objective_details'
import SubtaskDetails from '../components/subtask_details'

const connectList = (apiName, idName, loadingType, DetailsComponent, newFormLabel) => {
  const q = query('tasks', api[apiName], (perform, props) => (
    perform({
      [idName]: props[idName],
      include: "created-by,assigned-to,completed-by"
    })
  ))

  class TaskList extends PureComponent {
    constructor(props) {
      super(props)
      this.createTask = this.createTask.bind(this)
    }
    createTask(title) {
      const {dispatch, status: {tasks: {refetch}}} = this.props
      return dispatch(createTask(this.props[idName], title)).then(() => {
        if (this.props.taskUpdated) {
          this.props.taskUpdated().then(() => refetch())
        } else {
          refetch()
        }
      })
    }
    render() {
      const {
        tasks,
        taskUpdated,
        planning,
        reporting,
        status: {tasks: {refetch}}
      } = this.props
      if (tasks === null) {
        return (<p>Loading {loadingType}...</p>)
      }
      if (tasks.length === 0 && !planning) {
        return (<p>No {loadingType} have been defined.</p>)
      }
      return (
        <Fragment>
          {tasks.map((t,i) => (
            <DetailsComponent
              key={i}
              task={t}
              planning={planning}
              reporting={reporting}
              taskUpdated={taskUpdated}
              refetch={() => refetch()}
              />
          ))}
          {planning && newFormLabel !== null && <NewTaskForm label={newFormLabel} createTask={this.createTask} />}
        </Fragment>
      )
    }
  }

  return q(TaskList)
}

const connectDetails = InnerComponent => {
  const mapStateToProps = (state, props) => ({
    createdBy: getRelationship(state, props.task, 'createdBy'),
    assignedTo: getRelationship(state, props.task, 'assignedTo'),
    completedBy: getRelationship(state, props.task, 'completedBy')
  })
  const mapDispatchToProps = (dispatch, props) => ({
    saveTask: task => dispatch(saveTask(task)).then(() => {
      if (props.taskUpdated) {
        props.taskUpdated(task)
      }
    })
  })

  return connect(mapStateToProps, mapDispatchToProps)(InnerComponent)
}

export const GoalsList = connectList('getTasks', 'ttaNeedId', "goals", connectDetails(GoalDetails), null)
export const ObjectivesList = connectList('getSubtasks', 'taskId', "objectives", connectDetails(ObjectiveDetails), "New Objective")
export const SubtasksList = connectList('getSubtasks', 'taskId', "next steps", connectDetails(SubtaskDetails), "New Task")
