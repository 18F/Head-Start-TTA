import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'

class TrackerDetailsBox extends PureComponent {
  render() {
    const {
      ttaNeed,
      topics,
      grantee,
      grants
    } = this.props
    const {attributes: {name: granteeName}} = grantee
    const {attributes: {region}} = grants[0]
    const {attributes: {
      createdAt: requestDate,
      indicator,
      purpose
    }} = ttaNeed
    return (
      <div className="box">
        <p><strong>{region}</strong></p>
        <h2>TA Request #{ttaNeed.id}</h2>
        <h4>Requested: {moment(requestDate).format("M/D/YYYY")}</h4>
        <p>
          <strong>Requested by:</strong> Name<br/>
          <strong>Role:</strong> Role<br/>
          <strong>Phone:</strong> 555-555-5555<br/>
          <strong>Email:</strong> email@email.com
        </p>
        <p>
          <strong>Purpose of request:</strong><br/>
          {indicator}<br/>
          {purpose}
        </p>
        <p>
          <strong>TA Areas:</strong><br/>
          {topics.map(t => (
            <Fragment>
              {t.attributes.name}<br/>
            </Fragment>
          ))}
        </p>
        <hr />
        <p>
          <strong>Grantee:</strong><br />
          {granteeName}
        </p>
      </div>
    )
  }
}

export default TrackerDetailsBox
