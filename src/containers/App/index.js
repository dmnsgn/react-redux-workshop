import './style.css'

import React from 'react'

import MainHeader from '../MainHeader'
import MainNav from '../MainNav'

const App = ({ children }) => (
  <div className="App">
    <MainHeader />
    <MainNav sceneCount={5} />
    {children}
  </div>
)

export default App
