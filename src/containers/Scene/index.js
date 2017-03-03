import './style.css'

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { translate } from 'react-i18next'

import { default as UtilsPreloader } from '../../utils/preloader'

class Scene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    const { match } = this.props
    const sceneId = `scene-${match.params.id}`

    const pAssets = UtilsPreloader.loadManifest(sceneId)
    pAssets.then(() => {
      this.setState({ ready: true })
    })
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props

    if (match.params.id !== nextProps.match.params.id) {
      this.setState({ ready: false })
      const sceneId = `scene-${nextProps.match.params.id}`

      const pAssets = UtilsPreloader.loadManifest(sceneId)
      pAssets.then(() => {
        this.setState({ ready: true })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state
    const { match } = this.props
    const sceneId = `scene-${match.params.id}`

    if (!prevState.ready && ready) {
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

  render() {
    const { ready } = this.state
    const { match } = this.props

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

export default translate([], { wait: true })(Scene)
