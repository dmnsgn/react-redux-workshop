import './style.css'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

import { toggleMenu, routingTransitionOut, routingTransitionReset } from '../../actions'

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
    event.persist()
    event.preventDefault()

    if (event.target.dataset.to === this.props.location.pathname) return

    this.props.onRoutingTransitionStart()
    this.props.onChangeRoute(event.target.dataset.to)
    this.props.onToggleMenu()
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRoutingTransitionStart: () => dispatch(routingTransitionReset()),
  onToggleMenu: () => dispatch(toggleMenu()),
  onChangeRoute: (to) => dispatch(routingTransitionOut({
    from: ownProps.location.pathname,
    to
  }))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav))
