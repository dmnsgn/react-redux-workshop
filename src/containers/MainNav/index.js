import './style.css'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

class MainNav extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    sceneCount: PropTypes.number.isRequired
  }

  constructor() {
    super()

    this.onNavLinkClick = this.onNavLinkClick.bind(this)
  }

  onNavLinkClick(event) {
    if (event.target.dataset.to === this.props.location.pathname) event.preventDefault()
  }

  render() {
    const { sceneCount, active } = this.props

    return (
      <nav className={`MainNav ${active ? 'active' : ''}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              data-to="/"
              exact
              activeClassName="active"
              onClick={this.onNavLinkClick}
            >
              Home
            </NavLink>
          </li>
          {Array(sceneCount).fill().map((number, index) =>
            (<li key={index}>
              <NavLink
                to={`/scene/${index + 1}`}
                data-to={`/scene/${index + 1}`}
                activeClassName="active"
                onClick={this.onNavLinkClick}
              >
                Scene {index + 1}
              </NavLink>
            </li>)
          )}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  active: state.ui.mainNavOpen
})

export default withRouter(connect(
  mapStateToProps,
  null
)(MainNav))
