// @flow
import { withHandlers, withProps, mapProps, compose } from 'recompose'
import addPinMode from './addPinMode'
import normalMode from './normalMode'
import { ADD_PIN, NORMAL } from './statechart'

const modes = {
	[NORMAL]: normalMode,
	[ADD_PIN]: addPinMode,
	// [ADD_PIN_INFO]: addPinInfoMode,
}

const propsToNamespace = (namespaceName, ...hocs) =>
	compose(
		// Store existing props for later use.
		withProps((props) => ({ startingProps: props })),

		// Compose passed in HOCs.
		...hocs,

		// Map props from HOCs into the desired namespace.
		mapProps(({ startingProps, ...existingPropsAndNewProps }) => {
			// Clear out pre existing props from newProps.
			const newProps = Object.assign({}, existingPropsAndNewProps)
			if (startingProps) {
				Object.keys(startingProps).forEach((key) => {
					delete newProps[key]
				})
			}

			return {
				...startingProps,
				[namespaceName]: newProps,
			}
		}),
	)

const withModeHandlers = compose(
	// map the functions of each mode to a namespace
	propsToNamespace(
		'modes',
		...Object.entries(modes).map(([modeName, handlers: Function]) => {
			return propsToNamespace(
				modeName,
				withHandlers((initialProps) => {
					const hs = typeof handlers === 'function' ? handlers(initialProps) : handlers
					return hs
				}),
			)
		}),
	),
)

export default withModeHandlers
