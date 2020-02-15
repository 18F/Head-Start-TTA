import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MonitoringReportApp from 'monitoring_report/app'
import store from 'monitoring_report/store'
import { setAppConfig, setReportId } from 'monitoring_report/actions'

const target = document.currentScript

store.dispatch(setAppConfig({
  endpoint: window.location.origin
}))
store.dispatch(setReportId(target.getAttribute("data-report-id")))

render(
  <Provider store={store}>
    <MonitoringReportApp />
  </Provider>,
  document.getElementById("monitoring-report")
)
