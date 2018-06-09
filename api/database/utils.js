// @flow

import * as R from 'ramda'
import type { Filter } from '../types/shared/sharedTypes'

export const createVariables = R.pipe(
	R.toPairs,
	R.reduce(
		(acc, [key, value]) =>
			// if the value is undefined or null,
			value === undefined || value === null
				? // return the accumulator
				  acc
				: // Else, return the value cast to a string
				  R.assoc(`$${key}`, value.toString())(acc),
		{},
	),
)

export const itemsToNodes = R.map((f) => ({ cursor: f.uid, node: f }))

export const createFilterString = (filter: Array<Filter>, connect: string = 'AND'): string => {
	const funcs = filter.map(({ key, value, operator = 'eq' }) => `${operator}(${key}, "${value}")`)
	return `@filter(${funcs.join(connect)})`
}
