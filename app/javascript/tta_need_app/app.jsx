import React, { PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import TTARequestForm from './containers/tta_request_form'
import TTANeedTracker from './containers/tta_need_tracker'
import TTANeedPlanner from './containers/tta_need_planner'
import TTANeedReporter from './containers/tta_need_reporter'

class TTANeedApp extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/grantees/:granteeId/tta_needs/new" component={TTARequestForm} />
          <Route path="/grantees/:granteeId/tta_plans/new">
            <p>Plans App!</p>
          </Route>
          <Route path="/tta_needs/:ttaNeedId/plan/:planId/report" component={TTANeedReporter} />
          <Route path="/tta_needs/:id/plan" component={TTANeedPlanner} />
          <Route path="/tta_needs/:id" component={TTANeedTracker} />
        </Switch>
      </Router>
    )
  }
}

export default TTANeedApp
