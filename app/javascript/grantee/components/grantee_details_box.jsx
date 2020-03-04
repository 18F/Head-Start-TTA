import React, { PureComponent, Fragment } from 'react'

class GranteeDetailsBox extends PureComponent {
  stringPresent(string) {
    return string && string != ""
  }
  renderPhoneAndEmail(person) {
    const elements = []
    if (this.stringPresent(person.attributes.phoneNumber)) {
      elements.push(<Fragment key={`phone-${person.id}`}><strong>Phone:</strong> {person.attributes.phoneNumber}</Fragment>)
      if (this.stringPresent(person.attributes.email)) {
        elements.push(<br key={`break-${person.id}`}/>)
      }
    }
    if (this.stringPresent(person.attributes.email)) {
      elements.push(<Fragment key={`email-${person.id}`}><strong>Email:</strong> <a href={`mailto:${person.attributes.email}`}>{person.attributes.email}</a></Fragment>)
    }
    return (
      <Fragment>
        {elements}
      </Fragment>
    )
  }
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
            <p>
              {grants.map(({attributes: {number}}, index) => (
                <Fragment key={index}>
                  <strong>Grant</strong> {number}<br/>
                </Fragment>
              ))}
            </p>
            {employees.map((person) =>
              <p key={person.id}>
                <strong>Point of Contact:</strong> {person.attributes.name} - {person.attributes.role}<br/>
                {this.renderPhoneAndEmail(person)}
              </p>
            )}
            <p style={{marginBottom: 0}}><a href={`/grantees/${granteeId}`} className="usa-link">View Grantee Details</a></p>
          </div>
          <div className="grid-col-4">
            <h3>{grants.map(({attributes: {region}}) => region).join(", ")}</h3>
            {specialists.map((person) =>
              <p key={person.id}>
                <strong>{person.attributes.role}:</strong> {person.attributes.name}<br/>
                {this.renderPhoneAndEmail(person)}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default GranteeDetailsBox
