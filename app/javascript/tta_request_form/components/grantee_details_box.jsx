import React, { PureComponent } from 'react'
import { getRelationship } from 'redux-bees'

class GranteeDetailsBox extends PureComponent {
  render() {
    const {
      grant,
      grantee,
      state
    } = this.props
    if (grant == null || grantee == null) {
      return (<div>Loading</div>)
    }
    const people = getRelationship(state, grantee, 'people')
    const {attributes: {number, region}} = grant
    const {attributes: {name}} = grantee
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-6">
            <h3>{name}</h3>
            <p><strong>Grant</strong> {number}</p>
            <p><strong>Point of Contact</strong> TODO</p>
          </div>
          <div className="grid-col-6">
            <h3>{region}</h3>
            <p><strong>Program Specialist</strong> TODO</p>
          </div>
        </div>
      </div>
    )
  }
}

export default GranteeDetailsBox
