import React, { PureComponent, Fragment } from 'react'
import Select from 'react-select'

class TopicList extends PureComponent {
  constructor(props) {
    super(props)
    this.addTopic = this.addTopic.bind(this)
  }
  get topics() {
    const { topics } = this.props
    if (topics && topics.length > 0) {
      return topics
    } else {
      return [{}]
    }
  }
  get options() {
    const { topicOptions } = this.props
    if (topicOptions) {
      return topicOptions.map(opt => ({value: opt.id, label: opt.attributes.name}))
    } else {
      return []
    }
  }
  topicChanged(value, index) {
    let topics = this.topics
    topics[index] = value
    this.sendUpdate(topics)
  }
  addTopic(event) {
    event.preventDefault()
    let topics = this.topics
    topics.push({})
    this.sendUpdate(topics)
  }
  removeTopic(event, index) {
    event.preventDefault()
    let topics = this.topics
    topics.splice(index, 1)
    this.sendUpdate(topics)
  }
  sendUpdate(topics) {
    const {
      updateTopics,
      scope
    } = this.props
    updateTopics(scope, topics)
  }
  render() {
    const topicCount = this.topics.length
    return (
      <Fragment>
        <label className="usa-label" htmlFor="topics">Topics</label>
        {this.topics.map((topic, index) => (
          <Fragment key={index}>
            <Select autoFocus={topicCount > 1} options={this.options} value={topic} onChange={value => this.topicChanged(value, index)} />
            {topicCount > 1 &&
              <p style={{margin: 0}}><a href="#" onClick={e => this.removeTopic(e, index)}>Remove topic</a></p>
            }
          </Fragment>
        ))}
        {topicCount < this.options.length &&
          <p style={{margin: 0}}><a href="#" onClick={this.addTopic}>Add another topic</a></p>
        }
      </Fragment>
    )
  }
}

export default TopicList
