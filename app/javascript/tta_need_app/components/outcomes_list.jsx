import React, { PureComponent, Fragment } from 'react'
import OutcomeDetails from '../containers/outcome_details'

class OutcomesList extends PureComponent {
  render() {
    const { tasks } = this.props
    if (tasks == null) {
      return (<p>Loading tasks...</p>)
    }
    return (
      <Fragment>
        {tasks.map((t,i) => (
          <OutcomeDetails key={i} task={t} />
        ))}
      </Fragment>
    )
  }
}

export default OutcomesList
