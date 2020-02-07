export const SET_APP_CONFIG = "SET_APP_CONFIG"
export const TOGGLE_REQUEST_FORM = "TOGGLE_REQUEST_FORM"
export const SET_BODY = "SET_BODY"

export const setAppConfig = config => ({
  type: SET_APP_CONFIG,
  config
})

export const openForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: true
})

export const closeForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: false
})

export const setReportBody = body => ({
  type: SET_BODY,
  body
})
