import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import RequestFormApp from 'tta_request_form/app'
import store from 'tta_request_form/store'
import { setAppConfig, setReportDetails } from 'tta_request_form/actions'

const target = document.currentScript

store.dispatch(setAppConfig({
  endpoint: window.location.origin
}))
store.dispatch(setReportDetails({
  id: target.getAttribute("data-report-id"),
  body: target.getAttribute("data-narrative")
}))

render(
  <Provider store={store}>
    <RequestFormApp />
  </Provider>,
  document.getElementById("monitoring-report-body"),
)
