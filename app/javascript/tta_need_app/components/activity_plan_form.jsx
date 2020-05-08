import React, { PureComponent, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import { GoalsList } from '../containers/tasks'
import "react-datepicker/dist/react-datepicker.css"

class ActivityPlanForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      location: "",
      format: "",
      audience: ""
    }
    this.savePlan = this.savePlan.bind(this)
  }
  savePlan() {
    const { createPlan } = this.props
    const { startDate, location, format, audience } = this.state
    createPlan(startDate.toISOString(), location, format, audience)
  }
  updateStart = date => { this.setState({startDate: date}) }
  updateFormat = event => { this.setState({format: event.target.value}) }
  updateLocation = event => { this.setState({location: event.target.value}) }
  render() {
    const { ttaNeed: {id: ttaNeedId} } = this.props
    const { startDate, format, location } = this.state
    return (
      <Fragment>
        <form className="usa-form usa-form--full">
          <div className="grid-row">
            <div className="grid-col">
              <label className="usa-label" htmlFor="start-at">Activity Start</label>
              <DatePicker
                id="start-at"
                className="usa-input"
                selected={startDate}
                onChange={this.updateStart}
                showTimeSelect
                dateFormat="Pp"
              />
              <p>Audience</p>
            </div>
            <div className="grid-col">
              <fieldset className="usa-fieldset">
                <legend>Format</legend>
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
              <label className="usa-label" htmlFor="location">Location</label>
              <textarea className="usa-textarea" value={location} onChange={this.updateLocation} style={{height: "5rem"}} />
            </div>
          </div>
        </form>
        <GoalsList ttaNeedId={ttaNeedId} planning={true} />
        <button className="usa-button" onClick={this.savePlan}>Save plan</button>
      </Fragment>
    )
  }
}

export default ActivityPlanForm
