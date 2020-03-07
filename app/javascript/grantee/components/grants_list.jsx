import React, { PureComponent, Fragment } from 'react'

class GrantsList extends PureComponent {
  render() {
    const { grants } = this.props
    return (
      <ul className="usa-list usa-list--unstyled">
        {grants.map(({id, attributes: {number}}) => (
          <li key={id}><strong>Grant</strong> {number}</li>
        ))}
      </ul>
    )
  }
}

export default GrantsList
