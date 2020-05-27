import React, { PureComponent, Fragment } from 'react'
import PersonListDetails from 'grantee/components/person_list_details'
import PersonDetails from 'grantee/components/person_details'
import GrantsList from 'grantee/components/grants_list'
import { shortDate } from 'common/utils'
import { uniq } from 'lodash'

class TrackerDetailsBox extends PureComponent {
  render() {
    const {
      ttaNeed: {id: ttaNeedId, attributes: {
        createdAt: requestDate,
        indicator,
        purpose
      }},
      requester,
      topics,
      grantee: {id: granteeId, attributes: {name: granteeName}},
      pocs,
      grants
    } = this.props
    return (
      <div className="box">
        <p><strong>{uniq(grants.map(({attributes: {region}}) => region)).join(", ")}</strong></p>
        <h2>TA Request #{ttaNeedId}</h2>
        <h4>Requested: {shortDate(requestDate)}</h4>
        <PersonDetails person={requester} nameLabel="Requested by" />
        <h4 style={{marginBottom: 0}}>Purpose of request:</h4>
        <ul className="usa-list usa-list--unstyled">
          <li>{indicator}</li>
          <li>{purpose}</li>
        </ul>
        <h4 style={{marginBottom: 0}}>Topics:</h4>
        <ul className="usa-list usa-list--unstyled">
          {topics.map(({id, attributes: {name}}) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <hr />
        <h4 style={{marginBottom: 0}}>Grantee:</h4>
        <p style={{marginTop: 0}}><a href={`/grantees/${granteeId}`} className="usa-link">{granteeName}</a></p>
        <GrantsList grants={grants} />
        <PersonListDetails people={pocs} />
      </div>
    )
  }
}

export default TrackerDetailsBox
