import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { openForm, closeForm } from 'tta_request_form/actions'

class App extends PureComponent {
  render() {
    const {
      formOpen,
      openForm,
      closeForm
    } = this.props
    if (formOpen) {
      return (
        <div>
          <p>Show the form</p>
          <button className="usa-button" onClick={() => { closeForm() }}>Close Form</button>
        </div>
      )
    } else {
      return (
        <button className="usa-button" onClick={() => { openForm() }}>Request TTA</button>
      )
    }
  }
}

const mapStateToProps = state => ({
  formOpen: state.app.formOpen
})

const mapDispatchToProps = dispatch => ({
  openForm: () => { dispatch(openForm()) },
  closeForm: () => { dispatch(closeForm()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
