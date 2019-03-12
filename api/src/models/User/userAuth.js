// @flow
import bcrypt from 'bcrypt'
import { dissoc, head } from 'ramda'
import { query, mutateNode } from 'Database'
import type { UserType, Credentials, PasswordReset, SetTemporaryPasswordInput, PasswordResetInput } from 'Types/UserTypes'
import type { Success } from 'Types/sharedTypes'
import { createToken } from 'Utils/auth'
import { ValidationError } from 'Errors'
import { getUser } from './readUser'
import { publicFields, clean, validateUpdate } from './userDBSchema'

// const debug = require('debug')('test')

export const checkPassword = async (
	credentials: Credentials,
): Promise<UserType | { uid: string, requiresReset: true } | false> => {
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
	if (resetValid) return { uid: user.uid, requiresReset: true }
	// if not, return false. The credentials are not valid.
	return false
}

export const createResetToken = async (userUid: string): Promise<PasswordReset> => {
	const token = await createToken()
	const expires = new Date(Date.now() + 3600000)
	const passwordReset = { token, expires }
	const cleaned = await clean({ passwordReset })
	const validated = await validateUpdate(cleaned)
	await mutateNode(userUid, { data: validated })
	return passwordReset
}

export const resetPassword = async (credentials: PasswordResetInput): Promise<UserType> => {
	const { resetToken, password } = credentials
	// First, make sure a user with this reset token exists, and that it has not expired.
	const userQ = /* GraphQL */ `
			query getUser($resetToken: string) {
				getUser(func: eq(type, "user")) @filter(eq(passwordReset.token, $resetToken)){
					uid
					name
					roles
					passwordReset.token
					passwordReset.expires
				}
			}
		`
	const result = await query(userQ, { resetToken })
	if (!result || !result.getUser.length || result.getUser[0].passwordReset.expires > new Date()) {
		throw new ValidationError('This password reset request has expired.')
	}
	const user = result.getUser[0]
	const passwordReset = {
		token: null,
		expires: null,
	}
	const cleaned = await clean({ password, passwordReset, temporaryPassword: null, temporaryPasswordExpires: null })
	const validated = await validateUpdate(cleaned)

	await mutateNode(user.uid, { data: validated })
	return user
}

export const setTemporaryPassword = async (input: SetTemporaryPasswordInput, viewer: UserType): Promise<Success> => {
	if (!(viewer.roles.includes('teacher') || viewer.roles.includes('admin'))) {
		throw new ValidationError('You must be a teacher or admin to set temporary passwords')
	}
	const { uid, temporaryPassword } = input
	const user = await getUser({ uid })
	if (!user) throw new ValidationError('A user with this ID does not exist')
	if (user.roles.includes('teacher') && !viewer.roles.includes('admin')) {
		throw new ValidationError('You must be an admin to set a temporary password for a teacher')
	}
	if (user.roles.includes('admin')) {
		throw new ValidationError('Admins cannot have temporary passwords')
	}

	const temporaryPasswordExpires = new Date(Date.now() + 3600000)
	const cleaned = await clean({ temporaryPassword, temporaryPasswordExpires })
	const validated = await validateUpdate(cleaned)
	await mutateNode(user.uid, { data: validated })
	return {
		success: true,
		messages: [],
	}
}
