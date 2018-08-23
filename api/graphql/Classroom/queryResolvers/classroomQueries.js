// @flow

import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PageType, GetNodeInput, PaginationInput, GraphQLContext } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const classroom = (_: Object, { input }: GetNodeInput, ctx: GraphQLContext): Promise<ClassroomType | null | Error> =>
	ctx.models.Classroom.getClassroom(input)

export const classrooms = async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | null | Error> => {
	const fetchedClassrooms = await ctx.models.Classroom.getClassrooms(input).catch((err) => {
		throw err
	})
	return assemblePage(fetchedClassrooms, input)
}
