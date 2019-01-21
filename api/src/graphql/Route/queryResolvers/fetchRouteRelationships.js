// @flow
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { UserType } from 'Types/UserTypes'
import type { GraphQLContext, PageType, PaginationInput } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const pins = async (
	fetchedRoute: RouteType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<PinType>> => {
	/* This one works a little differently from other relationship resolvers.
	 *
	 * Others will generate a filter to pass to the target item's model.
	 * In this scenario, we already have an array of [pins] provided by the GetRoute model
	 * So, we just use that pin data (containing only UIDs) to fetch the full pin data
	 */
	const fetchedPins = await Promise.all(fetchedRoute.pins.map((pin) => ctx.models.Pin.getPin(pin.uid)))
	return assemblePage(fetchedPins, input)
}

export const owner = async (fetchedRoute: RouteType, _: any, ctx: GraphQLContext): Promise<UserType> => {
	const filter = { where: { userOwnsRoute: { eq: fetchedRoute.uid } } }
	const result = await ctx.models.User.getUsers(filter)
	return result && result[0]
}
