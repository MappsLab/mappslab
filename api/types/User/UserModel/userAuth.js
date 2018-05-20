// @flow
import bcrypt from 'bcrypt'
import { dissoc, head } from 'ramda'
import { query } from '../../../database'
import type { UserType, Credentials } from '../UserTypes'
import { publicFields } from './userDBSchema'
import { ValidationError } from '../../../errorTypes'

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
	const args = { email, uid }
	const result = await query(q, args)
	console.log(result.getJson())
	const user = head(result.getJson().getUser)
	if (!user) throw new ValidationError(errorMessage)

	const valid = await bcrypt.compare(password, user.password).catch((err) => {
		if (err.name === 'MismatchError') throw new ValidationError(errorMessage)
		throw err
	})
	if (valid) return dissoc('password', user)
	throw new ValidationError(errorMessage)
}
