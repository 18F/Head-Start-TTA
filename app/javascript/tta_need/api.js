import { buildApi, get, post } from 'redux-bees'
import { config } from 'common/api'

const apiEndpoints = {
  getTopics: { method: get, path: "/topics" },
  createNeed: { method: post, path: "/grantees/:granteeId/tta_needs" },
  createTask: { method: post, path: "/tta_needs/:ttaNeedId/tasks" }
}
export default buildApi(apiEndpoints, config)
