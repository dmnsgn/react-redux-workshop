React Redux Workshop - Router
=============================

> Declarative routing for React.

https://github.com/ReactTraining/react-router

## Basics
[React Router (v4)](https://github.com/ReactTraining/react-router/tree/v4) keeps your UI in sync with the URL. It is all about matching location and rendering `<Route>` components accordingly.

## Implementation
The [API of the v4](https://reacttraining.com/react-router/) has been simplified to play better with React existing features and is much more composable.

### Add history
First, we need to create a browser history object to keep track of the navigational state of the application. We pass it as a prop to the `Root`:

```jsx
import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import Root from './containers/Root'

import configureStore from './store/configureStore'

const store = configureStore()
const history = createHistory()

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
)
```

### Add router and routes components
The `<Root>` is going to use three basics components:

* `<BrowserRouter>`: A `<Router>` that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
* `<Switch>`: Renders the first child `<Route>` that matches the location.
* `<Route>`: Renders some UI when a URL matches a location.

```jsx
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import Home from './Home'
import Scene from './Scene'

import { ROUTES } from '../config'

const Root = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history}>
			<App>
				<Switch>
					<Route path={ROUTES.get('home')} exact component={Home} />
					<Route path={ROUTES.get('scene')} exact component={Scene} />
					<Route render={() => <section><h1>Not Found</h1></section>} />
				</Switch>
			</App>
		</Router>
	</Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default Root
```

### Change app content when navigating
Let's rewrite `<App>` to use the [special prop `children`](https://facebook.github.io/react/docs/jsx-in-depth.html#children-in-jsx):

```jsx
import React from 'react'

const App = ({ children }) => (
	<div className="App">
		{children}
	</div>
)

export default App
```

### Add links to navigate
We also need to update our `<MainNav>` component to trigger the route changes.
* use the `withRouter` HOC to check the current location (`react-router-redux` is not compatible yet with v4).
* use `<NavLink>`, a special version of the `<Link>` that will add styling attributes to the rendered element when it matches the current URL:

```jsx
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

class MainNav extends Component {
	static propTypes = {
		active: PropTypes.bool.isRequired,
		sceneCount: PropTypes.number.isRequired
	}

	constructor() {
		super()

		this.onNavLinkClick = this.onNavLinkClick.bind(this)
	}

	onNavLinkClick(event) {
		if (event.target.dataset.to === this.props.location.pathname) event.preventDefault()
	}

	render() {
		const { sceneCount, active } = this.props

		return (
			<nav className={`MainNav ${active ? 'active' : ''}`}>
				<ul>
					<li>
						<NavLink
							to="/"
							data-to="/"
							exact
							activeClassName="active"
							onClick={this.onNavLinkClick}
						>
							Home
						</NavLink>
					</li>
					{Array(sceneCount).fill().map((number, index) =>
						(<li key={index}>
							<NavLink
								to={`/scene/${index + 1}`}
								data-to={`/scene/${index + 1}`}
								activeClassName="active"
								onClick={this.onNavLinkClick}
							>
								Scene {index + 1}
							</NavLink>
						</li>)
					)}
				</ul>
			</nav>
		)
	}
}

const mapStateToProps = (state) => ({
	active: state.ui.mainNavOpen
})

export default withRouter(connect(
	mapStateToProps,
	null
)(MainNav))
```

---
Next: [05 - i18n](05-i18n.md)
