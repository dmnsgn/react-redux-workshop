import { ROUTING_TRANSITION_OUT, ROUTING_TRANSITION_RESET } from '../actions'

const initialState = {
  transition: false
}

const routing = (state = initialState, action) => {
  switch (action.type) {
    case ROUTING_TRANSITION_OUT:
      return {
        ...state,
        transition: action.payload
      }
    case ROUTING_TRANSITION_RESET:
      return {
        ...state,
        transition: false
      }
    default:
      return state
  }
}

export default routing
