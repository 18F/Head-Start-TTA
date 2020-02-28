import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import TaskList from '../containers/task_list.jsx'
import SpecialistList from '../containers/specialist_list.jsx'

class TTANeedForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indicator: props.ttaNeed.indicator,
      narrative: props.ttaNeed.narrative,
      startDate: props.ttaNeed.startDate
    }
    this.inputChanged = this.inputChanged.bind(this)
  }
  inputChanged(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.sendUpdate({[name]: value})
  }
  sendUpdate(update) {
    const { updateNeed } = this.props
    this.setState(update)
    updateNeed(update)
  }
  render() {
    const {
      submitRequest,
      closeForm,
    } = this.props
    const {
      indicator,
      narrative,
      startDate
    } = this.state
    return (
      <div className="grid-col">
        <h2>TTA Request</h2>
        <form className="usa-form usa-form--large">
          <label className="usa-label" htmlFor="start-date">Proposed start date</label>
          <input type="date" className="usa-input" id="start-date" name="startDate" value={startDate} onChange={this.inputChanged} />
          <SpecialistList />
          <label className="usa-label" htmlFor="indicator">Indicator of Need</label>
          <input type="text" className="usa-input" id="indicator" value={indicator} readOnly />
          <p className="usa-hint">This Monitoring Report will be attached to request</p>
          <label className="usa-label" htmlFor="objectives">Outcomes for Grantee</label>
          <TaskList />
          <label className="usa-label" htmlFor="narrative">Additional Information</label>
          <textarea className="usa-textarea" id="narrative" value={narrative} name="narrative" onChange={this.inputChanged} />
          <label className="usa-label" htmlFor="additional-info">Attachments</label>
          <input type="text" className="usa-input" id="additional-info" value="attach files here" readOnly />
          <div className="float-right">
            <button type="button" className="usa-button usa-button--outline" onClick={() => { closeForm() }}>Cancel</button>
            <button type="button" className="usa-button" onClick={() => { submitRequest() }}>Submit request</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TTANeedForm
