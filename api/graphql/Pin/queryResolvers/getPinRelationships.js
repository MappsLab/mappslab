// @flow
import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { PinType, GetPinArgs } from 'Types/PinTypes'
import type { GraphQLContext, PageType, PaginationInput } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

type GetPinInput = {
	input: GetPinArgs,
}

export const owner = (fetchedPin: PinType, _: GetPinInput, ctx: GraphQLContext): Promise<UserType | null> =>
	ctx.models.User.getPinOwner(fetchedPin.uid)

export const maps = async (
	fetchedPin: PinType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<MapType> | null> => {
	const fetchedMaps = await ctx.models.Map.getPinMaps(fetchedPin.uid /* input */)
	if (!fetchedMaps) return null
	return assemblePage(fetchedMaps, input)
}
