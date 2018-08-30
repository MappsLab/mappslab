// @flow
import bcrypt from 'bcrypt'
import { dissoc, head } from 'ramda'
import { query } from 'Database'
import type { UserType, Credentials } from 'Types/UserTypes'
import { publicFields } from './userDBSchema'

// const debug = require('debug')('api')

export const checkPassword = async (credentials: Credentials): Promise<UserType | { requiresReset: true } | false> => {
	const { email, password, uid } = credentials

	const func = uid ? `uid(${uid})` : 'eq(email, $email)'
	const q = `query getUser($email: string) {
		getUser(func: ${func}) {
			${publicFields}
			password
			temporaryPassword
		}
	}`
	const args = email ? { email } : undefined
	const result = await query(q, args)
	if (result === null) return false
	const user = head(result.getUser)
	if (!user) return false

	const valid = await bcrypt.compare(password, user.password || '')
	// If the password is correct, return the user
	if (valid) return dissoc('temporaryPassword', dissoc('password', user))

	// otherwise, see if the reset password is valid
	const resetValid = await bcrypt.compare(password, user.temporaryPassword || '')
	if (resetValid) return { requiresReset: true }

	// if not, return false. The credentials are not valid.
	return false
}
