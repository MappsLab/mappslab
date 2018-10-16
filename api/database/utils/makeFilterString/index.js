// @flow
import * as operators from './operators'
import * as relationships from './relationships'

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
	if (!operators[operator] && !relationships[field]) throw new Error(`"${operator}" is not a valid operator`)
	// Relationship filters are formatted a little differently.
	// If a relationship filter is available, use it.
	if (relationships[field]) return relationships[field](operator, value)
	// Otherwise, use the normal operator filter.
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
