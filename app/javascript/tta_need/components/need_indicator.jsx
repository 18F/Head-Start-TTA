import React, { Component, Fragment } from 'react'
import Select from 'react-select'

class NeedIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indicator: props.indicator,
      purpose: props.purpose
    }
  }
  indicatorOptions = [
    { value: "New Grantee/Program", label: "New Grantee/Program" },
    { value: "New Program Leadership", label: "New Program Leadership" },
    { value: "Area of Concern", label: "Area of Concern" },
    { value: "Monitoring", label: "Monitoring" },
    { value: "National Priority", label: "National Priority" },
    { value: "Regional Office Priority", label: "Regional Office Priority" },
    { value: "Planning", label: "Planning" },
    { value: "Professional Development", label: "Professional Development" },
    { value: "Continuous Quality Improvement", label: "Continuous Quality Improvement" },
    { value: "School Readiness", label: "School Readiness" }
  ]
  purposeOptions = {
    "Monitoring": [
      { value: "Deficiency", label: "Deficiency" },
      { value: "Noncompliance", label: "Noncompliance" }
    ]
  }
  purposeSelector() {
    const { indicator, purpose } = this.state
    const options = this.purposeOptions[indicator]
    if (options) {
      return (
        <Fragment>
          <label className="usa-label" htmlFor="request-purpose">Purpose Details</label>
          <Select options={options} id="request-purpose" value={{value: purpose, label: purpose}} onChange={value => this.purposeChanged(value)} />
        </Fragment>
      )
    }
  }
  indicatorChanged({value}) {
    this.sendUpdate({indicator: value, purpose: ""})
  }
  purposeChanged({value}) {
    this.sendUpdate({purpose: value})
  }
  sendUpdate(update) {
    const { updateNeed } = this.props
    this.setState(update)
    updateNeed(update)
  }
  indicatorHint() {
    const { indicator } = this.state
    if (indicator === "Monitoring") {
      return (<p className="usa-hint">This Monitoring Report will be attached to the request</p>)
    }
  }
  render() {
    const {
      indicator,
      purpose
    } = this.state
    return (
      <Fragment>
        <label className="usa-label" htmlFor="indicator">Purpose</label>
        <Select options={this.indicatorOptions} id="indicator" value={{value: indicator, label: indicator}} onChange={value => this.indicatorChanged(value)} />
        {this.indicatorHint()}
        {this.purposeSelector()}
      </Fragment>
    )
  }
}

export default NeedIndicator
