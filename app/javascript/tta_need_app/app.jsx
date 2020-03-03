import React, { PureComponent, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import TTARequestForm from './containers/tta_request_form'
import TTANeedTracker from './containers/tta_need_tracker'

class TTANeedApp extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/grantees/:granteeId/tta_needs/new" component={TTARequestForm} />
          <Route path="/tta_needs/:id" component={TTANeedTracker} />
        </Switch>
      </Router>
    )
  }
}

export default TTANeedApp
