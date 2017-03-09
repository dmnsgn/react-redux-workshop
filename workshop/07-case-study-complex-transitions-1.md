React Redux Workshop - Case study: complex transitions
======================================================

## Define HOC reactive updates
### Component state changes
Initial:

```jsx
{
	preloaded: false,
	destroyed: false
}
```

On first mount or on `scene/:id` parameter change, reset state to:

```jsx
{
	preloaded: false,
	destroyed: false
}
```

When assets are loaded and `<Preloader>` animate() is completed:

```jsx
{
	preloaded: true,
	destroyed: false
}
```

After `<Preloader>` animation out is completed:

```jsx
{
	preloaded: true,
	destroyed: true
}
```

### Update withPreloader state and add show/hide/animate to the Preloader

```jsx
function withPreloader(ComposedComponent) {
	class withPreloaderWrapper extends Component {
		constructor(props) {
			super(props)

			this.state = {
				preloaded: false,
				destroyed: false
			}
		}

		resolveAnimation() {
			console.log('Preloader animation complete')

			this.setState({
				preloaded: true
			})
		}

		destroyPreloader() {
			console.log('Preloader destroy')

			this.setState({
				destroyed: true
			})
		}

		render() {
			const { preloaded, destroyed } = this.state

			return (
				<main className="Page">
					{!destroyed &&
						<Preloader
							hide={preloaded}
							animateComplete={this.resolveAnimation.bind(this)}
							hideComplete={this.destroyPreloader.bind(this)}
						/>
					}
					<ComposedComponent {...this.props} />
				</main>
			)
		}
	}

	return withPreloaderWrapper
}

export default withPreloader
```

```jsx
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router'
import { TweenMax, Sine } from 'gsap'

class Preloader extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		this.show()
	}

	componentWillUpdate(nextProps) {
		if (nextProps.hide && !this.props.hide) this.hide()
	}

	show() {
		const titleGroup = findDOMNode(this.titleGroupRef)

		TweenMax.killTweensOf(titleGroup)

		TweenMax.to(titleGroup, 0.5, {
			opacity: 1,
			ease: Sine.easeInOut,
			onComplete: () => this.animate()
		})
	}

	animate() {
		const titleGroup = findDOMNode(this.titleGroupRef)

		TweenMax.killTweensOf(titleGroup)

		TweenMax.to(titleGroup, 0.5, {
			scale: 1.2,
			rotation: -5,
			ease: Sine.easeInOut,
			yoyo: true,
			repeat: 1,
			onComplete: () => this.props.animateComplete()
		})
	}

	hide() {
		const titleGroup = findDOMNode(this.titleGroupRef)
		const component = findDOMNode(this)

		TweenMax.killTweensOf(titleGroup)
		TweenMax.killTweensOf(component)

		TweenMax.to(titleGroup, 0.5, {
			opacity: 0,
			ease: Sine.easeInOut,
		})
		TweenMax.to(component, 1, {
			opacity: 0,
			ease: Sine.easeInOut,
			delay: 0.5,
			onComplete: () => this.props.hideComplete()
		})
	}

	render() {
		const { location } = this.props

		return (
			<div className="Preloader">
				<hgroup
					className="Preloader-titleGroup"
					ref={c => this.titleGroupRef = c}
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
