// @flow
import { query } from 'Database'
import type { PinType } from 'Types/PinTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import { makePaginationString } from 'Database/utils'
import { publicFields, parsePinResults } from './pinDBSchema'

// TODO: Ditch this and just use Pins.getPins with an ownedBy filter
export const getUserPins = async (userUid: string, args?: PaginationFilterArgs = {}): Promise<Array<PinType>> => {
	const { first, after } = args
	// const filterString = makeFilterString(where)
	// const paginationString = makePaginationString(first, after)
	const q = /* GraphQL */ `
		query getPins($uid: string, $first: int, $after: string) {
			getPins(func: uid(${userUid})) {
				pinned @filter(eq(deleted, false)) {
					${publicFields}
				}
			}
		}
	`
	const result = await query(q, { first, after })
	return result && result.getPins ? parsePinResults(result.getPins[0].pinned) : []
}

export const getMapPins = async (mapUid: string, args?: PaginationFilterArgs = {}): Promise<Array<PinType>> => {
	// const filterString = filter ? createFilterString(filter) : ''
	const { first, after } = args
	// const filterString = makeFilterString({
	// 	...filter,
	// 	{ deleted: { eq: false }},
	//		// TODO: Add a ~has_pin filter to the filters

	// })
	const paginationString = makePaginationString(first, after)

	const q = /* GraphQL */ `
		query getMapPins($uid: string, $first: int, $after: string) {
			pins(func: eq(type, "pin"), ${paginationString}) @filter(uid_in(~has_pin, ${mapUid}) AND eq(deleted, false)) {
				${publicFields}
			}
		}
	`
	const result = await query(q, { first, after })
	return result && result.pins ? parsePinResults(result.pins) : []
}
