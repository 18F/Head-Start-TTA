import { trim } from 'lodash'
import api from '../api'

export const UPDATE_TASK = "UPDATE_TASK"
export const ADD_TASK = "ADD_TASK"
export const REMOVE_TASK = "REMOVE_TASK"

export const addTask = () => ({
  type: ADD_TASK
})

export const updateTask = (title, index) => ({
  type: UPDATE_TASK,
  title,
  index
})

export const removeTask = (index) => ({
  type: REMOVE_TASK,
  index
})

export const saveTasks = (ttaNeedId) => {
  return (dispatch, getState) => {
    const { tasks } = getState()
    tasks.forEach(t => {
      const title = trim(t.title)
      if (title !== "") {
        dispatch(api.createTask({ttaNeedId}, {data: {
          type: "tasks",
          attributes: {
            status: "todo",
            title: title
          }
        }}))
      }
    })
  }
}
