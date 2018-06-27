// @flow
import type { PaginationInput, PageType, GraphQLContext } from '../../shared/sharedTypes'
import type { ClassroomType } from '../ClassroomTypes'
import { assemblePage } from '../../../utils/graphql'

export const studentsConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | Error> => {
	const fetchedUsers = await ctx.models.User.getStudents(fetchedClassroom, input)
	return assemblePage(fetchedUsers, input)
}

export const teachersConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | Error> => {
	const fetchedUsers = await ctx.models.User.getTeachers(fetchedClassroom, input)
	return assemblePage(fetchedUsers, input)
}
