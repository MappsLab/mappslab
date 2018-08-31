// @flow
import { head } from 'ramda'
import { query } from 'Database'
import { makePaginationArgs } from 'Database/utils'
import type { GetUserArgs, UserType } from 'Types/UserTypes'
import type { PaginationArgs } from 'Types/sharedTypes'
import { publicFields, viewerFields } from './userDBSchema'

// const debug = require('debug')('api')

export const getUser = async ({ uid, email }: GetUserArgs): Promise<UserType | null> => {
	const func = uid ? `uid(${uid})` : `eq(email, $email)`
	const q = /* GraphQL */ `
		query getUser($uid: string, $email: string) {
			getUser(func: ${func}) {
				${publicFields}
			}
		}
	`
	const sleep = (ms: number = 500) => new Promise((r) => setTimeout(r, ms))
	await sleep(2000)

	const result = await query(q, { uid, email })
	if (!result) return null
	const user = result.getUser[0]
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

export const getViewer = async (args: { uid: string }): Promise<UserType | null> => {
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
