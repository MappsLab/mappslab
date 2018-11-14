// @flow

import * as R from 'ramda'
import type { Filter, PaginationFilterArgs } from 'Types/sharedTypes'
import makeFilterString from './makeFilterString'

/**
 * Properly formats incoming variables with '$' for dgraph
 */

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
 * Create a paginatino string to append to a dGraph func. Be sure to include the
 * initial comma that appears after the root function, i.e. `, first: 5, after: 0x123`
 * @param {number} first
 * @param {string} after
 */
export const DEFAULT_PAGE_COUNT = 50

const makePaginationString = (first?: number = DEFAULT_PAGE_COUNT, after?: string): string => {
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

/**
 * Create a @filter string to append to a dGraph query. Be sure to include the
 * initial comma that appears after the root function, i.e. `, first: 5, after: 0x123`
 * @param {number} first
 * @param {string} after
 */

export type FilterStrings = {
	filterString: string,
	varBlocks: string,
}

type QueryStrings = FilterStrings & {
	paginationString: string,
}

export const createQueryStrings = (args: PaginationFilterArgs, filterDeleted?: boolean = true): QueryStrings => {
	if (!args)
		return {
			paginationString: '',
			filterString: '@filter((eq(deleted, false)))',
			varBlocks: '',
		}
	const { first, after, where: baseWhere } = args
	const where = filterDeleted
		? {
				deleted: { eq: false },
				...baseWhere,
		  }
		: baseWhere

	return {
		paginationString: makePaginationString(first, after),
		...makeFilterString(where),
	}
}

/**
 * Validate that the string is a dGraph uid
 */

export const validateUid = (uid: string): boolean => /^0x[\d\w]+$/.test(uid)

export const validateUidOrWildcard = (uid: string): boolean => uid === '*' || validateUid(uid)
