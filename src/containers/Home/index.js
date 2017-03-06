import './style.css'

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { translate, Interpolate } from 'react-i18next'

import withPreloader from '../withPreloader'

import { default as UtilsPreloader } from '../../utils/preloader'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    const pAssets = UtilsPreloader.loadManifest('home')
    pAssets.then(() => {
      this.setState({ ready: true })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state

    if (!prevState.ready && ready) {
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

  render() {
    const { ready } = this.state
    const { t } = this.props

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

export default translate([], { wait: true })(withPreloader(Home))
