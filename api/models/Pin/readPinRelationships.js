// @flow
import { query } from 'Database'
import type { PinType } from '../PinTypes'
import type { PaginationArgs } from '../../shared/sharedTypes'
import { publicFields, parsePinResults } from './pinDBSchema'
import { createFilterString, makePaginationArgs } from 'Database/utils'

export const getUserPins = async (userUid: string, args: PaginationArgs): Promise<Array<PinType> | Error> => {
	const { first, after, filter } = makePaginationArgs(args)
	const filterString = filter ? createFilterString(filter) : ''

	const q = /* GraphQL */ `
		query getPins($uid: string, $first: int, $after: string) {
			getPins(func: uid(${userUid})) ${filterString} {
				pinned (first: $first, after: $after) {
					${publicFields}
				}
			}
		}
	`
	const result = await query(q, { first, after })
	return result.getPins ? parsePinResults(result.getPins[0].pinned) : []
}

export const getMapPins = async (mapUid: string, args: PaginationArgs): Promise<Array<PinType> | Error> => {
	const { first, after, filter } = makePaginationArgs(args)
	// const filterString = filter ? createFilterString(filter) : ''

	const q = /* GraphQL */ `
		query getMapPins($uid: string, $first: int, $after: string) {
			pins(func: eq(type, "pin")) @filter(uid_in(~has_pin, ${mapUid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q, { first, after })
	return parsePinResults(result.pins)
}
