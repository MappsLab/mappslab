// @flow
import type { GetUserInput, UserType, JWT } from 'Types/UserTypes'
import type { GraphQLContext, PaginationInput, PageType } from 'Types/sharedTypes'
import { createJWT } from 'Utils/auth'
import { assemblePage } from 'Utils/graphql'

export const user = (_: Object, { input }: { input: GetUserInput }, ctx: GraphQLContext): Promise<UserType | null> =>
	ctx.models.User.getUser(input)

export const users = async (_: Object, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType<UserType>> => {
	const fetchedUsers = await ctx.models.User.getUsers(input).catch((err) => {
		throw err
	})
	const page = assemblePage(fetchedUsers, input)
	return page
}

const getByRole = (role: string) => async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<UserType>> => {
	const fetchedUsers = await ctx.models.User.getUsers({
		where: {
			roles: {
				eq: role,
			},
		},
	})
	return assemblePage(fetchedUsers, input)
}

export const teachers = getByRole('teacher')
export const students = getByRole('student')

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
