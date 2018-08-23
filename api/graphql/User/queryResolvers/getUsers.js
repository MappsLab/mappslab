// @flow
import type { GetUserInput, UserType } from 'Types/UserTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { createJWT } from 'Utils/auth'

export const user = (_: Object, { input }: GetUserInput, ctx: GraphQLContext): Promise<UserType | null | Error> =>
	ctx.models.User.getUser(input)

export const currentViewer = async (_: Object, args: null, ctx: GraphQLContext): Promise<UserType | null | Error> => {
	if (!ctx.viewer || !ctx.viewer.uid) return null
	const { uid } = ctx.viewer
	const viewer = await ctx.models.User.getViewer({ uid })
	const jwt = viewer ? createJWT(viewer) : null
	return {
		viewer,
		jwt,
	}
}
