// @flow
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { UserType } from 'Types/UserTypes'
import type { GraphQLContext, PageType, PaginationInput } from 'Types/sharedTypes'
import deepMerge from 'deepmerge'
import { assemblePage } from 'Utils/graphql'

export const pins = async (
	fetchedRoute: RouteType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<PinType>> => {
	const pinFilter = {
		where: {
			pinWithinRoute: {
				eq: fetchedRoute.uid,
			},
		},
	}
	/* merge the default filter with any supplied filter */
	const mergedFilter = deepMerge(input || {}, pinFilter)
	const fetchedPins = await ctx.models.Pin.getPins(mergedFilter)
	return assemblePage(fetchedPins, input)
}

export const owner = async (fetchedRoute: RouteType, _: any, ctx: GraphQLContext): Promise<UserType> => {
	const filter = { where: { userOwnsRoute: { eq: fetchedRoute.uid } } }
	const result = await ctx.models.User.getUsers(filter)
	return result && result[0]
}
