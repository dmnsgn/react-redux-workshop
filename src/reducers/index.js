import { combineReducers } from 'redux'

import routing from './routing'
import ui from './ui'

const rootReducer = combineReducers({
  routing,
  ui,
})

export default rootReducer
