import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import GranteeDetailsBox from 'grantee/containers/grantee_details_box'
import TTANeedForm from 'tta_need/containers/tta_need_form'

class TTANeedApp extends PureComponent {
  componentDidUpdate() {
    const { redirectUrl } = this.props
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
  }
  render() {
    const { granteeId } = this.props
    return (
      <Fragment>
        <GranteeDetailsBox granteeId={granteeId} />
        <TTANeedForm hideCancel={true} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  redirectUrl: state.app.redirect,
  granteeId: state.ttaNeed.granteeId
})

export default connect(mapStateToProps)(TTANeedApp)
