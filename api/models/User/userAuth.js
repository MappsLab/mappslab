// @flow
import bcrypt from 'bcrypt'
import { dissoc, head } from 'ramda'
import { query } from 'Database'
import type { UserType, Credentials } from 'Types/UserTypes'
import { ValidationError } from 'Errors'
import { publicFields } from './userDBSchema'

// const debug = require('debug')('api')

export const checkPassword = async (credentials: Credentials): Promise<UserType | Error> => {
	const { email, password, uid } = credentials
	const errorMessage = 'Email and password do not match'

	const func = uid ? `uid(${uid})` : 'eq(email, $email)'
	// make a new query here to limit access to the `password` prop
	const q = `query getUser($email: string) {
		getUser(func: ${func}) {
			${publicFields}
			password
		}
	}`
	const args = email ? { email } : undefined
	const result = await query(q, args)
	if (result === null) throw new ValidationError(errorMessage)
	const user = head(result.getUser)
	if (!user) throw new ValidationError(errorMessage)

	const valid = await bcrypt.compare(password, user.password).catch((err) => {
		if (err.name === 'MismatchError') throw new ValidationError(errorMessage)
		throw err
	})
	if (valid) return dissoc('password', user)
	throw new ValidationError(errorMessage)
}
