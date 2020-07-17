import React, { PureComponent } from 'react'
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
      <div id="main-content">
        <GranteeDetailsBox granteeId={this.granteeId} />
        <TTANeedForm hideCancel={true} ecsPlans={true} history={history} />
      </div>
    )
  }
}

export default TTARequestForm
