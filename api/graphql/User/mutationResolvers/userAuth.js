// @flow
import type { GraphQLContext } from 'Types/sharedTypes'
import type { Credentials, ViewerType, PasswordResetInput, JWT } from 'Types/UserTypes'
import { createJWT } from 'Utils/auth'
import { ValidationError } from 'Errors'

export const loginViewer = async (
	_: mixed,
	args: { input: Credentials },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | { resetToken: string }> => {
	const { input } = args
	const result = await ctx.models.User.checkPassword(input)
	if (result && !result.requiresReset) {
		const jwt = createJWT(result)
		return {
			viewer: result,
			jwt,
		}
	}
	if (result && result.uid && result.requiresReset) {
		const { token } = await ctx.models.User.createResetToken(result.uid)
		return { resetToken: token }
	}
	throw new ValidationError('Email and password do not match')
}

export const resetPassword = async (
	_: mixed,
	{ input }: { input: PasswordResetInput },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | { resetToken: string }> => {
	const user = await ctx.models.User.resetPassword(input)
	const jwt = createJWT(user)
	return {
		viewer: user,
		jwt,
	}
}
