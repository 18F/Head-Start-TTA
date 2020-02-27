import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MonitoringReportApp from 'monitoring_report/app'
import store from 'monitoring_report/store'
import { setReportId } from 'monitoring_report/actions'
import 'core-js'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'

const target = document.getElementById("monitoring-report")
store.dispatch(setReportId(target.getAttribute("data-report-id")))

render(
  <Provider store={store}>
    <MonitoringReportApp />
  </Provider>,
  target
)
