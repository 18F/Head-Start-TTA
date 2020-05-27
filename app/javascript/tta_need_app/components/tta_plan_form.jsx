import React, { PureComponent, Fragment } from 'react'
import GranteeDetailsBox from 'grantee/containers/grantee_details_box'
import TTANeedForm from 'tta_need/containers/tta_need_form'

class TTARequestForm extends PureComponent {
  constructor(props) {
    super(props)
    props.setGranteeId(this.granteeId)
  }
  get granteeId() {
    const { match: {params: {granteeId}} } = this.props
    return granteeId
  }
  render() {
    const { history } = this.props
    return (
      <Fragment>
        <GranteeDetailsBox granteeId={this.granteeId} />
        <TTANeedForm hideCancel={true} ecsPlans={true} history={history} />
      </Fragment>
    )
  }
}

export default TTARequestForm
