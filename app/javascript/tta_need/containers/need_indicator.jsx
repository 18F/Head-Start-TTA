import { connect } from 'react-redux'
import { updateNeed } from '../actions'
import NeedIndicator from '../components/need_indicator'

const mapStateToProps = state => ({
  indicator: state.ttaNeed.indicator,
  purpose: state.ttaNeed.purpose,
  contextLinkId: state.ttaNeed.contextLinkId,
  contextLinkType: state.ttaNeed.contextLinkType
})

const mapDispatchToProps = {
  updateNeed
}

export default connect(mapStateToProps, mapDispatchToProps)(NeedIndicator)
