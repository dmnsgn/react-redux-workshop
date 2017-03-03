import { UI_TOGGLE_MAIN_NAV } from '../actions'

const initialState = {
  mainNavOpen: false
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case UI_TOGGLE_MAIN_NAV:
      return {
        ...state,
        mainNavOpen: !state.mainNavOpen
      }
    default:
      return state
  }
}

export default ui
