import './style.css'

import React, { Component } from 'react'
import { translate, Interpolate } from 'react-i18next'

class Home extends Component {
  constructor(props) {
    super(props)

    console.log('Home constructor()')

    this.state = {
      ready: false
    }
  }

  componentWillMount() {
    console.log('Home componentWillMount()')
  }

  componentDidMount() {
    console.log('Home componentDidMount()')

    setTimeout(() => {
      this.setState({ ready: true })
    }, 2000)
  }

  componentWillReceiveProps(newProps) {
    console.log('Home componentWillReceiveProps()')
  }

  shouldComponentUpdate(newProps, newState) {
    console.log('Home shouldComponentUpdate()')
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Home componentWillUpdate()')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Home componentDidUpdate()')
  }

  componentWillUnmount() {
    console.log('Home componentWillUnmount()')
  }

  render() {
    console.log('Home render()')

    const { ready } = this.state
    const { t } = this.props

    if (!ready) return <div>Getting ready...</div>

    const interpolateComponent = <strong>"I am Custom Component"</strong>;

    const divStyle = {
      visibility: 'visible'
    }

    return (
      <div className="PageContent Home" style={divStyle}>
        <h1 className="PageContent-title">
          Home component {t('common:appName')}
        </h1>
        <Interpolate
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

export default translate([], { wait: true })(Home)
