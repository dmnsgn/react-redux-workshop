import { createAction } from 'redux-actions';

export const UI_TOGGLE_MAIN_NAV = 'UI_TOGGLE_MAIN_NAV'
export const toggleMenu = createAction(UI_TOGGLE_MAIN_NAV)

export const ROUTING_TRANSITION_OUT = 'ROUTING_TRANSITION_OUT'
export const ROUTING_TRANSITION_RESET = 'ROUTING_TRANSITION_RESET'
export const routingTransitionOut = createAction(ROUTING_TRANSITION_OUT)
export const routingTransitionReset = createAction(ROUTING_TRANSITION_RESET)
