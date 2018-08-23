// @flow
import type { PaginationInput, PageType, GraphQLContext } from 'Types/sharedTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import { assemblePage } from 'Utils/graphql'

export const studentsConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | Error> => {
	const fetchedUsers = await ctx.models.User.getClassroomStudents(fetchedClassroom.uid, input)
	return assemblePage(fetchedUsers, input)
}

export const teachersConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | Error> => {
	const fetchedUsers = await ctx.models.User.getClassroomTeachers(fetchedClassroom.uid, input)
	return assemblePage(fetchedUsers, input)
}

export const mapsConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | null> => {
	const fetchedMaps = await ctx.models.Map.getClassroomMaps(fetchedClassroom.uid)
	// $FlowFixMe -- TODO
	return fetchedMaps ? assemblePage(fetchedMaps, input) : null
}
