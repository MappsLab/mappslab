// @flow
import deepMerge from 'deepmerge'
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { GraphQLContext, PageType, PaginationInput } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const pins = async (
	fetchedRoute: RouteType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<PinType>> => {
	const mapFilter = {
		where: {
			pinWithinRoute: {
				eq: fetchedRoute.uid,
			},
		},
	}
	const mergedInput = deepMerge(input || {}, mapFilter)
	const fetchedPins = await ctx.models.Pin.getPins(mergedInput)
	return assemblePage(fetchedPins, input)
}
