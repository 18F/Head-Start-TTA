import { buildApi, get } from 'redux-bees'
import { config } from 'common/api'

const apiEndpoints = {
  getGrantee: { method: get, path: "/grantees/:id" }
}
export default buildApi(apiEndpoints, config)
