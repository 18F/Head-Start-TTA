import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { openForm, closeForm } from 'tta_request_form/actions'

class App extends PureComponent {
  renderBodyColumn(body, columnClass) {
    return (
      <div className={columnClass}>
        <div className="font-body-md measure-2" dangerouslySetInnerHTML={{__html: body}}></div>
      </div>
    )
  }
  render() {
    const {
      formOpen,
      openForm,
      closeForm,
      body
    } = this.props
    if (formOpen) {
      return (
        <div className="grid-row box--split">
          {this.renderBodyColumn(body, "grid-col")}
          <div className="grid-col">
            <p>Show the form</p>
            <button className="usa-button" onClick={() => { closeForm() }}>Close Form</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="grid-row">
          {this.renderBodyColumn(body, "grid-col-10")}
          <div className="grid-col-2">
            <button className="usa-button" onClick={() => { openForm() }}>Request TTA</button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  formOpen: state.app.formOpen,
  body: state.report.body
})

const mapDispatchToProps = dispatch => ({
  openForm: () => { dispatch(openForm()) },
  closeForm: () => { dispatch(closeForm()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
