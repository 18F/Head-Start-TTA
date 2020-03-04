import React, { PureComponent, Fragment } from 'react'
import PersonDetails from './person_details'

class PersonListDetails extends PureComponent {
  render() {
    const {
      people,
      useRoleForLabel
    } = this.props
    let nameLabel = this.props.nameLabel || "Point of Contact"
    if (useRoleForLabel) {
      nameLabel = false
    }
    return (
      <Fragment>
        {people.map((person, index) => (
          <PersonDetails key={index} person={person} nameLabel={nameLabel} />
        ))}
      </Fragment>
    )
  }
}

export default PersonListDetails
