// @flow

import type { UserType } from 'Types/UserTypes'
import type { PinType } from 'Types/PinTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { GraphQLContext, PaginationInput, PageType } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const pins = async (loadedUser: UserType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType<PinType>> => {
	const fetchedPins = await ctx.models.Pin.getUserPins(loadedUser.uid, input)
	return assemblePage(fetchedPins, input)
}

export const classrooms = async (
	loadedUser: UserType,
	{ input }: PaginationInput = {},
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType>> => {
	const method = loadedUser.roles.includes('teacher')
		? ctx.models.Classroom.getTeacherClassrooms
		: ctx.models.Classroom.getStudentClassrooms
	const fetchedClassrooms = await method(loadedUser.uid /* input */)
	return assemblePage(fetchedClassrooms, input)
}
