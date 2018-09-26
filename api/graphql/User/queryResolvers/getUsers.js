// @flow
import type { GetUserInput, UserType, JWT } from 'Types/UserTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { createJWT } from 'Utils/auth'

export const user = (_: Object, { input }: { input: GetUserInput }, ctx: GraphQLContext): Promise<UserType | null> =>
	ctx.models.User.getUser(input)

type CurrentViewer = {
	viewer: UserType | null,
	jwt: JWT | null,
}

export const currentViewer = async (_: Object, args: null, ctx: GraphQLContext): Promise<CurrentViewer | null> => {
	if (!ctx.viewer || !ctx.viewer.uid) return null
	const { uid } = ctx.viewer
	const viewer = await ctx.models.User.getViewer({ uid })
	const jwt = viewer ? createJWT(viewer) : null
	return {
		viewer,
		jwt,
	}
}
