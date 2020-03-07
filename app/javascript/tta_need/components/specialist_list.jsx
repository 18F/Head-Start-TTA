import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import { find, findIndex, isEqual } from 'lodash'
import TopicList from '../containers/topic_list.jsx'

class SpecialistList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistTypesNeeded: props.specialistTypesNeeded
    }
    this.addSpecialist = this.addSpecialist.bind(this)
  }
  specialistOptions = [
    { value: "Grantee Specialist", label: "Grantee Specialist" },
    { value: "Early Childhood Specialist", label: "Early Childhood Specialist" },
    { value: "Health Specialist", label: "Health Specialist" },
    { value: "Systems Specialist", label: "Systems Specialist" }
  ]
  specialistTypeChanged(value, index) {
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
  sendUpdate(update) {
    const { updateNeed } = this.props
    this.setState(update)
    updateNeed(update)
  }

  render() {
    const { specialistTypesNeeded } = this.state
    const typesCount = specialistTypesNeeded.length
    return (
      <Fragment>
        <label className="usa-label" htmlFor="specialist-type">Type of Specialists Needed</label>
        {specialistTypesNeeded.map((type, index) =>
          <div className="box box--vertically-padded" key={index} style={{marginBottom: 0}}>
            <Select options={this.specialistOptions} value={type} onChange={value => this.specialistTypeChanged(value, index)} />
            <TopicList scope={type.value} />
            {typesCount > 1 &&
              <p style={{margin: 0}}><a href="#" onClick={e => this.removeSpecialist(e, index)}>Remove specialist</a></p>
            }
          </div>
        )}
        {specialistTypesNeeded.length < this.specialistOptions.length &&
          <p style={{margin: 0}}><a href="#" onClick={this.addSpecialist}>Add another specialist</a></p>
        }
      </Fragment>
    )
  }
}

export default SpecialistList
