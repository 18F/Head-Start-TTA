import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { stringPresent } from 'common/utils'

class SubtaskDetails extends PureComponent {
  constructor(props) {
    super(props)
    const { task: {attributes: {status}} } = this.props
    this.state = {
      complete: (status === "complete")
    }
    this.toggleStatus = this.toggleStatus.bind(this)
  }
  toggleStatus() {
    const { complete } = this.state
    const { task, saveTask } = this.props
    this.setState({complete: !complete}, () => {
      const { complete: newStatus } = this.state
      task.attributes.status = newStatus ? "complete" : "todo"
      saveTask(task)
    })
  }
  checkIcon() {
    const { complete } = this.state
    return <FontAwesomeIcon style={{cursor: "pointer"}} onClick={this.toggleStatus} className="fa-lg" icon={complete ? faCheckSquare : faSquare} />
  }
  render() {
    const { task: {attributes: {title}} } = this.props
    return (
      <li>
        {this.checkIcon()}
        &nbsp;
        {title}
      </li>
    )
  }
}

export default SubtaskDetails
