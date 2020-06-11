import React, { Component } from 'react'
import Select from 'react-select'
import NeedIndicator from '../containers/need_indicator'
import TaskList from '../containers/task_list'
import SpecialistList from '../containers/specialist_list'
import TopicList from '../containers/topic_list'

class TTANeedForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      narrative: props.ttaNeed.narrative,
      initiatedBy: props.ttaNeed.initiatedBy,
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
  initiatedChanged({value}) {
    this.sendUpdate({initiatedBy: value})
  }
  initiatedByOptions = [
    { value: "Grantee", label: "Grantee" },
    { value: "Regional Office", label: "Regional Office" }
  ]
  get formHeader() {
    const { ecsPlans } = this.props
    if (ecsPlans) {
      return "ECS TTA Plan"
    } else {
      return "TTA Request"
    }
  }
  render() {
    const {
      submitRequest,
      closeForm,
      ecsPlans,
      hideCancel
    } = this.props
    const {
      narrative,
      initiatedBy,
      startDate
    } = this.state
    return (
      <div className="grid-col">
        <h2>{this.formHeader}</h2>
        <form className="usa-form usa-form--large">
          <label className="usa-label" htmlFor="initiated-by">Initiated By</label>
          <Select options={this.initiatedByOptions} id="initiated-by" value={{value: initiatedBy, label: initiatedBy}} onChange={value => this.initiatedChanged(value)} />
          <NeedIndicator />
          <label className="usa-label" htmlFor="start-date">Proposed start date</label>
          <input type="date" className="usa-input" id="start-date" name="startDate" value={startDate} onChange={this.inputChanged} />
          {ecsPlans ? <TopicList scope="Early Childhood Specialist" /> : <SpecialistList />}
          <label className="usa-label" htmlFor="objectives">TTA Goals</label>
          <p className="usa-hint">Goals are broad statements that describe how TTA will support grantee's wants and needs</p>
          <TaskList />
          <label className="usa-label" htmlFor="narrative">Additional Information</label>
          <textarea className="usa-textarea" id="narrative" value={narrative} name="narrative" onChange={this.inputChanged} />
          <label className="usa-label" htmlFor="additional-info">Attachments</label>
          <input type="text" className="usa-input" id="additional-info" value="attach files here" readOnly />
          <div className="float-right">
            {hideCancel ||
              <button type="button" className="usa-button usa-button--outline" onClick={closeForm}>Cancel</button>
            }
            <button type="button" className="usa-button" onClick={submitRequest}>Submit request</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TTANeedForm
