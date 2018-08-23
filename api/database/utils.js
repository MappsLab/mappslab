// @flow

import * as R from 'ramda'
import type { Filter, PaginationArgs } from 'Types/sharedTypes'

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

export const defaultPaginationArgs = {
	first: 50,
	after: '0x0',
}

export const makePaginationArgs = (args: PaginationArgs): PaginationArgs => {
	// Adds +1 to the 'first' argument, we need this to see if there is a next page.
	const { first, ...rest } = { ...defaultPaginationArgs, ...args }
	return {
		first: first + 1,
		...rest,
	}
}

export const createFilterString = (filter: Array<Filter>, connect: string = 'AND'): string => {
	const funcs = filter.map(({ key, value, operator = 'eq' }) => `${operator}(${key}, "${value}")`)
	return `@filter(${funcs.join(connect)})`
}

export const validateUid = (uid: string): boolean => /^0x[\d\w]+$/.test(uid)

export const validateUidOrWildcard = (uid: string): boolean => uid === '*' || validateUid(uid)
