// @flow
import type { GraphQLContext } from 'Types/sharedTypes'
import type { Credentials, ViewerType } from 'Types/UserTypes'
import type { JWT } from 'Utils/auth'
import { createJWT } from 'Utils/auth'

const loginViewerMutation = async (
	_: mixed,
	args: { credentials: Credentials },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | Error> => {
	const { credentials } = args
	const viewer = await ctx.models.User.checkPassword(credentials).catch((e) => {
		throw e
	})
	const jwt = createJWT(viewer)
	return {
		viewer,
		jwt,
	}
}

export default loginViewerMutation
