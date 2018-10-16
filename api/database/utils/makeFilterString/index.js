// @flow
import * as operators from './operators'

type Operator = 'contains' | 'eq' | 'notEq' | 'lt' | 'lte' | 'gt' | 'gte' | 'between'

export type Range = {
	start: Date,
	end: Date,
}

type Filter = {
	[key: Operator]: string | number | boolean | Date | Range,
}

export type FilterObject = {
	[key: string]: Filter,
}

const makeFilterPartial = (field: string) => ([operator: string, value: string]) => {
	if (!operators[operator]) throw new Error(`"${operator}" is not a valid operator`)
	return operators[operator](field, value)
}

const makeFilterString = (where?: FilterObject): string => {
	if (!where) return ''
	const filters = Object.entries(where)
		.map(([field, fieldFilters]) => {
			const strings = Object.entries(fieldFilters)
				.map(makeFilterPartial(field))
				.join(' AND ')
			return `(${strings})`
		})
		.join(' AND ')
	if (!filters.length) return ''
	return `@filter(${filters})`
}

export default makeFilterString
