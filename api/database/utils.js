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

export const defaultPaginationArgs = {
	first: 50,
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

type Operator = 'contains' | 'eq'

type Filter = {
	[key: Operator]: string | number | Date | boolean,
}

type FilterObject = {
	[key: string]: Filter,
}

const isDate = (val: any): boolean => Object.prototype.toString.call(val) === '[object Date]'

const makeFilterPartial = ([key: string, filter: FilterObject]): string => {
	const [operator, value] = Object.entries(filter)[0]
	if (!value) throw new Error('No value provided')
	if (typeof value === 'string') {
		switch (operator) {
			case 'contains':
				return `regexp(${key}, /${value}/i)`
			case 'eq':
				return `eq(${key}, "${value}")`
			default:
				throw new Error(`${operator} is not a valid string operator`)
		}
	}
	if (typeof value === 'boolean') {
		switch (operator) {
			case 'eq':
				return `eq(${key}, ${value.toString()})`
			default:
				throw new Error(`${operator} is not a valid boolean operator`)
		}
	}

	// 	le less than or equal to
	// lt less than
	// ge greater than or equal to
	// gt greather than

	if (typeof value === 'number') {
		switch (operator) {
			case 'eq':
			case 'lt':
			case 'gt':
				// these operators are the same in dgraph
				return `${operator}(${key}, ${value.toString()})`
			case 'lte':
				return `le(${key}, ${value.toString()})`
			case 'gte':
				return `ge(${key}, ${value.toString()})`
			default:
				throw new Error(`${operator} is not a valid number operator`)
		}
	}

	if (
		value &&
		value.start !== undefined &&
		value.end !== undefined &&
		typeof value.start === 'number' &&
		typeof value.end === 'number'
	) {
		// $FlowFixMe - how to properly typecheck for a Date?
		const { start, end } = value
		switch (operator) {
			case 'between':
				return `ge(${key}, ${start.toString()}) AND le(${key}, ${end.toString()})`
			default:
				return `${operator} can only be 'between' for start/end numbers`
		}
	}

	if (isDate(value)) {
		// $FlowFixMe - how to properly typecheck for a Date?
		const dateString = value.toISOString()
		switch (operator) {
			case 'eq':
				return `eq(${key}, ${dateString})`
			case 'before':
				return `le(${key}, ${dateString})`
			case 'after':
				return `ge(${key}, ${dateString})`
			default:
				throw new Error(`${operator} is not a valid date operator`)
		}
	}

	if (value && value.before && value.after && isDate(value.before) && isDate(value.after)) {
		// $FlowFixMe - how to properly typecheck for a Date?
		const { before, after }: { before: Date, after: Date } = value
		switch (operator) {
			case 'between':
				return `le(${key}, ${before.toISOString()}) AND ge(${key}, ${after.toISOString()})`
			default:
				return `${operator} can only be 'between' for start/end numbers`
		}
	}

	throw new Error('This is not a valid filter')
}

export const makeFilterString = (filter?: FilterObject): string => {
	if (!filter) return ''
	const filters = Object.entries(filter).map(makeFilterPartial)
	if (filters.length === 0) return ''
	return `@filter(${filters.join(' AND ')})`
}

export const createFilterString = (filter: Array<Filter>, connect: string = 'AND'): string => {
	const funcs = filter.map(({ key, value, operator = 'eq' }) => `${operator}(${key}, "${value}")`)
	return `@filter(${funcs.join(connect)})`
}

export const validateUid = (uid: string): boolean => /^0x[\d\w]+$/.test(uid)

export const validateUidOrWildcard = (uid: string): boolean => uid === '*' || validateUid(uid)
