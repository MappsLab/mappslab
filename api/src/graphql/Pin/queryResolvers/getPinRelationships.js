// @flow
import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { ImageType } from 'Types/ImageTypes'
import type { PinType, GetPinArgs } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type {
	GraphQLContext,
	PageType,
	PaginationInput,
} from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'
import { head, last } from 'ramda'

type GetPinInput = {
	input: GetPinArgs,
}

export const owner = async (
	fetchedPin: PinType,
	_: GetPinInput,
	ctx: GraphQLContext,
): Promise<UserType> => {
	const filter = { where: { userOwnsPin: { eq: fetchedPin.uid } } }
	const result = await ctx.models.User.getUsers(filter)
	return result && result[0]
}

export const image = async (
	fetchedPin: PinType,
	_: any,
	ctx: GraphQLContext,
): Promise<ImageType> => {
	const filter = { where: { hasImage: { eq: fetchedPin.uid } } }
	const result = await ctx.models.Image.getImages(filter)
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

export const route = async (
	fetchedPin: PinType,
	_: any,
	// { input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<$PropertyType<PinType, 'route'> | null> => {
	const filter = { where: { routeContainsPin: { eq: fetchedPin.uid } } }
	const fetchedRoutes = await ctx.models.Route.getRoutes(filter)
	const pinRoute = fetchedRoutes ? fetchedRoutes[0] : null
	if (!pinRoute) return null
	const firstPin = head(pinRoute.pins)
	const lastPin = last(pinRoute.pins)
	const pinIndex = pinRoute.pins.findIndex((p) => p.uid === fetchedPin.uid)
	const nextPin = pinRoute.pins[pinIndex + 1]
	const prevPin = pinRoute.pins[pinIndex - 1]
	return {
		route: pinRoute,
		nextPin,
		prevPin,
		isFirst: firstPin ? fetchedPin.uid === firstPin.uid : false,
		isLast: lastPin ? fetchedPin.uid === lastPin.uid : false,
	}
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
