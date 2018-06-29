// @flow
import { head, prop, last } from 'ramda'
import { query } from '../../../database'
import type { UserType } from '../../User/UserTypes'
import type { PinType, GetPinArgs } from '../PinTypes'
import type { PaginationArgs, PageType } from '../../shared/sharedTypes'
import { publicFields, parsePinResult } from './pinDBSchema'
import { publicFields as userFields } from '../../user/UserModel/userDBSchema'
import { createFilterString, makePaginationArgs } from '../../../database/utils'

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

export const getPinsByUser = async (user: UserType, args: PaginationArgs): Promise<Array<PinType> | Error> => {
	const { first, after, filter } = makePaginationArgs(args)
	const filterString = filter ? createFilterString(filter) : ''

	const { uid } = user
	const q = /* GraphQL */ `
		query getPins($uid: string, $first: int, $after: string) {
			getPins(func: uid(${uid})) ${filterString} {
				pinned (first: $first, after: $after) {
					${publicFields}
				}
			}
		}
	`
	const result = await query(q, { uid, first, after })
	return result.getPins[0].pinned
}
