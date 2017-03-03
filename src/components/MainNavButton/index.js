import './style.css'

import React from 'react'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'

const MainNavButton = ({ onToggleMenu }) => (
  <button
    className="MainNavButton"
    onClick={onToggleMenu}
    >
    =
  </button>
)

const mapDispatchToProps = (dispatch) => ({
  onToggleMenu: () => dispatch(toggleMenu())
})

export default connect(
  null,
  mapDispatchToProps
)(MainNavButton)
