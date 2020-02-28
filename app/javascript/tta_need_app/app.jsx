import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TTANeedForm from 'tta_need/containers/tta_need_form'

class TTANeedApp extends PureComponent {
  componentDidUpdate() {
    const { redirectUrl } = this.props
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
  }
  render() {
    return (
      <TTANeedForm hideCancel={true} />
    )
  }
}

const mapStateToProps = state => ({
  redirectUrl: state.app.redirect
})

export default connect(mapStateToProps)(TTANeedApp)
