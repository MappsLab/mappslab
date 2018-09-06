// @flow
import { query, mutateNode } from 'Database'
import type { PasswordResetInput, UserType } from 'Types/UserTypes'
import { ValidationError } from 'Errors'

export const updatePassword = async (credentials: PasswordResetInput): Promise<UserType> => {
	const { resetToken, password } = credentials

	const q = `query getUser($token: string) {
		getUser(func: eq(passwordReset.token, $token)) {
			uid
		}
	}`
	const args = { token: resetToken }
	const result = await query(q, args)
	if (!result || !result.getUser || result.getUser.length === 0) throw new ValidationError('This reset token is invalid')
	console.log(result)
}
