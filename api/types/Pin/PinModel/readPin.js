// @flow
import { query } from '../../../database'
import type { PinType, GetPinArgs } from '../PinTypes'
import { publicFields, parsePinResult } from './pinDBSchema'

export const getPin = async ({ uid }: GetPinArgs): Promise<PinType | null | Error> => {
	const q = /* GraphQL */ `
		query getPin {
			getPin(func: uid(${uid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const pin = parsePinResult(result.getPin)
	return pin
}

export const getPins = () => {}
