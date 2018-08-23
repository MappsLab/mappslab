// @flow
import { query } from 'Database'
import type { PinType } from '../PinTypes'
import { publicFields, parsePinResult } from './pinDBSchema'

export const getPin = async (uid: string): Promise<PinType | null> => {
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
