export * from './tta_need'
export * from './tasks'

export const SET_APP_CONFIG = "SET_APP_CONFIG"
export const SET_REPORT_ID = "SET_REPORT_ID"

export const setAppConfig = config => ({
  type: SET_APP_CONFIG,
  config
})

export const setReportId = id => ({
  type: SET_REPORT_ID,
  id
})
