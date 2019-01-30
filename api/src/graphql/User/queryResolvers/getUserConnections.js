// @flow
import deepMerge from 'deepmerge'
import type { UserType } from 'Types/UserTypes'
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { GraphQLContext, PaginationInput, PageType } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const pins = async (loadedUser: UserType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType<PinType>> => {
	const userFilter = {
		where: {
			pinnedByUser: {
				eq: loadedUser.uid,
			},
		},
	}
	const mergedInput = deepMerge(input || {}, userFilter)
	const fetchedPins = await ctx.models.Pin.getPins(mergedInput)
	return assemblePage(fetchedPins, input)
}

export const routes = async (
	loadedUser: UserType,
	{ input }: PaginationInput = {},
	ctx: GraphQLContext,
): Promise<PageType<RouteType>> => {
	const where = {
		userHasroute: { eq: loadedUser.uid },
	}
	const userRoutes = await ctx.models.Route.getRoutes({ where })
	return assemblePage(userRoutes, input)
}

export const classrooms = async (
	loadedUser: UserType,
	{ input }: PaginationInput = {},
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType>> => {
	const where = loadedUser.roles.includes('teacher')
		? { classroomHasTeacher: { eq: loadedUser.uid } }
		: { classroomHasStudent: { eq: loadedUser.uid } }
	const userClassrooms = await ctx.models.Classroom.getClassrooms({ where }, ctx.viewer)
	return assemblePage(userClassrooms, input)
}
