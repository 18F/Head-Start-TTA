import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TTANeedApp from 'tta_need_app/app'
import store from 'tta_need_app/store'
import { setGranteeId } from 'tta_need/actions'
import 'core-js'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'

const target = document.getElementById("tta-need-form")
store.dispatch(setGranteeId(target.getAttribute("data-grantee-id")))

render(
  <Provider store={store}>
    <TTANeedApp />
  </Provider>,
  target
)
