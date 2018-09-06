// @flow
import type { GraphQLContext } from 'Types/sharedTypes'
import type { PasswordResetInput, ViewerType } from 'Types/UserTypes'
import type { JWT } from 'Utils/auth'
import { createJWT } from 'Utils/auth'
import { ValidationError } from 'Errors'

const loginViewerMutation = async (
	_: mixed,
	args: { input: PasswordResetInput },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | { resetToken: string }> => {
	const { input } = args
	const result = await ctx.models.User.updatePassword(input)
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

export default loginViewerMutation
