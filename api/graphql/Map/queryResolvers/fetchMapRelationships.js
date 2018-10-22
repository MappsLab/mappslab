// @flow
import deepMerge from 'deepmerge'
import type { MapType } from 'Types/MapTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { GraphQLContext, PageType, PaginationInput, GetNodeArgs } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

type GetMapInput = {
	input: GetNodeArgs,
}

export const classroom = (fetchedMap: MapType, _: GetMapInput, ctx: GraphQLContext): Promise<ClassroomType | null> =>
	ctx.models.Classroom.getMapClassroom(fetchedMap.uid)

export const pins = async (fetchedMap: MapType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType<PinType>> => {
	const mapFilter = {
		where: {
			pinnedInMap: {
				eq: fetchedMap.uid,
			},
		},
	}
	const mergedInput = deepMerge(input || {}, mapFilter)
	const fetchedPins = await ctx.models.Pin.getPins(mergedInput)

	return assemblePage(fetchedPins, input)
}

export const routes = async (
	fetchedMap: MapType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<RouteType>> => {
	const mapFilter = {
		where: {
			routeWithinMap: { eq: fetchedMap.uid },
		},
	}
	const mergedInput = deepMerge(input || {}, mapFilter)
	const fetchedRoutes = await ctx.models.Route.getRoutes(mergedInput)
	return assemblePage(fetchedRoutes, input)
}
