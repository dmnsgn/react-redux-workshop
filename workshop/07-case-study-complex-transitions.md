React Redux Workshop - Case study: complex transitions
======================================================

> Handle a page transition with an intermediate screen.

## Objective
With an application relying on relatively long async tasks (preloading assets, view animation in/out...), the best UX is achieved by including a waiting screen, visually more appealing than a simple spinner.

## Approach
### Trigger
* Initial load
* Page change via react-router navigation `<NavLink>`
* Browser's back and forward buttons

### Requirements
#### Current view
* `hide()` method
* Clean up

#### Preloader view
* Animate In
* Content animation
* Concurrently wait for:
	* global app assets loaded
	* next view assets loaded
	* all animations completed
* Animation Out
* Subscribe to routing via react-router `withRouter` Hoc.
	* cancel current loading
	* cancel current animations
	* start preloading process for the new next view

#### Next view
* `show()` method
* Play a sound, display a preloaded background and animate UI

## Solution: Higher-Order Component
### Create a wrapping component
`containers/withPreloader.js`:

```jsx
import React, { Component } from 'react'

import Preloader from '../components/Preloader'

function withPreloader(ComposedComponent) {
	class withPreloaderWrapper extends Component {
		render() {
			return (
				<main className="Page">
					<Preloader />
					<ComposedComponent {...this.props} />
				</main>
			)
		}
	}

	return withPreloaderWrapper
}

export default withPreloader
```

### Create a Preloader view component
`components/Preloader/index.js`:

```jsx
import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

class Preloader extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired
	}

	render() {
		const { location } = this.props

		return (
			<div className="Preloader">
				<hgroup
					className="Preloader-titleGroup"
				>
					<h1>The Super Title</h1>
					<p>Preloading {location.pathname}</p>
				</hgroup>
			</div>
		)
	}
}

export default withRouter(Preloader)
```

## Steps
1. [Define HOC reactive updates and show/hide/animate the Preloader](07-case-study-complex-transitions-1.md)
2. [Move preloading logic from Home/Scene to the HOC](07-case-study-complex-transitions-2.md)
3. [Use the Redux state to trigger a transition out state](07-case-study-complex-transitions-3.md)

---
Next: [Going further](going-further.md)
