import React, { PureComponent, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { stringPresent } from 'common/utils'
import { GoalsList } from '../containers/tasks'
import "react-datepicker/dist/react-datepicker.css"

class ActivityReportForm extends PureComponent {
  constructor(props) {
    super(props)
    const { activityPlan: {attributes: planAttrs} } = props
    let endDate = null
    if (stringPresent(planAttrs.endAt)) {
      endDate = new Date(planAttrs.endAt)
    }
    this.state = {
      startDate: new Date(planAttrs.startAt),
      endDate,
      duration: "",
      format: planAttrs.format,
      audience: planAttrs.granteeRoles.map(({id}) => (id))
    }
    this.saveReport = this.saveReport.bind(this)
  }
  saveReport() {
    const { startDate, endDate, duration, format, audience } = this.state
    if (!stringPresent(duration) || audience.length === 0 || !stringPresent(format)) {
      return
    }
    const {
      createReport,
      activityPlan: {id: planId},
      ttaNeed: {id: ttaNeedId}
    } = this.props
    createReport(ttaNeedId, planId, {startDate, endDate, duration, format, audience})
  }
  updateStart = date => { this.setState({startDate: date}) }
  updateEnd = date => { this.setState({endDate: date}) }
  updateDuration = event => { this.setState({duration: event.target.value}) }
  updateFormat = event => { this.setState({format: event.target.value}) }
  audienceChanged = (selected, action) => {
    if (selected === null) {
      this.setState({audience: []})
    } else {
      this.setState({audience: selected.map(({value}) => (value))})
    }
  }
  render() {
    const {
      granteeRoles,
      ttaNeed: { id: ttaNeedId },
      activityPlan: {
        attributes: { granteeRoles: selectedGranteeRoles }
      } } = this.props
    if (granteeRoles === null) {
      return <p>Loading...</p>
    }
    const { startDate, endDate, duration, format, audience } = this.state
    return (
      <Fragment>
        <form className="usa-form usa-form--full">
          <div className="grid-row grid-gap">
            <div className="grid-col">
              <label className="usa-label" htmlFor="start-at">Activity Start</label>
              <DatePicker
                id="start-at"
                className="usa-input"
                selected={startDate}
                onChange={this.updateStart}
              />
              <label className="usa-label" htmlFor="end-at">Activity End</label>
              <DatePicker
                id="end-at"
                className="usa-input"
                selected={endDate}
                onChange={this.updateEnd}
              />
              <label className="usa-label" htmlFor="duration">Duration <span className="usa-hint">(in hours)</span></label>
              <input type="text" className="usa-input" value={duration} onChange={this.updateDuration} />
            </div>
            <div className="grid-col">
              <fieldset className="usa-fieldset">
                <legend className="usa-label">Format</legend>
                <div className="usa-radio">
                  <input type="radio" className="usa-radio__input" id="format-on-site" name="format" checked={format === "On-site"} onChange={this.updateFormat} value="On-site" />
                  <label className="usa-radio__label" htmlFor="format-on-site">On-site</label>
                </div>
                <div className="usa-radio">
                  <input type="radio" className="usa-radio__input" id="format-email" name="format" checked={format === "Email"} onChange={this.updateFormat} value="Email" />
                  <label className="usa-radio__label" htmlFor="format-email">Email</label>
                </div>
                <div className="usa-radio">
                  <input type="radio" className="usa-radio__input" id="format-phone" name="format" checked={format === "Telephone"} onChange={this.updateFormat} value="Telephone" />
                  <label className="usa-radio__label" htmlFor="format-phone">Telephone</label>
                </div>
                <div className="usa-radio">
                  <input type="radio" className="usa-radio__input" id="format-virtual" name="format" checked={format === "Virtual"} onChange={this.updateFormat} value="Virtual" />
                  <label className="usa-radio__label" htmlFor="format-virtual">Virtual</label>
                </div>
              </fieldset>
              <label className="usa-label" htmlFor="audience">Audience</label>
              <Select
                id="audience"
                options={granteeRoles.map(({id, attributes: {title}}) => ({label: title, value: id}))}
                defaultValue={selectedGranteeRoles.map(({id, title}) => ({value: id, label: title}))}
                onChange={this.audienceChanged}
                isMulti
              />
            </div>
          </div>
        </form>
        <GoalsList ttaNeedId={ttaNeedId} planning={true} reporting={true} />
        <button className="usa-button" onClick={this.saveReport}>Save report</button>
      </Fragment>
    )
  }
}

export default ActivityReportForm
