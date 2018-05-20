// @flow
import { head } from 'ramda'
import { query } from '../../../database'
import type { GetUserArgs, UserType } from '../UserTypes'
import { publicFields, viewerFields } from './userDBSchema'

const debug = require('debug')('api')

export const getUser = async ({ uid }: GetUserArgs): Promise<UserType | null | Error> => {
	const q = /* GraphQL */ `
		query getUser($uid: string) {
			getUser(func: uid(${uid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const user = head(result.getJson().getUser)
	debug(user)
	return user
}

export const getUsers = () => {}

export const getViewer = async (args: { uid: string }): Promise<UserType | null | Error> => {
	const { uid } = args
	const q = `query getUser($uid: string) {
		getUser(func: uid(${uid})) {
			${publicFields}
			${viewerFields}
		}
	}`
	const result = await query(q, args)
	const viewer = head(result.getJson().getUser)
	return viewer
}
