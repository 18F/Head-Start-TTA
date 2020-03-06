import React, { PureComponent } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { stringPresent } from 'common/utils'

class SubtaskDetails extends PureComponent {
  complete() {
    const { task: {attributes: {status}} } = this.props
    return status === "complete"
  }
  render() {
    const {
      task: {
        attributes: {
          status,
          title,
          notes,
          createdAt,
          dueDate
        }
      },
      createdBy: {
        attributes: {
          name: createdByName
        }
      },
      assignedTo,
      completedBy
    } = this.props
    return (
      <div className="box">
        <p><strong>{status}</strong> {title}</p>
      </div>
    )
  }
}

export default SubtaskDetails
