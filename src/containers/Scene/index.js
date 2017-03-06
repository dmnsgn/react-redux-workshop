import './style.css'

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { matchPath } from 'react-router'
import { TweenMax, Quad } from 'gsap'

import { routingTransitionReset } from '../../actions'

import withPreloader from '../withPreloader'

import { default as UtilsPreloader } from '../../utils/preloader'

import { ROUTES, COLORS } from '../../config'

class Scene extends Component {
  componentDidMount() {
    const { match } = this.props
    const sceneId = `scene-${match.params.id}`

    const pAssets = UtilsPreloader.loadManifest(sceneId)
    pAssets.then(() => {
      this.setState({ ready: true })
    })
  }

  componentWillReceiveProps(nextProps) {
    const { transition } = nextProps

    const transitionFrom = matchPath(transition.from, ROUTES.get('scene'))
    const transitionToHome = matchPath(transition.to, ROUTES.get('home'))

    if (transitionFrom && transitionToHome) {
      this.hide(transition)
    }
  }

  componentDidUpdate(prevProps) {
    const { match, ready } = this.props
    const sceneId = `scene-${match.params.id}`

    if (!prevProps.ready && ready) {
      createjs.Sound.play(`audio-${sceneId}`, { loop: -1, volume: 0.3 })
      const content = findDOMNode(this.contentRef)
      const background = findDOMNode(this.backgroundRef)
      const title = findDOMNode(this.titleRef)

      content.style.visibility = 'visible'
      background.style.opacity = 1
      title.style.opacity = 1
      title.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  componentWillUnmount() {
    const { match } = this.props
    const audioId = `audio-scene-${match.params.id}`

    createjs.Sound.stop(audioId)
  }

  hide(transition) {
    const content = findDOMNode(this.contentRef)
    const title = findDOMNode(this.titleRef)
    const background = findDOMNode(this.backgroundRef)

    TweenMax.killTweensOf(title)
    TweenMax.killTweensOf(content)
    TweenMax.killTweensOf(background)

    TweenMax.to(title, 0.5, {
      opacity: 0,
      y: -100,
      ease: Quad.easeInOut,
    })
    TweenMax.to(content, 0.5, {
      backgroundColor: COLORS.get('preloader-background'),
      ease: Quad.easeInOut,
      delay: 0.25
    })
    TweenMax.to(background, 0.5, {
      opacity: 0,
      delay: 0.25,
      ease: Quad.easeInOut,
      onComplete: () => {
        this.props.onHideComplete()
        this.props.push(transition.to)
      }
    })
  }

  render() {
    const { match, ready } = this.props

    const sceneId = `scene-${match.params.id}`

    let background
    if (ready) {
      const backgroundImageItem = UtilsPreloader.getAsset(sceneId, `background-${sceneId}`, true)
      const backgroundStyle = {
        backgroundImage: `url(${backgroundImageItem.src})`
      }
      background =
        <div
          ref={c => this.backgroundRef = c}
          className="PageContent-background"
          style={backgroundStyle}
        />
    }

    return (
      <div ref={c => this.contentRef = c} className="PageContent Scene">
        {background}
        <h1 ref={c => this.titleRef = c} className="PageContent-title">{sceneId}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  transition: state.routing.transition
})

const mapDispatchToProps = (dispatch) => ({
  onHideComplete: () => dispatch(routingTransitionReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(withPreloader(Scene))
