import './style.css'

import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ready: true })
    }, 2000)
  }

  render() {
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
