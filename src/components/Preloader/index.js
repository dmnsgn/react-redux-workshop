import './style.css'

import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

class Preloader extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    const { location } = this.props

    return (
      <div className="Preloader">
        <hgroup
          className="Preloader-titleGroup"
        >
          <h1>The Super Title</h1>
          <p>Preloading {location.pathname}</p>
        </hgroup>
      </div>
    )
  }
}

export default withRouter(Preloader)
