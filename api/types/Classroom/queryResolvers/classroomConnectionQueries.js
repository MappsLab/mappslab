// @flow
import type { PaginationInput, PageType, GraphQLContext } from '../../shared/sharedTypes'
import type { ClassroomType } from '../ClassroomTypes'
import { assemblePage } from '../../../utils/graphql'

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
): Promise<PageType | Error> => {
	const fetchedMaps = await ctx.models.Map.getClassroomMaps(fetchedClassroom.uid, input).catch((e) => console.log(e))
	return assemblePage(fetchedMaps, input)
}
