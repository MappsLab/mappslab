// @flow
import { query } from 'Database'
import { makeFilterString, makePaginationString } from 'Database/utils'
import type { GetUserInput, UserType } from 'Types/UserTypes'
import type { PaginationArgs } from 'Types/sharedTypes'
import { publicFields, viewerFields } from './userDBSchema'

// const debug = require('debug')('api')

export const getUser = async ({ uid, email }: GetUserInput): Promise<UserType | null> => {
	const func = uid ? `uid(${uid})` : `eq(email, $email)`
	const q = /* GraphQL */ `
		query getUser($uid: string, $email: string) {
			getUser(func: ${func}) {
				${publicFields}
			}
		}
	`

	const result = await query(q, { uid, email })
	if (!result) return null
	const user = result.getUser[0]
	return user
}

export const getUsers = async (args?: PaginationArgs = {}): Promise<Array<UserType>> => {
	const { first, after, filter } = args
	const filterString = makeFilterString(filter)
	const paginationString = makePaginationString(first, after)
	const q = /* GraphQL */ `
		query getUsers {
			getUsers(func: eq(type, "user") ${paginationString}) ${filterString} {
				${publicFields}
				email
			}
		}
	`
	const result = await query(q, { first, after })
	if (!result || !result.getUsers) return []
	return result.getUsers
}

export const getViewer = async (args: { uid: string }): Promise<UserType | null> => {
	const { uid } = args
	const q = `query getUser($uid: string) {
		getUser(func: uid(${uid})) {
			${publicFields}
			${viewerFields}
		}
	}`
	const result = await query(q, args)
	if (!result || !result.getUser) return null
	const [viewer] = result.getUser
	return viewer
}
