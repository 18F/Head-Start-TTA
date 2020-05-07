import React, { PureComponent, Fragment } from 'react'
import { GoalsList } from '../containers/tasks'

class ActivityPlanForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      start_date: "",
      location: "",
      format: "",
      audience: ""
    }
    this.savePlan = this.savePlan.bind(this)
  }
  savePlan() {
    const { createPlan } = this.props
    const { start_date, location, format, audience } = this.state
    createPlan(start_date, location, format, audience)
  }
  render() {
    const { ttaNeed: {id: ttaNeedId} } = this.props
    return (
      <Fragment>
        <form className="usa-form usa-form--large">
        </form>
        <GoalsList ttaNeedId={ttaNeedId} planning={true} />
        <button className="usa-button" onClick={this.savePlan}>Save plan</button>
      </Fragment>
    )
  }
}

export default ActivityPlanForm
