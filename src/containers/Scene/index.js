import './style.css'

import React, { Component } from 'react'

class Scene extends Component {
  constructor(props) {
    super(props)

    console.log('Scene constructor()')

    this.state = {
      ready: false
    }
  }

  componentWillMount() {
    console.log('Scene componentWillMount()')
  }

  componentDidMount() {
    console.log('Scene componentDidMount()')

    setTimeout(() => {
      this.setState({ ready: true })
    }, 2000)
  }

  componentWillReceiveProps(newProps) {
    console.log('Scene componentWillReceiveProps()')
  }

  shouldComponentUpdate(newProps, newState) {
    console.log('Scene shouldComponentUpdate()')
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Scene componentWillUpdate()')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Scene componentDidUpdate()')
  }

  componentWillUnmount() {
    console.log('Scene componentWillUnmount()')
  }

  render() {
    console.log('Scene render()')

    const { ready } = this.state

    if (!ready) return <div>Getting ready...</div>

    const divStyle = {
      visibility: 'visible'
    }

    return (
      <div className="PageContent Scene" style={divStyle}>Scene Ready</div>
    )
  }
}

export default Scene
