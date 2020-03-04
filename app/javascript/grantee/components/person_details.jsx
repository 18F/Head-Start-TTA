import React, { PureComponent, Fragment } from 'react'

class PersonDetails extends PureComponent {
  stringPresent(string) {
    return string && string !== ""
  }
  nameAndRole(name, role) {
    const { nameLabel } = this.props
    if (nameLabel && typeof nameLabel === "string") {
      return (
        <Fragment>
          <strong>{nameLabel}:</strong> {name}<br/>
          <strong>Role:</strong> {role}<br/>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <strong>{role}:</strong> {name}<br />
        </Fragment>
      )
    }
  }
  render() {
    const { person: {attributes: {
      name,
      role,
      phoneNumber,
      email
    }} } = this.props
    return (
      <p>
        {this.nameAndRole(name, role)}
        {this.stringPresent(phoneNumber) &&
          <Fragment><strong>Phone:</strong> {phoneNumber}<br/></Fragment>
        }
        {this.stringPresent(email) &&
          <Fragment>
            <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
          </Fragment>
        }
      </p>
    )
  }
}

export default PersonDetails
