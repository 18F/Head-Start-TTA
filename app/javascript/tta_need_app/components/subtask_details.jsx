import React, { PureComponent } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { stringPresent } from 'common/utils'

class SubtaskDetails extends PureComponent {
  complete() {
    const { task: {attributes: {status}} } = this.props
    return status === "complete"
  }
  checkIcon() {
    return <FontAwesomeIcon className="fa-lg" icon={this.complete() ? faCheckSquare : faSquare} />
  }
  render() {
    const {
      task: {
        attributes: {
          title,
        }
      },
    } = this.props
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
