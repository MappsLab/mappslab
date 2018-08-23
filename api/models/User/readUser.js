// @flow
import { head } from 'ramda'
import { query } from 'Database'
import { makePaginationArgs } from 'Database/utils'
import type { GetUserArgs, UserType } from 'Types/UserTypes'
import type { PaginationArgs } from 'Types/sharedTypes'
import { publicFields, viewerFields } from './userDBSchema'

// const debug = require('debug')('api')

export const getUser = async ({ uid }: GetUserArgs): Promise<UserType | null | Error> => {
	const q = /* GraphQL */ `
		query getUser($uid: string) {
			getUser(func: uid(${uid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q, { uid })
	const user = head(result.getUser)
	return user
}

export const getUsers = async (args?: PaginationArgs): Promise<Array<UserType>> => {
	const { first, after } = makePaginationArgs(args)
	const q = /* GraphQL */ `
		query getUsers($first: string, $after: string) {
			getUsers(func: eq(type, "user"), first: $first, after: $after) {
				${publicFields}
			}
		}
	`
	const result = await query(q, { first, after })
	return result.getUsers
}

export const getViewer = async (args: { uid: string }): Promise<UserType | null | Error> => {
	const { uid } = args
	const q = `query getUser($uid: string) {
		getUser(func: uid(${uid})) {
			${publicFields}
			${viewerFields}
		}
	}`
	const result = await query(q, args)
	const viewer = head(result.getUser)
	return viewer
}
