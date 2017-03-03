import './style.css'
import logo from '../../assets/images/logo.svg'

import React from 'react'

import MainNavButton from '../../components/MainNavButton'

const MainHeader = () => (
  <header className="MainHeader">
    <MainNavButton />
    <img src={logo} className="MainHeader-logo" alt="logo" />
  </header>
)

export default MainHeader
