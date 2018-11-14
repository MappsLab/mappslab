// @flow
import { query } from 'Database'
import { createQueryStrings } from 'Database/utils'
import type { GetUserInput, UserType } from 'Types/UserTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import { publicFields, viewerFields } from './userDBSchema'

// const debug = require('debug')('api')

export const getUser = async (args: GetUserInput): Promise<UserType | null> => {
	const { varBlocks, filterString } = createQueryStrings(args)
	const { uid, email } = args
	const func = uid ? `uid(${uid})` : `eq(email, $email)`
	const q = /* GraphQL */ `
		query getUser($uid: string, $email: string) {
			${varBlocks}
			getUser(func: ${func}) ${filterString} {
				${publicFields}
			}
		}
	`
	const result = await query(q, { uid, email })
	if (!result) return null
	const user = result.getUser[0]
	return user
}

export const getUsers = async (args?: PaginationFilterArgs = {}): Promise<Array<UserType>> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings(args)

	const q = /* GraphQL */ `
		query getUsers {
			${varBlocks}
			getUsers(func: eq(type, "user") ${paginationString}) ${filterString} {
				${publicFields}
				email
			}
		}
	`
	const result = await query(q)
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
