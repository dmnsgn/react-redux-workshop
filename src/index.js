import './index.css'

import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import Root from './containers/Root'

import configureStore from './store/configureStore'

const store = configureStore()
const history = createHistory()

render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
  () => console.log('Root rendered')
)
