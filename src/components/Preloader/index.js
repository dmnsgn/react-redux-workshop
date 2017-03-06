import './style.css'

import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router'
import { TweenMax, Sine } from 'gsap'

class Preloader extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.show()
  }

  componentWillUpdate(nextProps) {
    if (nextProps.hide && !this.props.hide) this.hide()
  }

  show() {
    const titleGroup = findDOMNode(this.titleGroupRef)

    TweenMax.killTweensOf(titleGroup)

    TweenMax.to(titleGroup, 0.5, {
      opacity: 1,
      ease: Sine.easeInOut,
      onComplete: () => this.animate()
    })
  }

  animate() {
    const titleGroup = findDOMNode(this.titleGroupRef)

    if (!titleGroup) return

    TweenMax.killTweensOf(titleGroup)

    TweenMax.to(titleGroup, 0.5, {
      scale: 1.2,
      rotation: -5,
      ease: Sine.easeInOut,
      yoyo: true,
      repeat: 1,
      onComplete: () => this.props.animateComplete()
    })
  }

  hide() {
    const titleGroup = findDOMNode(this.titleGroupRef)
    const component = findDOMNode(this)

    TweenMax.killTweensOf(titleGroup)
    TweenMax.killTweensOf(component)

    TweenMax.to(titleGroup, 0.5, {
      opacity: 0,
      ease: Sine.easeInOut,
    })
    TweenMax.to(component, 1, {
      opacity: 0,
      ease: Sine.easeInOut,
      delay: 0.5,
      onComplete: () => this.props.hideComplete()
    })
  }

  render() {
    const { location } = this.props

    return (
      <div className="Preloader">
        <hgroup
          className="Preloader-titleGroup"
          ref={c => this.titleGroupRef = c}
        >
          <h1>The Super Title</h1>
          <p>Preloading {location.pathname}</p>
        </hgroup>
      </div>
    )
  }
}

export default withRouter(Preloader)
