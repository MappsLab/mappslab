// @flow
import { query } from 'Database'
import type { PinType } from 'Types/PinTypes'
import type { PaginationArgs } from 'Types/sharedTypes'
import { publicFields, parsePinResult } from './pinDBSchema'

export const getPin = async (uid: string): Promise<PinType | null> => {
	const q = /* GraphQL */ `
		query getPin {
			getPin(func: uid(${uid})) @filter(eq(type, "pin")) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const pin = parsePinResult(result.getPin)
	return pin
}

export const getPins = async (args?: PaginationArgs): Promise<Array<?PinType>> => {
	// const { first, after } = makePaginationArgs(args)
	const q = /* GraphQL */ `
		query getPins {
			getPins(func: eq(type, "pin")) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	return result.getPins || []
}
