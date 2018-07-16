// @flow
import { assemblePage } from '../../../utils/graphql'
import type { GetUserArgs, UserType } from '../UserTypes'
import type { GraphQLContext, PaginationInput, PageType } from '../../shared/sharedTypes'
import { createJWT } from '../../../utils/auth'

export const user = (_: Object, { input }: GetUserArgs, ctx: GraphQLContext): Promise<UserType | null | Error> =>
	ctx.models.User.getUser(input)

export const users = async (_: Object, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType | null | Error> => {
	const fetchedUsers = await ctx.models.User.getUsers(input, ctx.viewer)
	return assemblePage(fetchedUsers, input)
}

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
