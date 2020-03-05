import { buildApi, get } from 'redux-bees'
import { config } from 'common/api'

const apiEndpoints = {
  getNeed: { method: get, path: "/tta_needs/:id" },
  getTasks: { method: get, path: "/tta_needs/:ttaNeedId/tasks" }
}
export default buildApi(apiEndpoints, config)
