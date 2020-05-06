import { buildApi, get, patch, post } from 'redux-bees'
import { config } from 'common/api'

const apiEndpoints = {
  getNeed: { method: get, path: "/tta_needs/:id" },
  getTasks: { method: get, path: "/tta_needs/:ttaNeedId/tasks" },
  getSubtasks: { method: get, path: "/tasks/:taskId/subtasks" },
  createTask: { method: post, path: "/tasks/:parentId/subtasks" },
  saveTask: { method: patch, path: "/tasks/:id" }
}
export default buildApi(apiEndpoints, config)
