import { compose } from 'redux'
import { query } from 'redux-bees'
import api from '../api'
import { connect } from 'react-redux'
import { updateTopics } from '../actions'
import TopicList from '../components/topic_list.jsx'

const mapStateToProps = (state, ownProps) => ({
  topics: state.ttaNeed.topics[ownProps.scope]
})

const mapDispatchToProps = {
  updateTopics
}

const enhance = compose(
  query('topicOptions', api.getTopics, (perform, props) => (
    perform({"filter[scope]": props.scope, "filter[group]": false})
  )),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TopicList)
