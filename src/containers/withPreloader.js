import React, { Component } from 'react'

import Preloader from '../components/Preloader'

function withPreloader(ComposedComponent) {
  class withPreloaderWrapper extends Component {
    constructor(props) {
      super(props)

      this.state = {
        preloaded: false,
        destroyed: false
      }
    }

    resolveAnimation() {
      console.log('Preloader animation complete')

      this.setState({
        preloaded: true
      })
    }

    destroyPreloader() {
      console.log('Preloader destroy')

      this.setState({
        destroyed: true
      })
    }

    render() {
      const { preloaded, destroyed } = this.state

      return (
        <main className="Page">
          {!destroyed &&
            <Preloader
              hide={preloaded}
              animateComplete={this.resolveAnimation.bind(this)}
              hideComplete={this.destroyPreloader.bind(this)}
            />
          }
          <ComposedComponent {...this.props} />
        </main>
      )
    }
  }

  return withPreloaderWrapper
}

export default withPreloader
