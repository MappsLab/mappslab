// @flow
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { UserType } from 'Types/UserTypes'
import type {
	GraphQLContext,
	PageType,
	PaginationInput,
} from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const image = async (
	fetchedRoute: RouteType,
	_: any,
	ctx: GraphQLContext,
): Promise<ImageType> => {
	const filter = { where: { hasImage: { eq: fetchedRoute.uid } } }
	const result = await ctx.models.Image.getImages(filter)
	return result && result[0]
}

export const pins = async (
	fetchedRoute: RouteType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<PinType>> => {
	// TODO this doesn't look very performant. Find a way to do this with Pin.getPins instead
	const fetchedPins = fetchedRoute.pins
		? await Promise.all(
				fetchedRoute.pins.map((pin) => ctx.models.Pin.getPin(pin.uid)),
		  )
		: []
	return assemblePage(fetchedPins, input)
}

export const owner = async (
	fetchedRoute: RouteType,
	_: any,
	ctx: GraphQLContext,
): Promise<UserType> => {
	const filter = { where: { userOwnsRoute: { eq: fetchedRoute.uid } } }
	const result = await ctx.models.User.getUsers(filter)
	return result && result[0]
}
