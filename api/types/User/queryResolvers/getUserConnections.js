// @flow

import type { UserType } from '../UserTypes'
import type { GraphQLContext, PaginationInput, PageType } from '../../shared/sharedTypes'
import { assemblePage } from '../../../utils/graphql'

export const pins = async (loadedUser: UserType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType | Error> => {
	const fetchedPins = await ctx.models.Pin.getPinsByUser(loadedUser, input)
	return assemblePage(fetchedPins, input)
}

export const classrooms = async (
	loadedUser: UserType,
	{ input }: PaginationInput = {},
	ctx: GraphQLContext,
): Promise<PageType | Error> => {
	const fetchedClassrooms = await ctx.models.Classroom.getClassroomsByUser(loadedUser, input)
	return assemblePage(fetchedClassrooms, input)
}
