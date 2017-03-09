React Redux Workshop - Case study: complex transitions
======================================================

## Use the Redux state to trigger a transition out state
### Create transition trigger/reset actions and handle them in a `routing` reducer
`actions/index.js`:

```jsx
export const ROUTING_TRANSITION_OUT = 'ROUTING_TRANSITION_OUT'
export const ROUTING_TRANSITION_RESET = 'ROUTING_TRANSITION_RESET'
export const routingTransitionOut = createAction(ROUTING_TRANSITION_OUT)
export const routingTransitionReset = createAction(ROUTING_TRANSITION_RESET)
```

`reducers/routing.js`:

```jsx
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
```

### Dispatch transition action
`containers/MainNav.js`:

```jsx
// ...
import { toggleMenu, routingTransitionOut, routingTransitionReset } from '../../actions'

class MainNav extends Component {
	// ...

	onNavLinkClick(event) {
		event.persist()
		event.preventDefault()

		if (event.target.dataset.to === this.props.location.pathname) return

		this.props.onRoutingTransitionStart()
		this.props.onChangeRoute(event.target.dataset.to)
		this.props.onToggleMenu()
	}

	// ...
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
```

### Connect views to transition state

```jsx
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { matchPath } from 'react-router'
import { translate, Interpolate } from 'react-i18next'
import { TweenMax, Quad } from 'gsap'

import { routingTransitionReset } from '../../actions'

import withPreloader from '../withPreloader'

import { default as UtilsPreloader } from '../../utils/preloader'

import { ROUTES, COLORS } from '../../config'

class Home extends Component {
	componentWillReceiveProps(nextProps) {
		const { transition } = nextProps

		const transitionFrom = transition.from === ROUTES.get('home')
		const transitionToScene = matchPath(transition.to, ROUTES.get('scene'))

		if (transitionFrom && transitionToScene) {
			this.hide(transition)
		}
	}
	// ...

	hide(transition) {
		const content = findDOMNode(this.contentRef)
		const title = findDOMNode(this.titleRef)
		const copy = findDOMNode(this.copyRef)
		const background = findDOMNode(this.backgroundRef)

		TweenMax.killTweensOf(title)
		TweenMax.killTweensOf(copy)
		TweenMax.killTweensOf(content)
		TweenMax.killTweensOf(background)

		TweenMax.to(title, 0.5, {
			opacity: 0,
			y: -100,
			ease: Quad.easeInOut,
		})
		TweenMax.to(copy, 0.5, {
			opacity: 0,
			y: 100,
			delay: 0.25,
			ease: Quad.easeInOut,
		})
		TweenMax.to(content, 0.5, {
			backgroundColor: COLORS.get('preloader-background'),
			ease: Quad.easeInOut,
			delay: 0.5
		})
		TweenMax.to(background, 0.5, {
			opacity: 0,
			delay: 0.5,
			ease: Quad.easeInOut,
			onComplete: () => {
				this.props.onHideComplete()
				this.props.push(transition.to)
			}
		})
	}

	// ...
}

const mapStateToProps = (state) => ({
	transition: state.routing.transition
})

const mapDispatchToProps = (dispatch) => ({
	onHideComplete: () => dispatch(routingTransitionReset())
})

export default translate([], { wait: true })(
	connect(mapStateToProps, mapDispatchToProps)(withPreloader(Home))
)
```
