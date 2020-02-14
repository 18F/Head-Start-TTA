import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import { find, findIndex, isEqual } from 'lodash'

class TTANeedForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistTypesNeeded: props.ttaNeed.specialistTypesNeeded
    }
    this.addSpecialist = this.addSpecialist.bind(this)
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
    this.setState({specialistTypesNeeded: types})
  }
  addSpecialist(event) {
    event.preventDefault()
    let types = this.state.specialistTypesNeeded
    const missing = find(this.specialistOptions, possiblity => (
      findIndex(types, needed => isEqual(needed, possiblity)) == -1
    ))
    types.push(missing)
    this.setState({specialistTypesNeeded: types})
  }
  removeSpecialist(event, index) {
    event.preventDefault()
    let types = this.state.specialistTypesNeeded
    types.splice(index, 1)
    this.setState({specialistTypesNeeded: types})
  }
  render() {
    const {
      submitRequest,
      report,
    } = this.props
    const {
      specialistTypesNeeded
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
          <p>Topics</p>
          <p>Indicator of need</p>
          <p>Additional information</p>
          <p>Description of TTA Requested</p>
          <p>Objectives</p>
          <button className="usa-button" onClick={() => { submitRequest() }}>Submit request</button>
        </form>
      </div>
    )
  }
}

export default TTANeedForm
