import { buildApi, get, post } from 'redux-bees'
import { config } from 'common/api'

const apiEndpoints = {
  getMonitoringReport: { method: get, path: "/monitoring_reports/:id" }
}
export default buildApi(apiEndpoints, config)
