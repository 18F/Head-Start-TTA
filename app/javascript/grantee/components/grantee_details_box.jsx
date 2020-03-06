import React, { PureComponent, Fragment } from 'react'
import PersonListDetails from './person_list_details'
import GrantsList from './grants_list'

class GranteeDetailsBox extends PureComponent {
  render() {
    const {
      grants,
      grantee,
      employees,
      specialists
    } = this.props
    if (grantee == null) {
      return (<div>Loading</div>)
    }
    const {id: granteeId, attributes: {name}} = grantee
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-8">
            <h3>{name}</h3>
            <GrantsList grants={grants} />
            <PersonListDetails people={employees} useRoleForLabel={false} />
            <p><a href={`/grantees/${granteeId}`} className="usa-link">View Grantee Details</a></p>
          </div>
          <div className="grid-col-4">
            <h3>{grants.map(({attributes: {region}}) => region).join(", ")}</h3>
            <PersonListDetails people={specialists} useRoleForLabel={true} />
          </div>
        </div>
      </div>
    )
  }
}

export default GranteeDetailsBox
