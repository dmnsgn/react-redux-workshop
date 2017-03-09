React Redux Workshop - Redux
============================

## What is redux?

Three principles directly taken from the [Redux doc](http://redux.js.org/docs/basics/):

* Single source of truth: the state of your whole application is stored in an object tree within a single store.
* State is read-only: the only way to change the state is to emit an action, an object describing what happened.
* Changes are made with pure functions: to specify how the state tree is transformed by actions, you write pure reducers.

We can reduce the boilerplate by using [Redux Actions](https://github.com/acdlite/redux-actions) to dispatch Flux Standard Actions:

```js
// An FSA to be interpreted by reducers:
{
	type : 'ACTION_TYPE',
	payload : {
		myValue: true
	}
}
```

```js
import { createAction } from 'redux-actions'

export const UI_TOGGLE_MAIN_NAV = 'UI_TOGGLE_MAIN_NAV'
export const toggleMenu = createAction(UI_TOGGLE_MAIN_NAV)
```

## The react-redux binding
### The Provider and Higher-Order Component patterns explained
#### Provide the data

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-component-that-provides-data'

import App from './containers/App'

render(
	<Provider myData="Baguette">
		<App />
	</Provider>,
	document.getElementById('root')
)
```

The `<Provider>` component adds data to the app tree's `context` (more about React `context` [here](https://facebook.github.io/react/docs/context.html)) - a sort of global object.

#### Consume the data
The most straightforward way is by declaring a `contextTypes` property:

```jsx
const MyComponent = ({ myProps }, context) => (
	<div>{context.myData}</div>
)

MyComponent.contextTypes = {
	myData: React.PropTypes.string
}
```

But this is unstable to use it directly:

* Any API change will break every context provider and consumer
* The context is a global variable in the scope of a single React subtree = components are tightly coupled
* `shouldComponentUpdate` will collide with it and prevent updates in some cases

Instead you should use a [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html) which is basically a function that takes a component and returns a new component enhnaced with additional functionality:

```jsx
import React, { Component } from 'react'

function Consume(ComposedComponent, name) {
	return class Data extends Component {
		// get myData from the Provider somehow and set it in this.props
		render() {
			return <ComposedComponent {...this.props} />
		}
	}
}
```

```jsx
import { Consume } from 'react-component-that-provides-data'

const MyComponent = ({ myData }) => (
	<div>{myData}</div>
)

MyComponent.propTypes = {
	myData: PropTypes.string
}

const ConsumerComponent = Consume(MyComponent)
```

This has some advantages:

* Isolation: there is no risk of method or property collision in your class.
* Interoperability: it works with any React Component, no matter how it was defined.
* Maintainability: the wrapper component will only have one functionality, which makes it easier to reason about.

### Provider and connect() in practice
#### Create the store

```jsx
import React from 'react'
import { render } from 'react-dom'

import Root from './containers/Root'

import configureStore from './store/configureStore'

const store = configureStore()

render(
	<Root store={store} />,
	document.getElementById('root')
)
```

#### Step 1: Provide the redux store to the application tree
`containers/Root.js`:

```jsx
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from './App'

const Root = ({ store }) => (
	<Provider store={store}>
		<App />
	</Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root
```

#### Step 2: Dispatch actions by mapping them to component props (mapDispatchToProps)
`components/MainNavButton.js`:

```jsx
import React from 'react'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'

const MainNavButton = ({ onToggleMenu }) => (
	<button
		className="MainNavButton"
		onClick={onToggleMenu}
		>
		=
	</button>
)

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleMenu: () => dispatch(toggleMenu())
	}
}

export default connect(
	null,
	mapDispatchToProps
)(MainNavButton)
```

#### Step 3: Listen to store changes by mapping them to component props (mapStateToProps)
`containers/MainNav.js`:

```jsx
import './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class MainNav extends Component {
	render() {
		const { active } = this.props

		return (
			<nav className={`MainNav ${active ? 'active' : ''}`}>
				I am the MainNav
			</nav>
		)
	}
}

const mapStateToProps = (state) => ({
	active: state.ui.mainNavOpen
})

export default connect(
	mapStateToProps,
	null
)(MainNav)
```

---
Next: [04 - Router](04-router.md)
