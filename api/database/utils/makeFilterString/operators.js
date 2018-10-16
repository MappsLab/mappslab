// @flow
import type { Range } from './index'

const isNullOrUndefined = (val: any) => Boolean(val === null || val === undefined)

/**
 * eq / notEq
 * types: strings, numbers, dates, and booleans
 */

export const eq = (field: string, value: string | number | boolean | Date): string => {
	const formattedValue = typeof value === 'string' ? `"${value}"` : value.toString()
	return `eq(${field}, ${formattedValue})`
}

export const notEq = (field: string, value: string | number | boolean | Date): string => `NOT ${eq(field, value)}`

/**
 * contains
 * types: strings
 */

export const contains = (field: string, value: string): string => `regexp(${field}, /${value}/i)`

/**
 * lt / gt / lte / gte / between
 * types: numbers, dates
 */

const genericNumberOperator = (operator: string) => (field: string, value: number | Date): string =>
	`${operator}(${field}, ${value.toString()})`

export const lt = genericNumberOperator('lt')
export const gt = genericNumberOperator('gt')
export const lte = genericNumberOperator('le')
export const gte = genericNumberOperator('ge')

export const between = (field: string, { start, end }: Range) => {
	if (isNullOrUndefined(start)) throw new Error(`Range filter: "start" must not be empty`)
	if (isNullOrUndefined(end)) throw new Error(`Range filter: "end" must not be empty`)
	return `(${gte(field, start)} AND ${lte(field, start)})`
}

export const before = genericNumberOperator('le')
export const after = genericNumberOperator('ge')

// export const lt = (field: string, value: number)
