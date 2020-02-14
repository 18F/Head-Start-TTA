import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import { find, findIndex, isEqual } from 'lodash'

class TTANeedForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistTypesNeeded: props.ttaNeed.specialistTypesNeeded,
      indicator: props.ttaNeed.indicator,
      narrative: props.ttaNeed.narrative
    }
    this.addSpecialist = this.addSpecialist.bind(this)
    this.inputChanged = this.inputChanged.bind(this)
  }
  specialistOptions = [
    { value: "GS", label: "Grantee Specialist" },
    { value: "ECS", label: "Early Childcare Specialist" },
    { value: "HS", label: "Health Specialist" },
    { value: "FS", label: "Fiscal Specialist" }
  ]
  specialistTypeChanged(value, event, index) {
    let types = this.state.specialistTypesNeeded
    types[index] = value
    this.sendUpdate({specialistTypesNeeded: types})
  }
  addSpecialist(event) {
    event.preventDefault()
    let types = this.state.specialistTypesNeeded
    const missing = find(this.specialistOptions, possiblity => (
      findIndex(types, needed => isEqual(needed, possiblity)) == -1
    ))
    types.push(missing)
    this.sendUpdate({specialistTypesNeeded: types})
  }
  removeSpecialist(event, index) {
    event.preventDefault()
    let types = this.state.specialistTypesNeeded
    types.splice(index, 1)
    this.sendUpdate({specialistTypesNeeded: types})
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
      report,
    } = this.props
    const {
      specialistTypesNeeded,
      indicator,
      narrative
    } = this.state
    return (
      <div className="grid-col">
        <h2>TTA Request</h2>
        <form className="usa-form usa-form--large">
          <label className="usa-label" htmlFor="specialist-type">Type of Specialist(s)</label>
          {specialistTypesNeeded.map((type, index) =>
            <Fragment key={index}>
              <Select options={this.specialistOptions} value={type} onChange={(value, event) => this.specialistTypeChanged(value, event, index)} />
              {index != 0 &&
                <p style={{margin: 0}}><a href="#" onClick={e => this.removeSpecialist(e, index)}>Remove</a></p>
              }
            </Fragment>
          )}
          {specialistTypesNeeded.length < this.specialistOptions.length &&
            <p style={{margin: 0}}><a href="#" onClick={this.addSpecialist}>Add another specialist</a></p>
          }
          <label className="usa-label" htmlFor="topics">TA Area(s)</label>

          <label className="usa-label" htmlFor="indicator">Indicator of Need</label>
          <input type="text" className="usa-input" id="indicator" value={indicator} readOnly />
          <p className="usa-hint">This Monitoring Report will be attached to request</p>
          <label className="usa-label" htmlFor="additional-info">Additional Information</label>
          <input type="text" className="usa-input" id="additional-info" value="TODO" onChange={() => {}} />
          <label className="usa-label" htmlFor="narrative">Description of TTA Requested</label>
          <textarea className="usa-textarea" id="narrative" value={narrative} name="narrative" onChange={this.inputChanged} />
          <label className="usa-label" htmlFor="objectivs">Objectives</label>
          <div className="box"></div>
          <button className="usa-button" onClick={() => { submitRequest() }}>Submit request</button>
        </form>
      </div>
    )
  }
}

export default TTANeedForm
