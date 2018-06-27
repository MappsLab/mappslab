// @flow

import type { UserType } from '../UserTypes'
import type { GraphQLContext, PaginationArgs, PageType } from '../../shared/sharedTypes'

type PaginationInput = {
	input: PaginationArgs,
}

export const pins = (loadedUser: UserType, args: PaginationArgs, ctx: GraphQLContext): Promise<PageType | Error> =>
	ctx.models.Pin.getPinsByUser(loadedUser, args)

export const classrooms = (loadedUser: UserType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType | Error> =>
	ctx.models.Classroom.getClassroomsByUser(loadedUser, input)
