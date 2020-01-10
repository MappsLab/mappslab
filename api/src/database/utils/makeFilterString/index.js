// @flow
import type { Filter } from 'Types/sharedTypes'
import createRelationshipFilter from './relationships'
import createOperatorFilter from './operators'
import type { FilterStrings } from '../dbUtils'

export type Range = {
	start: Date,
	end: Date,
}

export type FilterObject = {
	[key: string]: Filter,
}

const joinStrings = (connect: string) => (a: string, b: string): string =>
	`${a}${a.length && b.length ? connect : ''}${b}`

const andJoin = joinStrings(' AND ')
const nJoin = joinStrings('\n')

const groupFilterStrings = ({ filterString, varBlocks }: FilterStrings) => ({
	varBlocks,
	filterString: `(${filterString})`,
})

const joinFilterStrings = (filters: Array<FilterStrings>) => {
	const joined = filters.reduce(
		(acc, current) => ({
			filterString: andJoin(acc.filterString, current.filterString),
			varBlocks: nJoin(acc.varBlocks, current.varBlocks),
		}),
		{
			filterString: '',
			varBlocks: '',
		},
	)
	return groupFilterStrings(joined)
}

/**
 * makeFilterPartial
 * returns joined filterStrings and varBlocks for a single field
 */
const makeFilterPartial = (field: string) => ([operator, value]: [
	string,
	string,
]): FilterStrings => {
	// const r = createOperatorFilter
	const filters =
		createRelationshipFilter(operator, field, value) ||
		createOperatorFilter(operator, field, value)
	return filters
}

const makeFieldFilter = ([field, filters]: [string, Filter]) => {
	const filterStrings = Object.entries(filters).map(makeFilterPartial(field))
	return joinFilterStrings(filterStrings)
}

const makeFilterString = (where?: FilterObject): FilterStrings => {
	if (!where) return { varBlocks: '', filterString: '' }
	// Separate out the 'where' object into field -> filter pairs.
	// Each of these fields will have its filters applied as a group.
	const fieldFilters = Object.entries(where).map(makeFieldFilter)
	const { filterString, varBlocks } = joinFilterStrings(fieldFilters)
	return {
		varBlocks,
		filterString: `@filter${filterString}`,
	}
}

export default makeFilterString
