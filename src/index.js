import './index.css'

import React from 'react'
import { render } from 'react-dom'

import App from './containers/App'

const app = <App title="React Redux Workshop" />

render(
  app,
  document.getElementById('root'),
  () => console.log('Root rendered')
)
