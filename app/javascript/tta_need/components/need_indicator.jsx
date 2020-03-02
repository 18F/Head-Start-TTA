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
    { value: "Grantee Request", label: "Grantee Request" },
    { value: "OHS Monitoring Report", label: "OHS Monitoring Report" },
    { value: "Risk Management Meeting", label: "Risk Management Meeting" },
    { value: "PIR Results", label: "PIR Results" },
    { value: "NC Priority", label: "NC Priority" },
    { value: "RO Priority", label: "RO Priority" }
  ]
  purposeOptions = {
    "Grantee Request": [
      { value: "New Management", label: "New Management" },
      { value: "New Grantee or Program", label: "New Grantee or Program" },
      { value: "Other", label: "Other" }
    ],
    "OHS Monitoring Report": [
      { value: "Deficiency", label: "Deficiency" },
      { value: "Noncompliance", label: "Noncompliance" },
      { value: "Area of Concern", label: "Area of Concern" }
    ],
    "Risk Management Meeting": [
      { value: "Under Enrollment", label: "Under Enrollment" },
      { value: "Other", label: "Other" }
    ],
    "PIR Results": [
      { value: "Under Enrollment", label: "Under Enrollment" },
      { value: "Other", label: "Other" }
    ]
  }
  purposeSelector() {
    const { indicator, purpose } = this.state
    const options = this.purposeOptions[indicator]
    if (options) {
      return (
        <Fragment>
          <label className="usa-label" htmlFor="request-purpose">Purpose of request</label>
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
    if (indicator === "OHS Monitoring Report") {
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
        <h3>Indicator of need</h3>
        <label className="usa-label" htmlFor="indicator">Source of request</label>
        <Select options={this.indicatorOptions} id="indicator" value={{value: indicator, label: indicator}} onChange={value => this.indicatorChanged(value)} />
        {this.indicatorHint()}
        {this.purposeSelector()}
      </Fragment>
    )
  }
}

export default NeedIndicator
