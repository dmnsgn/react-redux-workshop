import React, { Component } from 'react'
import { withRouter } from 'react-router'

import Preloader from '../components/Preloader'

import { default as UtilsPreloader } from '../utils/preloader'
import { makeCancelable } from '../utils/promises'

import { ROUTES } from '../config'

function withPreloader(ComposedComponent) {
  class withPreloaderWrapper extends Component {
    constructor(props) {
      super(props)

      this.state = {
        preloaded: false,
        destroyed: false
      }
    }

    componentDidMount() {
      this.initPreloader()
    }

    componentWillReceiveProps(nextProps) {
      this.cancel()

      if (nextProps.transition) return

      this.setState({
        preloaded: false,
        destroyed: false
      })

      this.initPreloader(nextProps)
    }

    componentWillUnmount() {
      this.cancel()
    }

    cancel() {
      for (const p of this.pCancelables) {
        p.cancel()
      }
    }

    initPreloader(props) {
      const { match } = props || this.props

      let pageManifestId
      switch (match.path) {
        case undefined:
          pageManifestId = 'home'
          break
        case ROUTES.get('home'):
          pageManifestId = 'home'
          break
        case ROUTES.get('scene'):
          pageManifestId = `scene-${match.params.id}`
          break
        default:
          break
      }

      const pMain = makeCancelable(UtilsPreloader.loadManifest('main'))
      const pPageContent = makeCancelable(UtilsPreloader.loadManifest(pageManifestId))
      const pAnimation = makeCancelable(new Promise((resolve) => {
        this.pAnimationResolve = resolve
      }))
      this.pCancelables = [pMain, pPageContent, pAnimation]

      Promise.all(this.pCancelables.map(p => p.promise))
        .then(() => {
          this.setState({
            preloaded: true
          })
        })
        .catch(({ isCanceled, ...error }) => null)
    }

    resolveAnimation(props) {
      const { location } = this.props

      if (location.pathname === props.location.pathname && !this._calledComponentWillUnmount) {
        this.pAnimationResolve()
      }
    }

    destroyPreloader(props) {
      const { location } = this.props

      if (location.pathname === props.location.pathname && !this._calledComponentWillUnmount) {
        this.setState({
          destroyed: true
        })
      }
    }

    render() {
      const { preloaded, destroyed } = this.state

      return (
        <main className="Page">
          {!destroyed &&
            <Preloader
              hide={preloaded}
              animateComplete={this.resolveAnimation.bind(this, this.props)}
              hideComplete={this.destroyPreloader.bind(this, this.props)}
            />
          }
          <ComposedComponent {...this.props} ready={preloaded} />
        </main>
      )
    }
  }

  return withRouter(withPreloaderWrapper)
}

export default withPreloader
