import './style.css'

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { matchPath } from 'react-router'
import { translate, Interpolate } from 'react-i18next'
import { TweenMax, Quad } from 'gsap'

import { routingTransitionReset } from '../../actions'

import withPreloader from '../withPreloader'

import { default as UtilsPreloader } from '../../utils/preloader'

import { ROUTES, COLORS } from '../../config'

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    const { transition } = nextProps

    const transitionFrom = transition.from === ROUTES.get('home')
    const transitionToScene = matchPath(transition.to, ROUTES.get('scene'))

    if (transitionFrom && transitionToScene) {
      this.hide(transition)
    }
  }

  componentDidUpdate(prevProps) {
    const { ready } = this.props

    if (!prevProps.ready && ready) {
      createjs.Sound.play('audio-home', { loop: -1, volume: 0.3 })
      const content = findDOMNode(this.contentRef)
      const background = findDOMNode(this.backgroundRef)
      const title = findDOMNode(this.titleRef)
      const copy = findDOMNode(this.copyRef)

      content.style.visibility = 'visible'
      background.style.opacity = 1
      title.style.opacity = 1
      title.style.transform = 'translate3d(0, 0, 0)'
      copy.style.opacity = 1
      copy.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  componentWillUnmount() {
    createjs.Sound.stop('audio-home')
  }

  hide(transition) {
    const content = findDOMNode(this.contentRef)
    const title = findDOMNode(this.titleRef)
    const copy = findDOMNode(this.copyRef)
    const background = findDOMNode(this.backgroundRef)

    TweenMax.killTweensOf(title)
    TweenMax.killTweensOf(copy)
    TweenMax.killTweensOf(content)
    TweenMax.killTweensOf(background)

    TweenMax.to(title, 0.5, {
      opacity: 0,
      y: -100,
      ease: Quad.easeInOut,
    })
    TweenMax.to(copy, 0.5, {
      opacity: 0,
      y: 100,
      delay: 0.25,
      ease: Quad.easeInOut,
    })
    TweenMax.to(content, 0.5, {
      backgroundColor: COLORS.get('preloader-background'),
      ease: Quad.easeInOut,
      delay: 0.5
    })
    TweenMax.to(background, 0.5, {
      opacity: 0,
      delay: 0.5,
      ease: Quad.easeInOut,
      onComplete: () => {
        this.props.onHideComplete()
        this.props.push(transition.to)
      }
    })
  }

  render() {
    const { t, ready } = this.props

    let background
    if (ready) {
      const backgroundImageItem = UtilsPreloader.getAsset('home', 'background-home', true)
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

    const interpolateComponent = <strong>"I am Custom Component"</strong>;

    return (
      <div ref={c => this.contentRef = c} className="PageContent Home">
        {background}
        <h1 ref={c => this.titleRef = c} className="PageContent-title">
          Home component {t('common:appName')}
        </h1>
        <Interpolate
          ref={c => this.copyRef = c}
          parent='p'
          className="PageContent-copy"
          i18nKey='common:interpolateSample'
          useDangerouslySetInnerHTML={true}
          myValue={ready ? 'isReady' : ''}
          myComponent={interpolateComponent}
          myStringToFormat="like that"
        />
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

export default translate([], { wait: true })(
  connect(mapStateToProps, mapDispatchToProps)(withPreloader(Home))
)
