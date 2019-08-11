// @flow
import escapeStringRegexp from 'escape-string-regexp'
import type { Range } from './index'
import type { FilterStrings } from '../dbUtils'

const isNullOrUndefined = (val: any) => Boolean(val === null || val === undefined)

/**
 * eq / notEq
 * types: strings, numbers, dates, and booleans
 */

const genericNumberOperator = (operator: string) => (field: string, value: number | Date): string =>
	`${operator}(${field}, ${value.toString()})`

const filterStringCreators = {
	eq: (field: string, value: string | number | boolean | Date): string => {
		const formattedValue = typeof value === 'string' ? `"${value}"` : value.toString()
		return `eq(${field}, ${formattedValue})`
	},

	notEq: (field: string, value: string | number | boolean | Date): string => `NOT ${filterStringCreators.eq(field, value)}`,

	/**
	 * contains
	 * types: strings
	 */

	contains: (field: string, value: string): string => `regexp(${field}, /${escapeStringRegexp(value)}/i)`,

	/**
	 * lt / gt / lte / gte / between
	 * types: numbers, dates
	 */

	lt: genericNumberOperator('lt'),
	gt: genericNumberOperator('gt'),
	lte: genericNumberOperator('le'),
	gte: genericNumberOperator('ge'),

	between: (field: string, { start, end }: Range) => {
		if (isNullOrUndefined(start)) throw new Error(`Range filter: "start" must not be empty`)
		if (isNullOrUndefined(end)) throw new Error(`Range filter: "end" must not be empty`)
		return `(${filterStringCreators.gte(field, start)} AND ${filterStringCreators.lte(field, start)})`
	},
	before: genericNumberOperator('le'),
	after: genericNumberOperator('ge'),

	includes: (field: string, value: string) => `allofterms(${field}, "${value}")`,
}

const createOperatorFilter = (operator: string, field: string, value: any): FilterStrings => {
	if (!filterStringCreators[operator]) throw new Error(`"${operator}" is not a valid operator`)
	const filterString = filterStringCreators[operator](field, value)
	const varBlocks = ''
	return {
		filterString,
		varBlocks,
	}
}

export default createOperatorFilter
