import React, { PureComponent, Fragment } from 'react'
import { renderMarkdown, shortDate } from 'common/utils'

class ActivityReport extends PureComponent {
  render() {
    const {
      ttaNeed: {attributes: {narrative}},
      activityReport: {id, attributes: {
        startDate,
        endDate,
        duration,
        contactMethod,
        granteeRoles
      }}
    } = this.props
    return (
      <div className="grid-row">
        <div className="grid-col">
          <h3>TTA Need Description</h3>
          <div className="font-body-md measure-2" dangerouslySetInnerHTML={renderMarkdown(narrative)}></div>
        </div>
        <div className="grid-col">
          <dl>
            <dt>Start Date</dt>
            <dd>{shortDate(startDate)}</dd>
            <dt>End Date</dt>
            <dd>{shortDate(endDate)}</dd>
            <dt>Duration <span className="usa-hint">(in hours)</span></dt>
            <dd>{duration}</dd>
            <dt>Contact Method</dt>
            <dd>{contactMethod}</dd>
            <dt>Audience</dt>
            <dd>
              <ul className="usa-list usa-list--unstyled">
                {granteeRoles.map(({id, title}) => (
                  <li key={id}>{title}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default ActivityReport
