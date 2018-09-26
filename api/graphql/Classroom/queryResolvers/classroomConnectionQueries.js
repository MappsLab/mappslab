// @flow
import type { PaginationInput, PageType, GraphQLContext } from 'Types/sharedTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import { assemblePage } from 'Utils/graphql'

export const classroomStudents = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType>> => {
	const fetchedUsers = await ctx.models.User.getClassroomStudents(fetchedClassroom.uid, input)
	return assemblePage(fetchedUsers, input)
}

export const classroomTeachers = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType>> => {
	const fetchedUsers = await ctx.models.User.getClassroomTeachers(fetchedClassroom.uid, input)
	return assemblePage(fetchedUsers, input)
}

export const classroomMaps = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType> | null> => {
	const fetchedMaps = await ctx.models.Map.getClassroomMaps(fetchedClassroom.uid)
	// $FlowFixMe -- TODO
	return fetchedMaps ? assemblePage(fetchedMaps, input) : null
}
