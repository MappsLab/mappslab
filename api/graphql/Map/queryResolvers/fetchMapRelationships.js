// @flow

import type { MapType } from 'Types/MapTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'
import type { GraphQLContext, PageType, PaginationInput, GetNodeArgs } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

type GetMapInput = {
	input: GetNodeArgs,
}

export const classroom = (fetchedMap: MapType, _: GetMapInput, ctx: GraphQLContext): Promise<ClassroomType | null> =>
	ctx.models.Classroom.getMapClassroom(fetchedMap.uid)

export const pins = async (fetchedMap: MapType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType<PinType>> => {
	const fetchedPins = await ctx.models.Pin.getMapPins(fetchedMap.uid, input)
	return assemblePage(fetchedPins, input)
}
