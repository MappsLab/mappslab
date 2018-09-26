// @flow

import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PageType, GetNodeInput, PaginationInput, GraphQLContext } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const classroom = (_: Object, { input }: GetNodeInput, ctx: GraphQLContext): Promise<ClassroomType | null> =>
	ctx.models.Classroom.getClassroom(input)

export const classrooms = async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType> | null> => {
	const fetchedClassrooms = await ctx.models.Classroom.getClassrooms().catch((err) => {
		throw err
	})
	if (!fetchedClassrooms) return null
	const page = assemblePage(fetchedClassrooms, input)
	return page
}
