import './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class MainNav extends Component {
  render() {
    const { active } = this.props

    return (
      <nav className={`MainNav ${active ? 'active' : ''}`}>
        I am the MainNav
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  active: state.ui.mainNavOpen
})

export default connect(
  mapStateToProps,
  null
)(MainNav)
