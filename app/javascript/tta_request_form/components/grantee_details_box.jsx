import React, { PureComponent } from 'react'

class GranteeDetailsBox extends PureComponent {
  render() {
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-6">
            <h3>Children and Children First</h3>
            <p><strong>Grant(s)</strong> badgadfas</p>
            <p><strong>Location</strong> Portland, OR</p>
            <p><strong>Point of Contact</strong> Fred Armisen</p>
          </div>
          <div className="grid-col-6">
            <h3>Region 14</h3>
            <p><strong>Program Specialist</strong> Bob Last-Name</p>
          </div>
        </div>
      </div>
    )
  }
}

export default GranteeDetailsBox
