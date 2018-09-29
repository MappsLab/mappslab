// @flow
import { query } from 'Database'
import type { PinType } from 'Types/PinTypes'
import type { PaginationArgs } from 'Types/sharedTypes'
import { createFilterString, makePaginationArgs } from 'Database/utils'
import { publicFields, parsePinResults } from './pinDBSchema'

export const getUserPins = async (userUid: string, args?: PaginationArgs): Promise<Array<PinType>> => {
	const { first, after, filter } = makePaginationArgs(args)
	const filterString = filter ? createFilterString(filter) : ''

	const q = /* GraphQL */ `
		query getPins($uid: string, $first: int, $after: string) {
			getPins(func: uid(${userUid})) ${filterString} {
				pinned (first: $first, after: $after) @filter(eq(deleted, false)) {
					${publicFields}
				}
			}
		}
	`
	const result = await query(q, { first, after })
	return result && result.getPins ? parsePinResults(result.getPins[0].pinned) : []
}

export const getMapPins = async (mapUid: string, args?: PaginationArgs): Promise<Array<PinType>> => {
	const { first, after } = makePaginationArgs(args)
	// const filterString = filter ? createFilterString(filter) : ''

	const q = /* GraphQL */ `
		query getMapPins($uid: string, $first: int, $after: string) {
			pins(func: eq(type, "pin")) @filter(uid_in(~has_pin, ${mapUid}) AND eq(deleted, false)) {
				${publicFields}
			}
		}
	`
	const result = await query(q, { first, after })
	return result && result.pins ? parsePinResults(result.pins) : []
}
