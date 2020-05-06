import React, { PureComponent, Fragment } from 'react'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import { createTask, saveTask } from '../actions'
import GoalDetails from '../components/goal_details'
import ObjectiveForm from '../components/objective_form'
import ObjectiveDetails from '../components/objective_details'
import SubtaskDetails from '../components/subtask_details'

const connectList = (apiName, idName, loadingType, DetailsComponent, NewForm) => {
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
    createTask(parentId, title) {
      const {dispatch, status: {tasks: {refetch}}} = this.props
      return dispatch(createTask(parentId, title)).then(() => refetch())
    }
    render() {
      const {
        tasks,
        taskUpdated,
        planning,
        status: {tasks: {refetch}}
      } = this.props
      if (tasks === null) {
        return (<p>Loading {loadingType}...</p>)
      }
      if (tasks.length === 0 && !planning) {
        return (<p>No {loadingType} have been defined yet.</p>)
      }
      return (
        <Fragment>
          {tasks.map((t,i) => (
            <DetailsComponent
              key={i}
              task={t}
              planning={planning}
              taskUpdated={taskUpdated}
              refetch={() => refetch()}
              />
          ))}
          {planning && NewForm !== null && <NewForm parentId={this.props[idName]} createTask={this.createTask} />}
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
export const ObjectivesList = connectList('getSubtasks', 'taskId', "objectives", connectDetails(ObjectiveDetails), ObjectiveForm)
export const SubtasksList = connectList('getSubtasks', 'taskId', "next steps", connectDetails(SubtaskDetails), null)
