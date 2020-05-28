import React, { PureComponent } from 'react'
import { Transition } from 'react-transition-group'

class RequestSuccessMessage extends PureComponent {
  duration = 1000
  defaultStyle = {
    transition: `opacity ${this.duration}ms ease-in-out`,
    opacity: 0
  }
  transitionStyles = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0}
  }
  render() {
    const { show } = this.props
    return (
      <Transition in={show} timeout={this.duration} appear={true} mountOnEnter={true} unmountOnExit={true}>
        {state => (
          <div className="grid-row" style={{...this.defaultStyle, ...this.transitionStyles[state]}}>
            <div className="grid-col">
              <div className="usa-alert usa-alert--success">
                <div className="usa-alert__body">
                  <h3 className="usa-alert__heading">Success</h3>
                  <p className="usa-alert__text">TTA goals have been submitted</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    )
  }
}

export default RequestSuccessMessage
