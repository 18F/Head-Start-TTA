import React, { PureComponent } from 'react'
import GranteeDetails from '../containers/grantee_details'

class TTANeedForm extends PureComponent {
  render() {
    const {
      closeForm,
      report
    } = this.props
    return (
      <div className="grid-col">
        <h2>TTA Request</h2>
        <GranteeDetails report={report} />
        <form>
          <p>Show the form</p>
          <button className="usa-button" onClick={() => { closeForm() }}>Close Form</button>
        </form>
      </div>
    )
  }
}

export default TTANeedForm
