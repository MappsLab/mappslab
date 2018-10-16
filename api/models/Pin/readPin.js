// @flow
import { query } from 'Database'
import type { PinType } from 'Types/PinTypes'
import type { PaginationArgs } from 'Types/sharedTypes'
import { makeFilterString, makePaginationString } from 'Database/utils'
import { publicFields, parsePinResult } from './pinDBSchema'

export const getPin = async (uid: string): Promise<PinType | null> => {
	const q = /* GraphQL */ `
		query getPin {
			getPin(func: uid(${uid})) @filter(eq(type, "pin") AND eq(deleted, false)) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	if (!result) return null
	const pin = parsePinResult(result.getPin)
	return pin
}

export const getPins = async (args?: PaginationArgs = {}): Promise<Array<PinType>> => {
	const { first, after, filter } = args
	const filterString = makeFilterString({
		deleted: { eq: false },
		...filter,
	})
	const paginationString = makePaginationString(first, after)
	const q = /* GraphQL */ `
		query getPins {
			getPins(func: eq(type, "pin") ${paginationString}) ${filterString} {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	if (!result || !result.getPins) return []
	return result.getPins
}
