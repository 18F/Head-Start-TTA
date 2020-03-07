import React, { PureComponent, Fragment } from 'react'
import { query, getRelationship } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import { saveTask } from '../actions'
import OutcomeDetails from '../components/outcome_details'
import ObjectiveDetails from '../components/objective_details'
import SubtaskDetails from '../components/subtask_details'

const connectList = (apiName, idName, loadingType, DetailsComponent) => {
  const q = query('tasks', api[apiName], (perform, props) => (
    perform({
      [idName]: props[idName],
      include: "created-by,assigned-to,completed-by"
    })
  ))

  class TaskList extends PureComponent {
    render() {
      const { tasks, taskUpdated, status: {tasks: {refetch}} } = this.props
      if (tasks === null) {
        return (<p>Loading {loadingType}...</p>)
      }
      if (tasks.length === 0) {
        return (<p>No {loadingType} have been defined yet.</p>)
      }
      return (
        <Fragment>
          {tasks.map((t,i) => (
            <DetailsComponent
              key={i}
              task={t}
              taskUpdated={taskUpdated}
              refetch={() => refetch()}
              />
          ))}
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

export const OutcomesList = connectList('getTasks', 'ttaNeedId', "outcomes", connectDetails(OutcomeDetails))
export const ObjectivesList = connectList('getSubtasks', 'taskId', "objectives", connectDetails(ObjectiveDetails))
export const SubtasksList = connectList('getSubtasks', 'taskId', "next steps", connectDetails(SubtaskDetails))
