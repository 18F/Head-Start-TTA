import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import RequestFormApp from 'tta_request_form/app'
import store from 'tta_request_form/store'
import { setAppConfig } from 'tta_request_form/actions'

store.dispatch(setAppConfig({
  endpoint: window.location.origin
}))

render(
  <Provider store={store}>
    <RequestFormApp />
  </Provider>,
  document.getElementById("tta-request-form"),
)
