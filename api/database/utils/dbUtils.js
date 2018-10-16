// @flow

import * as R from 'ramda'
import type { Filter } from 'Types/sharedTypes'

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

/**
 * Create a string to append to a dGraph query. Be sure to include the
 * initial comma that appears after the root function, i.e. `, first: 5, after: 0x123`
 * @param {number} first
 * @param {string} after
 */
export const DEFAULT_PAGE_COUNT = 50

export const makePaginationString = (first?: number = DEFAULT_PAGE_COUNT, after?: string): string => {
	return [
		'', // include a blank string so we start it with a comma
		first // if a 'first' value is present, include it +1 so we can tell if there is a 'nextPage'
			? `first: ${first + 1}`
			: null,
		after //
			? `after: ${after}`
			: null,
	]
		.filter((i) => i !== null)
		.join(', ')
}

export const createFilterString = (where: Array<Filter>, connect: string = 'AND'): string => {
	const funcs = where.map(({ key, value, operator = 'eq' }) => `${operator}(${key}, "${value}")`)
	return `@filter(${funcs.join(connect)})`
}

export const validateUid = (uid: string): boolean => /^0x[\d\w]+$/.test(uid)

export const validateUidOrWildcard = (uid: string): boolean => uid === '*' || validateUid(uid)
