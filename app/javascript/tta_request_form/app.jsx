import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { openForm } from 'tta_request_form/actions'
import TTANeedForm from './containers/tta_need_form'

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
      body,
      reportId,
    } = this.props
    if (formOpen) {
      return (
        <div className="grid-row box--split">
          {this.renderBodyColumn(body, "grid-col")}
          <TTANeedForm reportId={reportId} />
        </div>
      )
    } else {
      return (
        <div className="grid-row">
          {this.renderBodyColumn(body, "grid-col-10")}
          <div className="grid-col-2">
            <button className="usa-button" onClick={() => { openForm(reportId) }}>Request TTA</button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  formOpen: state.app.formOpen,
  body: state.report.narrative,
  reportId: state.report.id
})

const mapDispatchToProps = (dispatch) => ({
  openForm: reportId => {
    dispatch(openForm())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
