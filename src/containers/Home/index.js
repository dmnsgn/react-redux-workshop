import './style.css'

import React, { Component } from 'react'

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

    if (!ready) return <div>Getting ready...</div>

    const divStyle = {
      visibility: 'visible'
    }

    return (
      <div className="PageContent Home" style={divStyle}>Ready</div>
    )
  }
}

export default Home
