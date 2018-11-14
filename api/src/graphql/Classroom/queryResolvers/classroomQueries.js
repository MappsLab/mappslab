// @flow

import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PageType, GetNodeInput, PaginationInput, GraphQLContext } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const classroom = (_: Object, { input }: GetNodeInput, ctx: GraphQLContext): Promise<ClassroomType | null> =>
	ctx.models.Classroom.getClassroom(input, ctx.viewer)

export const classrooms = async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<ClassroomType>> => {
	const fetchedClassrooms = await ctx.models.Classroom.getClassrooms(input, ctx.viewer).catch((err) => {
		throw err
	})
	const page = assemblePage(fetchedClassrooms, input)
	return page
}
