import React, { PureComponent, Fragment } from 'react'
import PersonListDetails from 'grantee/components/person_list_details'
import PersonDetails from 'grantee/components/person_details'
import GrantsList from 'grantee/components/grants_list'
import { shortDate } from 'common/utils'

class PlanningDetailsBox extends PureComponent {
  render() {
    const {
      ttaNeed: {id: ttaNeedId, attributes: {
        createdAt: requestDate,
        indicator,
        purpose,
        initiatedBy,
        narrative
      }},
      requester,
      topics,
      grantee: {attributes: {name: granteeName}},
      pocs,
      grants
    } = this.props
    return (
      <Fragment>
        <p>TA Request #{ttaNeedId}</p>
        <p>Requested: {shortDate(requestDate)}</p>
        <h2>TTA is requested for</h2>
        <div className="grid-row">
          <div className="grid-col">
            <h4 style={{marginBottom: 0}}>Grantee</h4>
            <p style={{marginTop: 0}}>{granteeName}</p>
            <GrantsList grants={grants} />
          </div>
          <div className="grid-col">
            <PersonListDetails people={pocs} />
          </div>
        </div>
        <h2>TTA is requested by</h2>
        <div className="grid-row">
          <div className="grid-col">
            <PersonDetails person={requester} nameLabel="Requested by" />
          </div>
          <div className="grid-col">
            <h4 style={{marginBottom: 0}}>Source of Request</h4>
            <p style={{marginTop: 0}}>{initiatedBy}</p>
          </div>
        </div>
        <hr/>
        <div className="grid-row">
          <div className="grid-col">
            <h4 style={{marginBottom: 0}}>Purpose of request</h4>
            <ul className="usa-list usa-list--unstyled">
              <li>{indicator}</li>
              <li>{purpose}</li>
            </ul>
            <h4 style={{marginBottom: 0}}>Topics</h4>
            <ul className="usa-list usa-list--unstyled">
              {topics.map(({id, attributes: {name}}) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="grid-col">
            <h3>Description</h3>
            <p>{narrative}</p>
          </div>
        </div>
        <hr/>
      </Fragment>
    )
  }
}

export default PlanningDetailsBox
