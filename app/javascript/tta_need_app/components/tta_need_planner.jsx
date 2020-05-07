import React, { PureComponent, Fragment } from 'react'
import needDetailsBox from '../containers/need_details_box'
import PlanningDetailsComponent from './planning_details_box'
import { GoalsList } from '../containers/tasks'

class TTANeedPlanner extends PureComponent {
  render() {
    const {
      ttaNeed
    } = this.props
    if (ttaNeed == null) {
      return (<p>Loading</p>)
    }
    const { id: ttaNeedId } = ttaNeed
    const PlanningDetailsBox = needDetailsBox(PlanningDetailsComponent)
    return (
      <Fragment>
        <h1>TTA Planning</h1>
        <PlanningDetailsBox ttaNeed={ttaNeed} />
        <GoalsList ttaNeedId={ttaNeedId} planning={true} />
      </Fragment>
    )
  }
}

export default TTANeedPlanner
