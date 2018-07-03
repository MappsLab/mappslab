// @flow

import type { MapType } from '../MapTypes'
import type { ClassroomType } from '../../Classroom/ClassroomTypes'
import type { GraphQLContext, PageType, PaginationInput, GetNodeArgs } from '../../shared/sharedTypes'
import { assemblePage } from '../../../utils/graphql'

type GetMapInput = {
	input: GetNodeArgs,
}

export const classroom = (fetchedMap: MapType, _: GetMapInput, ctx: GraphQLContext): Promise<ClassroomType | null | Error> =>
	ctx.models.Classroom.getMapClassroom(fetchedMap.uid)

export const pins = async (fetchedMap: MapType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType> => {
	const fetchedPins = await ctx.models.Pin.getMapPins(fetchedMap.uid, input).catch((e) => console.log(e))
	console.log(fetchedPins)
	console.log(assemblePage(fetchedPins))
	return assemblePage(fetchedPins, input)
}
