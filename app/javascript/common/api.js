import camelcaseKeys from 'camelcase-keys'

const config = {
  baseUrl: window.location.origin,
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

export { config }
