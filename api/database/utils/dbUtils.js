// @flow

import * as R from 'ramda'
import type { /* Filter */ PaginationArgs } from 'Types/sharedTypes'

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

export const DEFAULT_PAGE_COUNT = 50

const defaultPaginationArgs = {
	first: DEFAULT_PAGE_COUNT,
	after: '0x0',
}

export const makePaginationArgs = (args?: PaginationArgs): PaginationArgs => {
	// Adds +1 to the 'first' argument, we need this to see if there is a next page.
	const { first, ...rest } = { ...defaultPaginationArgs, ...args }
	return {
		first: first + 1,
		...rest,
	}
}

/**
 * Create a string to append to a dGraph query. Be sure to include the
 * initial comma that appears after the root function, i.e. `, first: 5, after: 0x123`
 * @param {number} first
 * @param {string} after
 */
export const makePaginationString = (first?: number, after?: string): string => {
	if (!first && after) throw new Error('You must supply a "first" when using "after"')
	if (!first) return ''
	console.log(first)
	console.log(first + 1)
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

export const createFilterString = (filter: Array<Filter>, connect: string = 'AND'): string => {
	const funcs = filter.map(({ key, value, operator = 'eq' }) => `${operator}(${key}, "${value}")`)
	return `@filter(${funcs.join(connect)})`
}

export const validateUid = (uid: string): boolean => /^0x[\d\w]+$/.test(uid)

export const validateUidOrWildcard = (uid: string): boolean => uid === '*' || validateUid(uid)
