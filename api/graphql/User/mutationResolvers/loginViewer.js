// @flow
import type { GraphQLContext } from 'Types/sharedTypes'
import type { Credentials, ViewerType } from 'Types/UserTypes'
import type { JWT } from 'Utils/auth'
import { createJWT } from 'Utils/auth'
import { ValidationError } from 'Errors'

const loginViewerMutation = async (
	_: mixed,
	args: { credentials: Credentials },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | { requiresReset: true }> => {
	const { credentials } = args
	const result = await ctx.models.User.checkPassword(credentials)
	if (result && !result.requiresReset) {
		const jwt = createJWT(result)
		return {
			viewer: result,
			jwt,
		}
	}
	if (result && result.requiresReset) return { requiresReset: true }
	throw new ValidationError('Email and password do not match')
}

export default loginViewerMutation
