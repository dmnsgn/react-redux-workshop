React Redux Workshop - React
============================

> A Javascript Library For Building User Interfaces

## What is React?
	React is a library for building composable user interfaces. It encourages the creation of reusable UI components which present data that changes over time.

[React](https://facebook.github.io/react/) is only the view layer, not a full MV* whatever framework. It doesn't have any of the following out of the box:

* no event system
* no AJAX capabilities
* no application framework
* no idea on how implement the above

It results in a pretty concise [Top-Level API](https://facebook.github.io/react/docs/react-api.html).

## What is JSX?
* Similar to a template language but it is just a sugar-syntax around Javascript
* It is optional but let's face it, everybody use it
* It creates `ReactElement`s that can be rendered to the DOM

`React.createElement(component, props, ...children)`

Example of [compiled code](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&targets=&browsers=&builtIns=false&code=const%20element%20%3D%20%28%0A%09%3Ch1%20className%3D%22title%22%3EReact%20Redux%20Workshop%3C%2Fh1%3E%0A%29):

```jsx
// The following code
const element = (
	<h1 className="title">React Redux Workshop</h1>
)
// is transformed to
var element = React.createElement(
	"h1",
	{ className: "title" },
	"React Redux Workshop"
)
// when using the React JSX transform from Babel
```

That means that `React` must be in scope (`import React from 'react'`).

## Components
### Definition
Functional:

```jsx
import React from 'react'

function App(props) {
	return <h1>{props.title}</h1>
}
// or
const App = ({ title }) => (
	<h1>{title}</h1>
)

export default App
```

Class:

```jsx
import React, { Component } from 'react'

class App extends Component {
	render() {
		return <h1>{this.props.title}</h1>
	}
}

export default App
```

### Render to the DOM

```jsx
import React from 'react'
import { render } from 'react-dom'

import App from './containers/App'

const app = <App title="React Redux Workshop" />
render(
	app,
	document.getElementById('root'),
	() => console.log('Root rendered')
)
```

### Props
In our previous example, the `<App>` component is called with the following object: `{ title: "React Redux Workshop" }`.

This object is called the component's `props` and is read-only. If you try to modify them inside the component you'll get a nice `Can't add property myProperty, object is not extensible` error.

### State
A component also have an instance property - in general a plain JavaScript object - called `state`. It contains *data specific to this component that may change over time*.

Two simple rules about it:

* If you don't use a property in `render()`, it shouldn't be on the state. Use the component instance instead.
* Never mutate `this.state` directly, use `this.setState()` as for performance reason it may be updated asynchronously. Treat `this.state` as if it were immutable.

`containers/App/index.js`:

```jsx
import Home from '../Home'

const App = () => (
	<div className="App">
		<Home />
	</div>
)

export default App
```

`containers/Home/index.js`:

```jsx
import React, { Component } from 'react'

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			ready: false
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ ready: true })
		}, 2000)
	}

	render() {
		const { ready } = this.state

		if (!ready) return <div>Getting ready...</div>

		const divStyle = {
			visibility: 'visible'
		}

		return (
			<div className="PageContent Home" style={divStyle}>Ready</div>
		)
	}
}

export default Home
```

A few details about the `render()` method:

* It examines `this.props` and `this.state` and return a single React element (`<div></div>` or composite component `<Whatever>`)
* If `null` or `false` is returned, nothing is rendered
* The function should be pure eg. it does not modify component state, it returns the same result each time it's invoked, and it does not directly interact with the browser (use other lifecycle methods instead).

### Lifecycle
[The Life-Cycle of a Composite Component](https://github.com/facebook/react/blob/master/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L71) as highlighted in the codebase:

```jsx
/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */
```

See the docs about [Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) for details about these hooks.

## Typechecking

```jsx
MyComponent.propTypes = {
	optionalArray: React.PropTypes.array,
	optionalBool: React.PropTypes.bool,
	optionalFunc: React.PropTypes.func,
	optionalNumber: React.PropTypes.number,
	optionalObject: React.PropTypes.object,
	optionalString: React.PropTypes.string,
	optionalSymbol: React.PropTypes.symbol,
	optionalNode: React.PropTypes.node,
	optionalElement: React.PropTypes.element,
	optionalMessage: React.PropTypes.instanceOf(Message),
	optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
	optionalUnion: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
		React.PropTypes.instanceOf(Message)
	]),
	optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
	optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
	optionalObjectWithShape: React.PropTypes.shape({
		color: React.PropTypes.string,
		fontSize: React.PropTypes.number
	}),

	// You can chain any of the above with `isRequired` to make sure a warning
	// is shown if the prop isn't provided.
	requiredFunc: React.PropTypes.func.isRequired,

	// A value of any data type
	requiredAny: React.PropTypes.any.isRequired,
	...
}
```

Follow the [docs](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) for more details.

Example using [class properties transform](https://babeljs.io/docs/plugins/transform-class-properties/):

```jsx
import React, { Component, PropTypes } from 'react'

class MyComponent extends Component {
	static propTypes = {
		active: PropTypes.bool.isRequired,
		sceneCount: PropTypes.number.isRequired
	}

	// ...
}

export default MyComponent
```

---
Next: [03 - Redux](03-redux.md)
