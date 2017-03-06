import React, { Component } from 'react'

import Preloader from '../components/Preloader'

function withPreloader(ComposedComponent) {
  class withPreloaderWrapper extends Component {
    render() {
      return (
        <main className="Page">
          <Preloader />
          <ComposedComponent {...this.props} />
        </main>
      )
    }
  }

  return withPreloaderWrapper
}

export default withPreloader
