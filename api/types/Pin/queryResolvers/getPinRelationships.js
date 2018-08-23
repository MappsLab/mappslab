// @flow

import type { PinType, GetPinArgs } from '../PinTypes'
import type { GraphQLContext, PageType, PaginationInput } from '../../shared/sharedTypes'
import { assemblePage } from 'Utils/graphql'

type GetPinInput = {
	input: GetPinArgs,
}

export const owner = (fetchedPin: PinType, _: GetPinInput, ctx: GraphQLContext): Promise<PinType | null | Error> =>
	ctx.models.User.getPinOwner(fetchedPin.uid)

export const maps = async (
	fetchedPin: PinType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType | null | Error> => {
	const fetchedMaps = await ctx.models.Map.getPinMaps(fetchedPin.uid, input)
	return assemblePage(fetchedMaps, input)
}
