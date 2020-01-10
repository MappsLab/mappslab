// @flow
import { fromPairs, toPairs, without, assoc } from 'ramda'

/**
 * separateOptionsAndEvents
 */

export const separateOptionsAndEvents = (
	props: {},
	_eventNames: {},
): { options: {}, events: {} } => {
	const eventNames = Object.keys(_eventNames)
	// $FlowFixMe
	return Object.entries(props).reduce(
		({ options, events }, [propName, propValue]) => {
			if (eventNames.includes(propName)) {
				return {
					events: assoc(propName, propValue)(events),
					options,
				}
			}
			return {
				events,
				options: assoc(propName, propValue)(options),
			}
		},
		{ options: {}, events: {} },
	)
}

/**
 * Given two objects, returns any new or different values
 */
export const getNewValues = (a: {}, b: {}): {} | void =>
	fromPairs(
		// convert the result back into an object
		without(
			// compare array A and B
			toPairs(a), // convert a to an array of pairs
			toPairs(b), // convert b to an array of pairs
		),
	)
