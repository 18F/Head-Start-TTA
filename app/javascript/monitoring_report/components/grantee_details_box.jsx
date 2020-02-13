import React, { PureComponent, Fragment } from 'react'
import { partition } from 'lodash'

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
      grant,
      grantee,
      people
    } = this.props
    if (grant == null || grantee == null) {
      return (<div>Loading</div>)
    }
    const {attributes: {number, region}} = grant
    const {attributes: {name}} = grantee
    const [employees, specialists] = partition(people, p => p.attributes.granteeEmployee)
    return (
      <div className="box">
        <div className="grid-row">
          <div className="grid-col-8">
            <h3>{name}</h3>
            <p><strong>Grant</strong> {number}</p>
            {employees.map((person) =>
              <p key={person.id}>
                <strong>Point of Contact:</strong> {person.attributes.name} - {person.attributes.role}<br/>
                {this.renderPhoneAndEmail(person)}
              </p>
            )}
          </div>
          <div className="grid-col-4">
            <h3>{region}</h3>
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
