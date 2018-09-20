// @flow

import type { UserType } from 'Types/UserTypes'
import type { GraphQLContext, PaginationInput, PageType } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const pins = async (loadedUser: UserType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType | Error> => {
	const fetchedPins = await ctx.models.Pin.getUserPins(loadedUser.uid, input)
	return assemblePage(fetchedPins, input)
}

export const classrooms = async (
	loadedUser: UserType,
	{ input }: PaginationInput = {},
	ctx: GraphQLContext,
): Promise<PageType | Error> => {
	const method = loadedUser.roles.includes('teacher')
		? ctx.models.Classroom.getTeacherClassrooms
		: ctx.models.Classroom.getStudentClassrooms
	const fetchedClassrooms = await method(loadedUser.uid, input)
	return assemblePage(fetchedClassrooms, input)
}
