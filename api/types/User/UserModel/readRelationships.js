// @flow
import { head } from 'ramda'
import { query } from '../../../database'
import { makePaginationArgs } from '../../../database/utils'
import type { GetUserArgs, UserType } from '../UserTypes'
import type { PaginationArgs } from '../../shared/sharedTypes'
import { publicFields, viewerFields } from './userDBSchema'

const debug = require('debug')('api')

export const getPinOwner = async (pinUid: string): Promise<UserType | null | Error> => {
	const q = /* GraphQL */ `
		query getUser($uid: string) {
			getUser(func: eq(type, "user")) @filter(uid_in(pinned, ${pinUid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const user = head(result.getUser)
	return user
}
