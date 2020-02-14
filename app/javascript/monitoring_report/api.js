import { buildApi, get, post } from 'redux-bees'
import camelcaseKeys from 'camelcase-keys'
import store from './store'

const apiEndpoints = {
  getMonitoringReport: { method: get, path: "/monitoring_reports/:id" },
  getTopics: { method: get, path: "/topics" },
  createNeed: { method: post, path: "/grantees/:granteeId/tta_needs" },
  createTask: { method: post, path: "/tta_needs/:ttaNeedId/tasks" }
}

const config = {
  baseUrl() {
    return store.getState().app.endpoint;
  },
  afterResolve({status, headers, body}) {
    return Promise.resolve({status, headers, body: camelcaseKeys(body, {deep: true})})
  },
  configureHeaders(headers) {
    return {
      ...headers,
      "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
    }
  }
}

export default buildApi(apiEndpoints, config)
