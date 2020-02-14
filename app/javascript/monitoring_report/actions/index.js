export const SET_APP_CONFIG = "SET_APP_CONFIG"
export const TOGGLE_REQUEST_FORM = "TOGGLE_REQUEST_FORM"
export const SET_REPORT_DETAILS = "SET_REPORT_DETAILS"

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

export const submitRequest = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: false
})

export const setReportDetails = details => ({
  type: SET_REPORT_DETAILS,
  details
})
