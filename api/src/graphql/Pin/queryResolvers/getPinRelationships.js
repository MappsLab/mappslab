// @flow
import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { PinType, GetPinArgs } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { GraphQLContext, PageType, PaginationInput } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

type GetPinInput = {
	input: GetPinArgs,
}

export const owner = async (fetchedPin: PinType, _: GetPinInput, ctx: GraphQLContext): Promise<UserType | null> => {
	const filter = { where: { userOwnsPin: { eq: fetchedPin.uid } } }
	const result = await ctx.models.User.getUsers(filter)
	return result && result[0]
}

export const maps = async (
	fetchedPin: PinType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<MapType> | null> => {
	const filter = { where: { mapHasPin: { eq: fetchedPin.uid } } }
	const fetchedMaps = await ctx.models.Map.getMaps(filter /* input */)
	if (!fetchedMaps) return null
	return assemblePage(fetchedMaps, input)
}

export const routes = async (
	fetchedPin: PinType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<RouteType> | null> => {
	const filter = { where: { routeContainsPin: { eq: fetchedPin.uid } } }
	const fetchedRoutes = await ctx.models.Route.getRoutes(filter)
	if (!fetchedRoutes) return null
	return assemblePage(fetchedRoutes, input)
}
