import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TTANeedApp from 'tta_need_app/app'
import store from 'tta_need_app/store'
import 'core-js'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'

render(
  <Provider store={store}>
    <TTANeedApp />
  </Provider>,
  document.getElementById("tta-need-app")
)
