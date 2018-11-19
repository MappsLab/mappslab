// @flow
import type { PaginationInput, PageType, GraphQLContext } from 'Types/sharedTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { MapType } from 'Types/MapTypes'
import type { UserType } from 'Types/UserTypes'
import { assemblePage } from 'Utils/graphql'

// @todo remove User.getClassroomStudents and User.getClassroomTeachers
// @body use filters insteadl

export const classroomStudents = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<UserType>> => {
	const fetchedUsers = await ctx.models.User.getClassroomStudents(fetchedClassroom.uid, input)
	return assemblePage(fetchedUsers, input)
}

export const classroomTeachers = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<UserType>> => {
	const fetchedUsers = await ctx.models.User.getClassroomTeachers(fetchedClassroom.uid, input)
	return assemblePage(fetchedUsers, input)
}

export const classroomMaps = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<MapType> | null> => {
	const filter = { where: { mapBelongsToClassroom: { eq: fetchedClassroom.uid } } }
	const result = await ctx.models.Map.getMaps(filter)
	return assemblePage(result, input)
}
